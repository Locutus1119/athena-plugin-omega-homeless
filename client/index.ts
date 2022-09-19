import * as alt from 'alt-client';
import * as native from 'natives';
import { WebViewController } from '../../../client/extensions/view2';
import ViewModel from '../../../client/models/viewModel';
import { isAnyMenuOpen } from '../../../client/utility/menus';
import './src/controller';
import { omegaHRP } from '../shared/enums/OHRPenums';
import { trashingsettings } from '../shared/src/config';
import { trashProps } from '../shared/src/trashProps';
const view = await WebViewController.get();

// You should change this to match your Vue Template's ComponentName.
const PAGE_NAME = 'trashUI';
let itemArray: []; 
let identifier: string;

class InternalFunctions implements ViewModel {
    static async open() {
        // Check if any other menu is open before opening this.
        if (isAnyMenuOpen()) {
            return;
        }

        // Must always be called first if you want to hide HUD.
        await WebViewController.setOverlaysVisible(false);

        // This is where we bind our received events from the WebView to
        // the functions in our WebView.
        const view = await WebViewController.get();
        view.on(`${PAGE_NAME}:Ready`, InternalFunctions.ready);
        view.on(`${PAGE_NAME}:Close`, InternalFunctions.close);

        // This is where we open the page and show the cursor.
        WebViewController.openPages([PAGE_NAME]);
        WebViewController.focus();
        WebViewController.showCursor(true);

        // Turn off game controls, hide the hud.
        alt.toggleGameControls(false);

        // Let the rest of the script know this menu is open.
        alt.Player.local.isMenuOpen = true;
    }

    static async close() {
        alt.toggleGameControls(true);
        WebViewController.setOverlaysVisible(true);

        // Turn off bound events.
        // If we do not turn them off we get duplicate event behavior.
        // Also will cause a memory leak if you do not turn them off.
        const view = await WebViewController.get();
        view.off(`${PAGE_NAME}:Ready`, InternalFunctions.ready);
        view.off(`${PAGE_NAME}:Close`, InternalFunctions.close);
        

        // Close the page.
        WebViewController.closePages([PAGE_NAME]);

        // Turn on game controls, show the hud.
        WebViewController.unfocus();
        WebViewController.showCursor(false);

        // Let the rest of the script know this menu is closed.
        alt.Player.local.isMenuOpen = false;
    }

    /**
     * You should call this from the WebView.
     * What this will let you do is define local data in the client.
     *
     * Then when the WebView is ready to receieve that data we can send it.
     * The flow is:
     *
     * Send From WebView -> Get the Data Here -> Send to the WebView
     *
     * @static
     * @memberof InternalFunctions
     */
    static async ready() {
        const view = await WebViewController.get();
        view.on(`${PAGE_NAME}:Close`, InternalFunctions.close);
        view.emit(`${PAGE_NAME}:Vue:SetTrashbin`, identifier, itemArray);
    }
}

view.on(`${PAGE_NAME}:Close`, (player: alt.Player, identifier: string) => { 
    InternalFunctions.close();
    
    alt.log("Closing...<");
    alt.emitServer(`${PAGE_NAME}:Server:TrashClose`, player, identifier);
    
});

view.on(`${PAGE_NAME}:Vue:RemoveItem`, (player: alt.Player, binItem: string, index:number, identifier: string) => {
    alt.emitServer(`${PAGE_NAME}:Server:RemoveItem`, player, binItem, index, identifier);

});

alt.onServer('HomelessRP:Client:OpenVue', (trashbinId: string, trashItems: []) => {
    itemArray = trashItems;
    identifier = trashbinId;
    console.log(JSON.stringify(trashItems));
    InternalFunctions.open();
});
