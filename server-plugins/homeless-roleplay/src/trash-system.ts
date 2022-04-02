import * as alt from 'alt-server';
export class TrashSystem {
    public static searchTrash(player: alt.Player, trashbinId: string, trashItems: Array<any>) {
        alt.emitClient(player, `HomelessRP:Client:OpenVue`, trashbinId, trashItems);
    }

    public static removeItemFromTrash(player: alt.Player, index: number, trashbinId: string) {
    
    }
}
