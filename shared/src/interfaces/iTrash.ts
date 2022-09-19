import * as alt from 'alt-shared';

export interface iTrash {
    _id?: string;
    id?: number;
    position: alt.Vector3;
    cdID: number,
    currentItems: Array<string | number>
}
