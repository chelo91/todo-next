import { useLists } from './useLists.js';
//import { useItems } from './useItems.js';
import { useState, useEffect } from 'react';
//import { useItemsGuest } from './useItemsGuest.js';
import { ItemsGuestManager } from './itemGuestManager.js';
import { ItemsManager } from './itemManager.js';

export function useListsItems() {
  const {
    lists,
    listSelected,
    setListSelected,
    guestMode,
    loading
  } = useLists();
  const [items, setItems] = useState([]);
  const [itemsManager, setItemsManager] = useState(null);

  useEffect(() => {
    if (!loading) {
      let itemsManager;
      if (guestMode) {
        itemsManager = new ItemsGuestManager();
      } else {
        itemsManager = new ItemsManager(listSelected);
      }
      setItemsManager(itemsManager);
      setItems(itemsManager.getItems());
    }
  }, [loading, guestMode])

  const addItem = (newItem) => {
    itemsManager.addItem(newItem);
    setItems(itemsManager.items);
  }
  const updateItem = (updatedItem) => {
    itemsManager.updateItem(updatedItem);
    setItems(itemsManager.items);
  }
  const deleteItem = (deletedItem) => {
    itemsManager.deleteItem(deletedItem);
    setItems(itemsManager.items);
  }
  const syncItems = async () => {
    itemsManager.syncItems();
    setItems(itemsManager.items);
  }


  //let { items, addItem, updateItem, deleteItem, syncItems } = guestMode ? useItemsGuest() : useItems(listSelected);

  //if (loading) {
  /*if (guestMode) {
    /* ({
       items,
       addItem,
       updateItem,
       deleteItem,
     } = useItemsGuest());
*
  } else {
    ({
      items,
      addItem,
      updateItem,
      deleteItem,
      syncItems
    } = useItems(listSelected));
  }
  //}//*/

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    syncItems,
    loading,
    guestMode,
    lists,
    listSelected,
    setListSelected
  };
}