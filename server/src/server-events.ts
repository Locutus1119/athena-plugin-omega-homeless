import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';

import { iTrash } from '../../shared/src/interfaces/iTrash';
import { ItemFactory } from '../../../../server/systems/item';
import { Athena } from '../../../../server/api/athena';
import { awaitExpression } from '@babel/types';
import { HomelessRP, OHRP } from '..';


const PAGE_NAME = 'trashUI';

alt.onClient(`${PAGE_NAME}:Server:RemoveItem`, async (player: alt.Player, binItem: string, index:number, trashbinId: string) => {
    alt.log(`Player: ${player.data.name} tried to remove Item at Index [${binItem}] from the bin ${trashbinId}`);
    
    const item = await ItemFactory.get(binItem);
    const emptySlot = Athena.player.inventory.getFreeInventorySlot(player);
            if (!emptySlot) {
                        Athena.player.emit.notification(player, `You don't have enough space in your inventory!`);
                return;}
                else{
                        Athena.player.inventory.inventoryAdd(player, item, emptySlot.slot);
                        Athena.player.save.save(player, 'inventory', player.data.inventory);
                        Athena.player.sync.inventory(player);
                    }
     const Timestamp = Date.now();
     await Database.updateDataByFieldMatch('id', trashbinId, { lastLooted: Timestamp }, HomelessRP.collection);
     const trashbin = await Database.fetchData<iTrash>('id', trashbinId, HomelessRP.collection)
     alt.log(`elött ${trashbin.currentItems}-`);
     const updateItem = await OHRP.fillTrashContainer([0]);
     trashbin.currentItems = updateItem
     alt.log(`után ${trashbin.currentItems}-`);
     await Database.updateDataByFieldMatch('id', trashbinId, { currentItems: updateItem }, HomelessRP.collection);



}
);
