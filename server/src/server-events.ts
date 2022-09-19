import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import { ObjectId } from 'bson';
import { iTrash } from '../../shared/src/interfaces/iTrash';
import { ItemFactory } from '../../../../server/systems/item';
import { Athena } from '../../../../server/api/athena';
import { HomelessRP} from '..';
import { omegaHRP } from '../../shared/enums/OHRPenums';
import { commonItems, commonItemsA, commonItemsB } from './trashLists/trashItems';
import { trashingsettings } from '../../shared/src/config';

const PAGE_NAME = 'trashUI';

alt.onClient(`${PAGE_NAME}:Server:RemoveItem`, async (player: alt.Player, binItem: string, index:number, trashbinId: string) => {
    alt.log(`Player: ${player.data.name} tried to remove Item at Index [${binItem}] from the bin ${trashbinId}`);
    
    const item = await ItemFactory.get(binItem);
    const emptySlot = Athena.player.inventory.getFreeInventorySlot(player);
            if (!emptySlot) {
                        Athena.player.emit.notification(player, `You don't have enough space in your inventory!`);
                return;
            }else{
                        Athena.player.inventory.inventoryAdd(player, item, emptySlot.slot);
                        Athena.player.save.save(player, 'inventory', player.data.inventory);
                        Athena.player.sync.inventory(player);
                    }
}
);

alt.onClient(omegaHRP.Trashing, startTrashingEvent,)
async function startTrashingEvent(player: alt.Player, coords: alt.Vector3, curObj:number) {
        const allBins = await Database.fetchAllData<iTrash>(HomelessRP.collection);
        const trashbinCD = await Database.fetchData('cdID', coords.x, HomelessRP.collection);
        if (!trashbinCD){
        const trashID = allBins.length + 1;
        let uuid = new ObjectId();
        const trashDoc: iTrash = {
            _id: uuid.toString(),
            id: trashID,
            position: coords,
            cdID: coords.x,
            currentItems: await fillTrashContainer([0])
        }; 
            await Database.insertData(trashDoc, HomelessRP.collection, false);
            alt.logWarning(`${HomelessRP.name} | Database | Created ID:${trashID} trashbins.`);
            const trashbinExists = await Database.fetchData<iTrash>('id', trashID, HomelessRP.collection);
            alt.emitClient(player, `HomelessRP:Client:OpenVue`, trashbinExists.id, trashbinExists.currentItems); 
    } else {
        Athena.player.emit.notification(player, `Currently the bin is empty (cooldown)!`);
    }
}

alt.onClient(omegaHRP.TrashingA, startTrashingEventA,)
async function startTrashingEventA(player: alt.Player, coords: alt.Vector3, curObj:number) {
        const allBins = await Database.fetchAllData<iTrash>(HomelessRP.collection);
        const trashbinCD = await Database.fetchData('cdID', coords.x, HomelessRP.collection);
        if (!trashbinCD){
        const trashID = allBins.length + 1;
        let uuid = new ObjectId();
        const trashDoc: iTrash = {
            _id: uuid.toString(),
            id: trashID,
            position: coords,
            cdID: coords.x,
            currentItems: await fillTrashContainerA([0])
        }; 
            await Database.insertData(trashDoc, HomelessRP.collection, false);
            alt.logWarning(`${HomelessRP.name} | Database | Created ID:${trashID} trashbins.`);
            const trashbinExists = await Database.fetchData<iTrash>('id', trashID, HomelessRP.collection);
            alt.emitClient(player, `HomelessRP:Client:OpenVue`, trashbinExists.id, trashbinExists.currentItems); 
    } else {
        Athena.player.emit.notification(player, `Currently the bin is empty (cooldown)!`);
    }
}

alt.onClient(omegaHRP.TrashingB, startTrashingEventB,)
async function startTrashingEventB(player: alt.Player, coords: alt.Vector3, curObj:number) {
        const allBins = await Database.fetchAllData<iTrash>(HomelessRP.collection);
        const trashbinCD = await Database.fetchData('cdID', coords.x, HomelessRP.collection);
        if (!trashbinCD){
        const trashID = allBins.length + 1;
        let uuid = new ObjectId();
        const trashDoc: iTrash = {
            _id: uuid.toString(),
            id: trashID,
            position: coords,
            cdID: coords.x,
            currentItems: await fillTrashContainerB([0])
        }; 
            await Database.insertData(trashDoc, HomelessRP.collection, false);
            alt.logWarning(`${HomelessRP.name} | Database | Created ID:${trashID} trashbins.`);
            const trashbinExists = await Database.fetchData<iTrash>('id', trashID, HomelessRP.collection);
            alt.emitClient(player, `HomelessRP:Client:OpenVue`, trashbinExists.id, trashbinExists.currentItems); 
            
    } else {
        Athena.player.emit.notification(player, `Currently the bin is empty (cooldown)!`);
    }
}

async function   fillTrashContainer<T>(array: T[]): Promise<Array<T>> {
    let dropChance = Math.random() * 100; // 0.00000 - 100
    let itemInArray = commonItems([0]);
    let filledArray = [];
                        
        itemInArray.forEach((item) => {
            if (item.dropChance >= dropChance) {
                filledArray.push({ name: item.name, quantity: item.quantity, icon: item.icon });}
                });
            return await Promise.resolve(filledArray);
};                  


async function   fillTrashContainerA<T>(array: T[]): Promise<Array<T>> {
    let dropChance = Math.random() * 100; // 0.00000 - 100
    let itemInArray = commonItemsA([0]);
    let filledArray = [];
                        
        itemInArray.forEach((item) => {
            if (item.dropChance >= dropChance) {
                filledArray.push({ name: item.name, quantity: item.quantity, icon: item.icon });}
                });
            return await Promise.resolve(filledArray);
};                         


async function   fillTrashContainerB<T>(array: T[]): Promise<Array<T>> {
    let dropChance = Math.random() * 100; // 0.00000 - 100
    let itemInArray = commonItemsB([0]);
    let filledArray = [];
                        
        itemInArray.forEach((item) => {
            if (item.dropChance >= dropChance) {
                filledArray.push({ name: item.name, quantity: item.quantity, icon: item.icon });}
                });
            return await Promise.resolve(filledArray);
};                         