import { useState, useEffect } from 'react';
import { getItem, setItem, removeItem } from '../services/storageService';

/**
 * Custom hook for managing state with LocalStorage/SessionStorage persistence
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @param {boolean} useSession - Use sessionStorage instead of localStorage
 * @returns {Array} [storedValue, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue, useSession = false) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = getItem(key, useSession);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from storage:`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists to storage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to storage
      setItem(key, valueToStore, useSession);
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  };

  // Function to remove value from storage
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

/**
 * Hook for managing session storage specifically
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value
 * @returns {Array} [storedValue, setValue, removeValue]
 */
export const useSessionStorage = (key, initialValue) => {
  return useLocalStorage(key, initialValue, true);
};

/**
 * Hook to sync state with storage across tabs/windows
 * @param {string} key - Storage key to watch
 * @param {Function} callback - Callback when storage changes
 */
export const useStorageListener = (key, callback) => {
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== e.oldValue) {
        callback(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, callback]);
};

export default useLocalStorage;
