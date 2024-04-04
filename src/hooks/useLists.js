import { useState, useEffect } from 'react';
import useFetch from './useFetch.js';

export function useLists() {
  const [lists, setLists] = useState([]);
  const [listSelected, setListSelected] = useState(null);
  const [guestMode, setGuestMode] = useState(true);
  const { loading, error, value } = useFetch(`/api/lists`, {}, []);

  useEffect(() => {
    if (!loading) {
      if (!error) {
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

  return {
    lists,
    listSelected,
    setListSelected,
    guestMode,
    loading
  };
}