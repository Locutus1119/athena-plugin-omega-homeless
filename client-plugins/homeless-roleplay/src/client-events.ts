import * as alt from 'alt-client';
import IDustbinObjects from '../../../server-plugins/homeless-roleplay/interfaces/IDustbinObjects';
export let dustbinList = Array<IDustbinObjects>();

alt.onServer('HomelessRoleplay:Client:SendDatabaseObjects', (objects: Array<IDustbinObjects>) => {
    objects.forEach((obj, i) => {
        dustbinList.push(obj);
    });
});
