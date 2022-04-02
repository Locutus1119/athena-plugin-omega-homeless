import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import { HomelessRP } from '..';
import { iTrash } from './interfaces/iTrash';

alt.onClient('trashUI:Server:RemoveItem', async (player: alt.Player, index: number, identifier: string) => {
    alt.log(`Player: ${player.data.name} tried to remove Item at Index [${index}] from the bin ${identifier}`);
    const trashData = await Database.fetchData<iTrash>('identifier', identifier, HomelessRP.collection);
    alt.log(JSON.stringify(trashData));
});