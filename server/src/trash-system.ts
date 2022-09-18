import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';

import { iTrash } from '../../shared/src/interfaces/iTrash';
import { ItemFactory } from '../../../../server/systems/item';
import { Athena } from '../../../../server/api/athena';
import { awaitExpression } from '@babel/types';
import { HomelessRP } from '..';

export class TrashSystem {
    public static async searchTrash(player: alt.Player, trashbinId: number, trashItems: Array<any>) {
        const trashbin = await Database.fetchData<iTrash>('id', trashbinId, HomelessRP.collection);

        if ( Date.now() - trashbin.lastLooted > trashbin.cooldown ){
            alt.log(`Összehasonlítás ${Date.now()}-${trashbin.lastLooted}-${trashbin.cooldown}`);
        alt.emitClient(player, `HomelessRP:Client:OpenVue`, trashbinId, trashItems);
        } else {
            Athena.player.emit.notification(player, `Currently the bin is empty (cooldown)!`);

        }
    }
    
    public static removeItemFromTrash(player: alt.Player, index: number, trashbinId: string) {
    }
}
