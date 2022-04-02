import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import { HomelessRP } from '..';
import { iTrash } from './interfaces/iTrash';

alt.onClient('trashUI:Server:RemoveItem', async (player: alt.Player, index: number, trashbinId: string) => {
    alt.log(`Player: ${player.data.name} tried to remove Item at Index [${index}] from the bin ${trashbinId}`);
    const trashbin = await Database.fetchData<iTrash>('_id', trashbinId, HomelessRP.collection);
    alt.log(trashbin.isLooted);
});