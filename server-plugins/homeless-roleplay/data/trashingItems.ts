import { ItemFactory } from '../../../server/systems/item';
import { ITEM_TYPE } from '../../../shared/enums/itemTypes';
import { Item } from '../../../shared/interfaces/item';

export const trashingItems: Array<Item> = [
    {
        name: 'Trash-1',
        description:
            'Trash-1.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Trash-1',
        rarity: 1,
        version: 1,
    },
    {
        name: 'Trash-2',
        description:
            'Trash-2.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Trash-2',
        rarity: 1,
        version: 1,
    },
    {
        name: 'Trash-3',
        description:
            'Trash-3.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Trash-3',
        rarity: 1,
        version: 1,
    },
    {
        name: 'Trash-4',
        description:
            'Trash-4.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Trash-4',
        rarity: 1,
        version: 1,
    },
    {
        name: 'Trash-5',
        description:
            'Trash-5.',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CAN_TRADE,
        data: {
        },
        dbName: 'Trash-5',
        rarity: 1,
        version: 1,
    },
];
    
    for (let x = 0; x < trashingItems.length; x++) {
        await ItemFactory.add(trashingItems[x]);
        await ItemFactory.update(trashingItems[x].dbName, trashingItems[x]);
    }
    






