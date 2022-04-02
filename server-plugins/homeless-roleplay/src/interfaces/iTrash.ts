import * as alt from 'alt-server';


export interface iTrash {
    _id?: string;
    name: string;
    position: alt.Vector3;
    cooldown: number;
    isLooted: boolean;
    isStorage: boolean;
    currentItems: Array<any>
}
