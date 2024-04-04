import { useState, useEffect } from 'react';
import { v4, stringify as uuidStringify } from 'uuid';
import useFetch from './useFetch.js';

// Definición del hook
export function useListsItems() {
  const [lists, setLists] = useState([]);
  const [listSelected, setListSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [guestMode, setGuestMode] = useState(false);
  const { loading, error, value } = useFetch(
    `/api/lists`,
    {},
    []
  );

  useEffect(() => {
    console.log("useEffect")
    if (!loading) {
      if (!error) {
        console.log("value", value)
        setLists(value.payload);
        setListSelected(value.payload[0]);
        setGuestMode(false);
      } else {
        setLists([]);
        setListSelected([]);
        setGuestMode(true);
      }
    }
  }, [loading]);

  useEffect(() => {
    async function refreshItems() {
      console.log("refreshItems")
      if (!loading) {
        if (guestMode) {
          const itemsInStorage = localStorage.getItem('lists-items');
          if (itemsInStorage) {
            setItems(JSON.parse(itemsInStorage));
            console.log(items)
          } else {
            setItems([]);
          }
        } else {
          setItems(lists[0].items.map(item => ({ ...item, needsSync: false, deleted: false, created: false })));
        }
      }
    }
    refreshItems();
  }, [guestMode]);


  const syncItems = async () => {
    const updatedItems = items.filter((item) => item.needsSync);
    const listId = uuidStringify(listSelected._id.data);

    console.log('ListId:', listId);
    if (updatedItems.length > 0) {
      for (const item of updatedItems) {
        try {
          if (guestMode) {
            localStorage.setItem('lists-items', JSON.stringify(listSelected));
          } else {
            let method = '';
            let body = '';
            let url = '/api/lists/' + listId + '/items';
            if (item.created) {
              method = 'POST';
              body = item;
            } else if (item.deleted) {
              method = 'DELETE';
              url = url + item._id;
            } else {
              method = 'PUT';
              body = item;
              url = url + item._id;
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
            setItems(items.map((item) => ({ ...item, needsSync: false, deleted: false, created: false })));
          }
        } catch (error) {
          console.error('Error sincronizando items:', error);
        }
      }
    }
  };

  const addItem = (newItem) => {
    newItem.needsSync = true;
    newItem.created = true;
    newItem._id = v4().toString();
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
  };

  const updateItem = (updatedItem) => {
    updatedItem.needsSync = true;
    const updatedItems = items.map((item) =>
      item._id === updatedItem._id ? { ...items, ...updatedItem } : item
    );
    setItems(updatedItems);
  };

  const deleteItem = (deletedItem) => {
    const updatedItems = items.map(item => {
      if (deletedItem._id === item._id) {
        return {
          ...item,
          deleted: true,
          needsync: true,
        };
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  };

  // Retorna el estado actual y las funciones para actualizarlo
  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    syncItems,
    loading,
    guestMode
  };
}