import * as alt from 'alt-server';
import { HomelessRP } from '../index';
import { InteractionController } from '../../../server/systems/interaction';
import { ItemFactory } from '../../../server/systems/item';
import { ANIMATION_FLAGS } from '../../../shared/flags/animationFlags';
import { playerFuncs } from '../../../server/extensions/extPlayer';
import { ITrashing } from '../interfaces/iTrashing';
import {trashRegistry} from '../data/trashRegistry';
//import outcome from '../data/outcome';
import '../data/trashingItems';



export class TrashingController {

    static buildTrash() {

        alt.onClient('HomelessRolePlay:Server:Trashing', async (player: alt.Player) => {
            InteractionController.add({
                    uid: `IC-${player.pos.x}`,    
                    position: { x: player.pos.x, y: player.pos.y, z: player.pos.z },
                    description: 'Kukázás',
                    range: HomelessRP.interactionRange,
                    debug: true,
                    callback: TrashingController.startTrashing,
            })
        })}
        


     /**
     * This function handles the farming of a specific item.
     * @param player - The player who is farming.
     * @param {ITrashing} trashingData - nem tudom.
     * @param {number} itemSlot - The slot of the item in the inventory.
     * @param antiMacro - The position of the trashing spot.
     * @returns The outcome of the farming.
     */


     
    static async startTrashing( player: alt.Player, trashingData: ITrashing,)  {

        if (player.getMeta(`IsTrashing`) === true) {
            return;
        }
        player.setMeta(`IsTrashing`, true);
        playerFuncs.safe.setPosition(player, player.pos.x, player.pos.y, player.pos.z);


        const trashDuration = TrashingController.getRandomInt(HomelessRP.minTrashDuration, HomelessRP.maxTrashDuration);

        playerFuncs.emit.animation(
            player,
            'amb@world_human_const_drill@male@drill@base',
        'base',
        ANIMATION_FLAGS.NORMAL | ANIMATION_FLAGS.REPEAT,
            trashDuration,
        );

            playerFuncs.emit.createProgressBar(player, {
                uid: `Trashing-${player.data._id.toString()}`,
                color: { r: 255, g: 0, b: 0, a: 200 },
                distance: 15,
                milliseconds: trashDuration,
                position: player.pos,
                text: 'Kukázás...',
            });

        const randomRarity = TrashingController.getRandomInt(0, 70);

        alt.setTimeout(async () => {
            let outcomeList = [];

            // If tool is not required or we dont have one, we just return the common list.
            if (!randomRarity || randomRarity === 1 || randomRarity < 5) {
                outcomeList.push(trashingData.outcome.common);
            }

            if (randomRarity >= 6 && randomRarity < 30) {
                outcomeList.push(trashingData.outcome.uncommon);
            }

            if (randomRarity >= 30 && randomRarity < 40) {
                outcomeList.push(trashingData.outcome.rare);
            }

            if (randomRarity >= 40 && randomRarity < 50) {
                outcomeList.push(trashingData.outcome.veryRare);
            }

            if (randomRarity >= 50 && randomRarity < 60) {
                outcomeList.push(trashingData.outcome.epic);
            }

            if (randomRarity >= 60 && randomRarity <= 70) {
                outcomeList.push(trashingData.outcome.legendary);
            }

            if (randomRarity == 70)  {
                outcomeList.push(trashingData.outcome.unique);
            }

            if (!outcomeList || outcomeList.length === 0) {
                playerFuncs.emit.notification(player, `You found nothing!`);
                return;
            }

            const randomized = TrashingController.getRandomInt(0, outcomeList.length);
            const itemToAdd = await ItemFactory.getByName(outcomeList[0][randomized]);
            const hasItem = playerFuncs.inventory.isInInventory(player, { name: itemToAdd.name });
            const emptySlot = playerFuncs.inventory.getFreeInventorySlot(player);

            if (!hasItem) {
                playerFuncs.inventory.inventoryAdd(player, itemToAdd, emptySlot.slot);
                playerFuncs.emit.notification(player, `You've found ${itemToAdd.name}!`);
            } else {
                player.data.inventory[hasItem.index].quantity += 1;
                playerFuncs.emit.notification(player, `You've found ${itemToAdd.name}!`);
            }

            

            playerFuncs.save.field(player, 'inventory', player.data.inventory);
            playerFuncs.sync.inventory(player);
            player.deleteMeta(`IsTrashing`);
        }, trashDuration);
    };


   /**
     * Generate a random integer between two numbers.
     * @param {number} min - The minimum number in the range.
     * @param {number} max - the maximum number of times the function will be called.
     * @returns A random integer between min and max.
     */
    private static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
};
