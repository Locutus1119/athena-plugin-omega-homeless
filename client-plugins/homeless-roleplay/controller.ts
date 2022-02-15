import * as alt from 'alt-client';
import * as native from 'natives';
import { trash } from './src/data';
import { trashingsettings } from './index';



let curObj: number;
let curType: string;
let Player: alt.Player;

alt.on('keydown', (key) => {
    if (key === trashingsettings.keys.trashingInterface) {
        for (let i in trash) {
            let type = trash[i];
            let obj = native.getClosestObjectOfType(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 2.0, alt.hash(type), false, false, false);
            if (obj) {
                curObj = obj;
                curType = type;
                alt.emitServer('HomelessRolePlay:Server:Trashing', native.getEntityCoords(obj, false));
                
            
            }
        }
    }
})



