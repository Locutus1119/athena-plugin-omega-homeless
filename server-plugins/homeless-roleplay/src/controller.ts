import * as alt from 'alt-server';
import { HomelessRP } from '../index';
import { OHRP_TRANSLATIONS } from '../index';
import { ItemFactory } from '../../../server/systems/item';
import { ANIMATION_FLAGS } from '../../../shared/flags/animationFlags';
import { playerFuncs } from '../../../server/extensions/extPlayer';
import { ITrashing } from '../interfaces/iTrashing';
import {trashRegistry} from '../data/trashRegistry';
import '../data/trashingItems';



export class TrashingController {
    static Trash() {
        alt.onClient('HomelessRolePlay:Server:Trashing', TrashingController.startTrashingEvent,)
            }
         
/**
     * @param player - alt.Player - The player who used the item.
     * @param {alt.Vector3} coords Position of the trash
     * @returns None
     */
   
     private static async startTrashingEvent(player: alt.Player, coords: alt.Vector3) {
        for (const trash of trashRegistry) {
            const trashpos =  coords; 
            TrashingController.startTrashing(player, trash, trashpos,);
        }
    }

     /**
     * @param player - player is trashing.
     * @param {ITrashing} trashingData - ....
     * @param antiMacro - The position of the trashing spot.
     * @returns The outcome the trashing.
     */

    private static async startTrashing( player: alt.Player, trashingData: ITrashing, antiMacro: alt.Vector3,)  {

        if (player.getMeta(`IsTrashing`) === true) {
            return;
        }
        if (player.getMeta(`trashused-${antiMacro.x}`) === antiMacro.x ) {
            playerFuncs.emit.notification(player, OHRP_TRANSLATIONS.antiMacro);
            return;
        }
        player.setMeta(`trashused-${antiMacro.x}`, antiMacro.x);
        player.setMeta(`IsTrashing`, true);
        playerFuncs.safe.setPosition(player, player.pos.x, player.pos.y, player.pos.z);
        playerFuncs.set.frozen(player, true);
        alt.log('FREEZE');

        alt.setTimeout(() => {
            player.deleteMeta(`trashused-${antiMacro.x}`);
        }, TrashingController.getRandomInt(HomelessRP.trashMinRespawnTime, HomelessRP.trashMaxRespawnTime));
     
        const trashDuration = TrashingController.getRandomInt(HomelessRP.minTrashDuration, HomelessRP.maxTrashDuration);

        playerFuncs.emit.animation(
            player,
            'anim@amb@business@cfm@cfm_machine_oversee@',
        'button_press_operator',
        ANIMATION_FLAGS.NORMAL | ANIMATION_FLAGS.REPEAT,
            trashDuration,
        );

            playerFuncs.emit.createProgressBar(player, {
                uid: `Trashing-${player.data._id.toString()}`,
                color: { r: 255, g: 0, b: 0, a: 200 },
                distance: 15,
                milliseconds: trashDuration,
                position: player.pos,
                text: OHRP_TRANSLATIONS.progressBar,
            });

        const randomRarity = TrashingController.getRandomInt(0, 70);

        alt.setTimeout(async () => {
            let outcomeList = [];

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
                playerFuncs.emit.notification(player, OHRP_TRANSLATIONS.noLoot);
                playerFuncs.set.frozen(player, false);
                return;
            }

            const randomized = TrashingController.getRandomInt(0, outcomeList.length);
            const itemToAdd = await ItemFactory.getByName(outcomeList[0][randomized]);
            const hasItem = playerFuncs.inventory.isInInventory(player, { name: itemToAdd.name });
            const emptySlot = playerFuncs.inventory.getFreeInventorySlot(player);

            if (!hasItem) {
                playerFuncs.inventory.inventoryAdd(player, itemToAdd, emptySlot.slot);
                playerFuncs.emit.notification(player, `${OHRP_TRANSLATIONS.loot} ${itemToAdd.name}!`);
            } else {
                player.data.inventory[hasItem.index].quantity += 1;
                playerFuncs.emit.notification(player, `${OHRP_TRANSLATIONS.loot} ${itemToAdd.name}!`);
            }

            

            playerFuncs.save.field(player, 'inventory', player.data.inventory);
            playerFuncs.sync.inventory(player);
            player.deleteMeta(`IsTrashing`);
            playerFuncs.set.frozen(player, false);
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
