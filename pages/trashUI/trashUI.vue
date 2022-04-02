<template>
    <div class="wrapper">
        <Button color="red" @click="closeMenu()" style="border-top-left-radius: 25px; border-top-right-radius: 25px">
            Close Menu
        </Button>
        <div class="content">
            <p>You've found {{ trashItems.length }} Item(s) in the Trashbin.</p>
            <div class="items mt-4" v-for="(trashItem, index) in trashItems" :key="index">
                <p>{{ trashItems[index].displayName }} ({{ trashItems[index].rarity }})</p>
                <img
                    :src="ResolvePath(`../../assets/icons/${trashItems[index].name}.png`)"
                    id="Images"
                    style="width: 64px; height: 64px"
                />
                <p>Quantity: {{ trashItems[index].quantity }}</p>
                <hr />
                <Button
                    class="mt-4"
                    color="light-blue"
                    @click="removeItem(index, binIdentifier)"
                    style="width: 50%; margin-left: 25%; border-radius: 10px"
                >
                    Take Item
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { iTrashItems } from '../../../../src/core/server-plugins/athena-homeless-roleplay/src/interfaces/iTrashItems';
import Button from '../../components/Button.vue';
import Frame from '../../components/Frame.vue';
import Icon from '../../components/Icon.vue';
import Input from '../../components/Input.vue';
import Modal from '../../components/Modal.vue';
import Module from '../../components/Module.vue';
import RangeInput from '../../components/RangeInput.vue';
import Toolbar from '../../components/Toolbar.vue';
import ResolvePath from '../../utility/pathResolver';
// Very Important! The name of the component must match the file name.
// Don't forget to do this. This is a note so you don't forget.
const ComponentName = 'trashUI';
export default defineComponent({
    name: ComponentName,
    // Used to add Custom Components
    components: {
        Button,
        Frame,
        Icon,
        Input,
        Modal,
        Module,
        RangeInput,
        Toolbar,
    },
    // Used to define state
    data() {
        return {
            trashItems: [],
            binIdentifier: '',
        };
    },
    // Called when the page is loaded.
    mounted() {
        // Bind Events to Methods
        if ('alt' in window) {
            alt.on(`${ComponentName}:Vue:SetTrashbin`, this.setTrash);
            alt.emit(`${ComponentName}:Ready`);
        }

        // Add Keybinds for In-Menu
        document.addEventListener('keyup', this.handleKeyPress);
    },
    // Called when the page is unloaded.
    unmounted() {
        // Make sure to turn off any document events as well.
        // Only if they are present of course.
        // Example:
        // document.removeEventListener('mousemove', this.someFunction)
        if ('alt' in window) {
            alt.off(`${ComponentName}:Close`, this.close);
            alt.off(`${ComponentName}:Vue:SetTrashbin`, this.setTrash);
        }

        // Remove Keybinds for In-Menu
        document.removeEventListener('keyup', this.handleKeyPress);
    },
    // Used to define functions you can call with 'this.x'
    methods: {
        setTrash(identifier:string, items: Array<iTrashItems>) {
            console.log('Items: ' + JSON.stringify(items) + ' / Identifier: ' + identifier);
            this.trashItems = items;
            this.binIdentifier = identifier;
        },
        closeMenu() {
            alt.emit(`${ComponentName}:Close`);
        },
        removeItem(index: number, identifier: string) {
            this.trashItems.splice(index, 1);
            alt.emit(`${ComponentName}:Vue:RemoveItem`, index, identifier);
        },
        handleKeyPress(e) {
            // Escape Key
            if (e.keyCode === 27 && 'alt' in window) {
                alt.emit(`${ComponentName}:Close`);
            }
        },
        ResolvePath,
    },
});
</script>

<style scoped>
.wrapper {
    position: absolute;
    height: 600px;
    width: 400px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 25px;
    text-align: center;
}
.content {
    width: 80%;
    position: relative;
    margin: 0 auto;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 0px;
    height: 540px;
}

.items {
    background: rgba(77, 192, 238, 0.753);
    border-radius: 25px;
    padding: 10px;
    box-shadow: 20px rgba(40, 146, 196, 0.5);
}

.content::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.content {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
