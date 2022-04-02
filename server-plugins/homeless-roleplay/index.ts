import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import { ObjectId } from 'bson';
import { InteractionController } from '../../server/systems/interaction';
import { PluginSystem } from '../../server/systems/plugins';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { iTrash } from './src/interfaces/iTrash';

import './src/server-events';
import { TrashSystem } from './src/trash-system';
import { TRASHBINS } from './src/trashLists/trashBins';
import { commonItems } from './src/trashLists/trashItems';

export const HomelessRP = {
    name: 'OmegaHomelessRP',
    version: 'v1.0',
    collection: 'trashbins',
};

PluginSystem.registerPlugin(HomelessRP.name, () => {
    alt.log(`~lg~${HomelessRP.name} ${HomelessRP.version} successfully loaded.`);
});

alt.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, async () => {
    let uuid = new ObjectId();
    await Database.createCollection(HomelessRP.collection);
    for (let x = 0; x < TRASHBINS.length; x++) {
        const trashDoc: iTrash = {
            _id: uuid.toString(),
            name: TRASHBINS[x].name,
            position: TRASHBINS[x].position,
            cooldown: 0,
            isLooted: false,
            currentItems: await fillTrashContainer([0])
        }; 

        const trashbinExists = await Database.fetchData<iTrash>('name', TRASHBINS[x].name, HomelessRP.collection);
        if (!trashbinExists) {
            let counter = 0;
            counter++;
            await Database.insertData(trashDoc, HomelessRP.collection, false);
            alt.logWarning(`${HomelessRP.name} | Database | Created ${counter} trashbins.`);
        }
    }
    const allBins = await Database.fetchAllData<iTrash>(HomelessRP.collection);
    allBins.forEach((bin) => {
        InteractionController.add({
            position: bin.position,
            description: 'Search in trash...',
            callback: (player: alt.Player) => {
                TrashSystem.searchTrash(player, bin._id.toString(), bin.currentItems);
            },
        });
    });
});

async function fillTrashContainer<T>(array: T[]): Promise<Array<T>> {
    let dropChance = Math.random() * 100; // 0.00000 - 100
    let itemInArray = commonItems([0]);
    let filledArray = [];

    itemInArray.forEach((item) => {
        if (item.dropChance >= dropChance) {
            filledArray.push({ name: item.name, quantity: item.quantity, icon: item.icon });
        }
    });

    return await Promise.resolve(filledArray);
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
