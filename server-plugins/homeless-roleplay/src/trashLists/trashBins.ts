import * as alt from 'alt-server';
import { iTrash } from '../interfaces/iTrash';

export const TRASHBINS: Array <iTrash> = [
    {
        name: 'City Paints Inc.',
        position: { x: 2.3687164783477783, y: -1351.3560791015625, z: 28.353023529052734 } as alt.Vector3,
        cooldown: 120,
        isLooted: false,
        currentItems: []
    },
];
