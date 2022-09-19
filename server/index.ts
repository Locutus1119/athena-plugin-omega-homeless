import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import { PluginSystem } from '../../../server/systems/plugins';
import { SYSTEM_EVENTS } from '../../../shared/enums/system';
import './src/server-events';
export const HomelessRP = {
    name: 'OmegaHomelessPlugin',
    version: 'v1.0',
    collection: 'trashbins',
};

PluginSystem.registerPlugin(HomelessRP.name, () => {
    alt.log(`~lg~${HomelessRP.name} ${HomelessRP.version} successfully loaded.`);
});

alt.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, async () => {
    await Database.dropCollection(HomelessRP.collection)
    await Database.createCollection(HomelessRP.collection);
});