/**
 * Storage Service - Abstraction layer for LocalStorage and SessionStorage
 * Provides type-safe methods for storing and retrieving data
 */

/**
 * Get item from storage (checks localStorage first, then sessionStorage)
 * @param {string} key - Storage key
 * @param {boolean} useSession - Force using sessionStorage
 * @returns {any|null} Parsed value or null if not found
 */
export const getItem = (key, useSession = false) => {
  try {
    const storage = useSession ? sessionStorage : localStorage;
    const item = storage.getItem(key);

    if (!item) {
      // Try the other storage if not found
      const altStorage = useSession ? localStorage : sessionStorage;
      const altItem = altStorage.getItem(key);
      return altItem ? JSON.parse(altItem) : null;
    }

    return JSON.parse(item);
  } catch (error) {
    console.error(`Error getting item from storage: ${key}`, error);
    return null;
  }
};

/**
 * Set item in storage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @param {boolean} useSession - Use sessionStorage instead of localStorage
 */
export const setItem = (key, value, useSession = false) => {
  try {
    const storage = useSession ? sessionStorage : localStorage;
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in storage: ${key}`, error);
    throw error;
  }
};

/**
 * Remove item from storage (both localStorage and sessionStorage)
 * @param {string} key - Storage key
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from storage: ${key}`, error);
  }
};

/**
 * Clear all items from storage
 * @param {boolean} clearSession - Also clear sessionStorage
 */
export const clearStorage = (clearSession = true) => {
  try {
    localStorage.clear();
    if (clearSession) {
      sessionStorage.clear();
    }
  } catch (error) {
    console.error('Error clearing storage', error);
  }
};

/**
 * Get all keys from storage
 * @param {boolean} includeSession - Include sessionStorage keys
 * @returns {string[]} Array of keys
 */
export const getAllKeys = (includeSession = false) => {
  try {
    const localKeys = Object.keys(localStorage);
    if (!includeSession) return localKeys;

    const sessionKeys = Object.keys(sessionStorage);
    return [...new Set([...localKeys, ...sessionKeys])];
  } catch (error) {
    console.error('Error getting storage keys', error);
    return [];
  }
};

/**
 * Check if key exists in storage
 * @param {string} key - Storage key
 * @returns {boolean} True if key exists
 */
export const hasItem = (key) => {
  return localStorage.getItem(key) !== null || sessionStorage.getItem(key) !== null;
};

/**
 * Get storage size in bytes
 * @returns {number} Total size of localStorage
 */
export const getStorageSize = () => {
  try {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  } catch (error) {
    console.error('Error calculating storage size', error);
    return 0;
  }
};

/**
 * Safe JSON parse with fallback
 * @param {string} value - JSON string
 * @param {any} fallback - Fallback value if parse fails
 * @returns {any} Parsed value or fallback
 */
export const safeJSONParse = (value, fallback = null) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};
