import { useState, useEffect } from 'react';
import { v4, stringify as uuidStringify } from 'uuid';

// Definición del hook
export function useItemsGuest() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadChanges();
  }, []);

  const addItem = (newItem) => {
    newItem._id = v4().toString();
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    saveChanges();
  };

  const updateItem = (updatedItem) => {
    updatedItem.needsSync = true;
    const updatedItems = items.map((item) =>
      item._id === updatedItem._id ? { ...items, ...updatedItem } : item
    );
    setItems(updatedItems);
    saveChanges();
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
    saveChanges();
  };

  const saveChanges = () => {
    localStorage.setItem('lists-items', JSON.stringify(items));
  };

  const loadChanges = () => {
    const itemsInStorage = localStorage.getItem('lists-items');
    if (itemsInStorage) {
      setItems(JSON.parse(itemsInStorage));
    } else {
      setItems([]);
    }
  }

  // Retorna el estado actual y las funciones para actualizarlo
  return {
    items,
    addItem,
    updateItem,
    deleteItem,
  };
}