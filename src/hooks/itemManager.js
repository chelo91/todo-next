import { v4 as uuidv4 } from 'uuid';

export class ItemsManager {
    constructor(myList) {
        this.listId = myList.id;
        this.items = myList.items;
        //this.refreshItems();
    }

    getItems = () => {
        return this.items;
    }

    addItem = (newItem) => {
        newItem.create = true;
        newItem.id = uuidv4().toString();
        const newItems = [...this.items, newItem];
        this.items = newItems;
    };

    updateItem = (updateItem) => {
        updateItem.update = true;
        const newItems = this.items.map((item) =>
            item.id === updateItem.id ? { ...item, ...updateItem } : item
        );
        this.items = newItems;
    };

    deleteItem = (deletedItem) => {
        const newItems = this.items.map((item) =>
            deletedItem.id === item.id ? { ...item, deleted: true } : item
        );
        this.items = newItems;
    };

    syncItems = async () => {
        for (const item of this.items) {
            if (item.created || item.update || item.deleted) {
                await this.sendItemToApi(item);
            }
        };
        await this.refreshItems();
    }

    sendItemToApi = async (item) => {
        let method = '';
        let body = '{}';
        let url = '/api/lists/' + this.listId + '/items/' + item.id;
        if (item.create || item.update) {
            method = 'PUT';
            body = item;
        } else if (item.deleted) {
            method = 'DELETE';
        }
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log('Items synchronized:', item);
        console.log('Response:', data);
    };

    refreshItems = async () => {
        let url = '/api/lists/' + this.listId;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log('Items refreshed:', data);
        this.items = data.payload.items;
    };
}