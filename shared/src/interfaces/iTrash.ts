import * as alt from 'alt-shared';


export interface iTrash {
    _id?: string;
    id?: number;
    name: string;
    position: alt.Vector3;

        cooldown: number,
        lastLooted?: number,

    currentItems: Array<string | number>
}
