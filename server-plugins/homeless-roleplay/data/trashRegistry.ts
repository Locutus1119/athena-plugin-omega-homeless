import * as alt from 'alt-server';
import { playerAttachVirtualBound } from 'natives';
import { ANIMATION_FLAGS } from '../../../shared/flags/animationFlags';
import { ITrashing } from '../interfaces/iTrashing';

export const trashRegistry: Array<ITrashing> = [
    {
        trashName: 'BaseTrashing',


        outcome: {
            uncommon: ['Trash-1', 'Trash-2'],
            common: ['Trash-1', 'Trash-2'],
            rare: ['Trash-3'],
            veryRare: ['Trash-4', 'Trash-5'],
            epic: ['Trash-4', 'Trash-5'],
            legendary: ['Trash-4', 'Trash-5'],
            unique: ['Trash-4', 'Trash-5'],
        
        },
    },

];
