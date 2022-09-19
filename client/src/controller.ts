import * as alt from 'alt-client';
import * as native from 'natives';
import { HomelessRP } from '../../server';
import { omegaHRP } from '../../shared/enums/OHRPenums';
import { trashingsettings } from '../../shared/src/config';
import { iTrash } from '../../shared/src/interfaces/iTrash';
import {  trashPropsA, trashPropsB } from '../../shared/src/trashProps';

let curObj: number;
let curType: string;
let Player: alt.Player;

alt.on('keydown', (key) => {
    if (key === trashingsettings.keys.trashingInterface) {
        for (let i in trashPropsA) {
            let type = trashPropsA[i];
            let obj = native.getClosestObjectOfType(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 1, alt.hash(type), false, false, false);
            if (obj) {
                curObj = obj;
                curType = type;
                StartTrashA(curObj)   
            }}
            for (let i in trashPropsB) {
                let type = trashPropsB[i];
                let obj = native.getClosestObjectOfType(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z, 1, alt.hash(type), false, false, false);
                if (obj) {
                curObj = obj;
                curType = type;
                StartTrashB(curObj)   
            }}
        }
    }
)


async function StartTrashA(obj:number)   {
    const CD = getRandomInt(trashingsettings.trashMinRespawnTime, trashingsettings.trashMaxRespawnTime)
    alt.emitServer(omegaHRP.TrashingA, native.getEntityCoords(obj, false));
    console.log(`Trashing start, freeze Obj:${curObj}  CD timer:${CD}.`);
    native.freezeEntityPosition(curObj, true);


    alt.setTimeout(() => {
        native.freezeEntityPosition(curObj, false);
        console.log('Trashbin CD cleared!');
    }, CD);
    
}; 

async function StartTrashB(obj:number)   {
    const CD = getRandomInt(trashingsettings.trashMinRespawnTime, trashingsettings.trashMaxRespawnTime)
    alt.emitServer(omegaHRP.TrashingB, native.getEntityCoords(obj, false));
    console.log(`Trashing start, freeze Obj:${curObj}  CD timer:${CD}.`);
    native.freezeEntityPosition(curObj, true);


    alt.setTimeout(() => {
        native.freezeEntityPosition(curObj, false);
        console.log('Trashbin CD cleared!');
    }, CD);
    
}; 

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

