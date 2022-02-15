import * as alt from 'alt-server';
import { ANIMATION_FLAGS } from '../../../shared/flags/animationFlags';
import { Item } from '../../../shared/interfaces/item';

export interface ITrashing {
    trashName: string;


    outcome?: {
        common: Array<string>;
        uncommon?: Array<string>;
        rare?: Array<string>;
        veryRare?: Array<string>;
        epic?: Array<string>;
        legendary?: Array<string>;
        unique?: Array<string>;
    }
};
