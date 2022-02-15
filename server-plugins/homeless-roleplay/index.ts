import * as alt from 'alt-server';

import { PluginSystem } from '../../server/systems/plugins';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { TrashingController } from './src/controller';


import './data/trashRegistry';
import './data/trashingItems';

export const HomelessRP = {
    name: 'HomelessRP',
    version: 'v0.1',
    interactionRange: 0.5,
    minTrashDuration: 3000, 
    maxTrashDuration: 8000,
    trashRespawnTime: 10000, 
}

PluginSystem.registerPlugin(HomelessRP.name, () => {
    alt.log(`~lg~${HomelessRP.name} ${HomelessRP.version} successfully loaded.`);
});

alt.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, () => {
    TrashingController.Trash();
});
