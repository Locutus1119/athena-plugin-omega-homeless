import * as alt from 'alt-server';

import { PluginSystem } from '../../server/systems/plugins';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { TrashingController } from './src/controller';


import './data/trashRegistry';
import './data/trashingItems';

export const HomelessRP = {
    name: 'OmegaHomelessRP',
    version: 'v0.5',
    minTrashDuration: 3000, 
    maxTrashDuration: 8000,
    trashMinRespawnTime: 300000,
    trashMaxRespawnTime: 1800000, 
}

export enum OHRP_TRANSLATIONS {
    antiMacro = '[ANTIMACRO] - You have already checked this bin, nothing new has been added.',
    progressBar = 'Trashing...',
    noLoot = `You didn't find anything!`,
    loot = `Found at`,
}



PluginSystem.registerPlugin(HomelessRP.name, () => {
    alt.log(`~lg~${HomelessRP.name} ${HomelessRP.version} successfully loaded.`);
});

alt.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, () => {
    TrashingController.Trash();
});
