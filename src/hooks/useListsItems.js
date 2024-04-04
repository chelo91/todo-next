import { useLists } from './useLists.js';
import { useItems } from './useItems.js';
import { useItemsGuest } from './useItemsGuest.js';

export function useListsItems() {
  const {
    lists,
    listSelected,
    setListSelected,
    guestMode,
    loading
  } = useLists();

  //const { items, addItem, updateItem, deleteItem } = useItemsGuest();
  const { items, addItem, updateItem, deleteItem, syncItems } = useItems(listSelected)
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