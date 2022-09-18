import * as alt from 'alt-server';
import { iTrash } from '../../../shared/src/interfaces/iTrash';

export const TRASHBINS: Array <iTrash> = [
    {
        position: { x: 2.3687164783477783, y: -1351.3560791015625, z: 28.353023529052734 } as alt.Vector3,
        cooldown: 7200000, //120min
        currentItems: []
    },
    {
        position: { x: -28.285715103149414, y: -1352.2945556640625, z: 29.3135986328125 } as alt.Vector3,
        cooldown: 7200000, //120min
        currentItems: []
    },
];
