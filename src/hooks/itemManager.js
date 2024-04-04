import { v4 as uuidv4 } from 'uuid';

export class ItemsManager {
  constructor(myListId, myItems) {
    this.listId = myListId;
    this.items = myItems;
  }

  addItem = (newItem) => {
    newItem.create = true;
    newItem._id = uuidv4().toString();
    const newItems = [...this.items, newItem];
    this.items = newItems;
  };

  updateItem = (updateItem) => {
    updateItem.update = true;
    const newItems = this.items.map((item) =>
      item._id === updateItem._id ? { ...item, ...updateItem } : item
    );
    this.items = newItems;
  };

  deleteItem = (deletedItem) => {
    const newItems = this.items.map((item) =>
      deletedItem._id === item._id ? { ...item, deleted: true } : item
    );
    this.items = newItems;
  };

  syncItems = async () => {
    for (const item of this.items) {
      if (item.created || item.update) {
        await this.sendItemToApi(item);
      } else if (item.deleted) {
        await this.sendItemToApi(item);
      }
    }
    await this.refreshItems();
  };

  sendItemToApi = async (item) => {
    let method = '';
    let body = '';
    let url = '/api/lists/' + this.listId + '/items/' + item._id;
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
    console.log('Items synchronized:', data);
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
    this.items = data.items;
  };
}