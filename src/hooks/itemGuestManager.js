import { v4 as uuidv4 } from 'uuid';

export class ItemsGuestManager {
    constructor() {
        this.items = [];
    }

    addItem = (newItem) => {
        newItem._id = uuidv4().toString();
        const updatedItems = [...this.items, newItem];
        this.items = updatedItems;
        this.saveChanges();
    };

    updateItem = (updatedItem) => {
        updatedItem.needsSync = true;
        const updatedItems = this.items.map((item) =>
            item._id === updatedItem._id ? { ...item, ...updatedItem } : item
        );
        this.items = updatedItems;
        this.saveChanges();
    };

    deleteItem = (deletedItem) => {
        const updatedItems = this.items.map((item) =>
            deletedItem._id === item._id
                ? { ...item, deleted: true, needsync: true }
                : item
        );
        this.items = updatedItems;
        this.saveChanges();
    };

    saveChanges = () => {
        localStorage.setItem('lists-items', JSON.stringify(this.items));
    };

    loadChanges = () => {
        const itemsInStorage = localStorage.getItem('lists-items');
        if (itemsInStorage) {
            this.items = JSON.parse(itemsInStorage);
        } else {
            this.items = [];
        }
    };
}