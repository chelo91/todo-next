import { useEffect, useState, } from 'react';
import { v4, stringify as uuidStringify } from 'uuid';
// Definición del hook
export function useItems(myListId, myItems) {
  const [listId, setListId] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setListId(myListId);
    setItems(myItems);
  })

  const addItem = (newItem) => {
    newItem.create = true;
    newItem._id = v4().toString();
    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const updateItem = (updateItem) => {
    updateItem.update = true;
    const newItems = items.map((item) =>
      item._id === updateItem._id ? { ...items, ...updateItem } : item
    );
    setItems(newItems);
  };

  const deleteItem = (deletedItem) => {
    const newItems = items.map(item => {
      if (deletedItem._id === item._id) {
        return {
          ...item,
          deleted: true
        };
      } else {
        return item;
      }
    });
    setItems(newItems);
  };

  const syncItems = async () => {
    for (const item of itemsToUpdate) {
      await sendItemToApi(itemsToUpdate);
    }
    await refreshItems();
  };

  const sendItemToApi = async (item) => {
    let method = '';
    let body = '';
    let url = '/api/lists/' + listId + '/items' + item._id;
    if (item.created || item.update) {
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
    console.log('Items sincronizados:', data);
  }

  const refreshItems = async () => {
    let url = '/api/lists/' + listId
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setItems(data.items);
  }

  // Retorna el estado actual y las funciones para actualizarlo
  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    syncItems
  };
}