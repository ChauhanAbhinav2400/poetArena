// utils/localStorage.ts

/**
 * Set an item in localStorage
 * @param key The key to store the value under
 * @param value The value to store
 */
export const setItem = (key: string, value: string): void => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting localStorage item:", error);
    }
  }
};

/**
 * Get an item from localStorage
 * @param key The key to retrieve
 * @returns The value stored or null if not found
 */
export const getItem = (key: string): string | null => {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error("Error getting localStorage item:", error);
      return null;
    }
  }
  return null;
};

/**
 * Remove an item from localStorage
 * @param key The key to remove
 */
export const removeItem = (key: string): void => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing localStorage item:", error);
    }
  }
};

/**
 * Check if an item exists in localStorage
 * @param key The key to check
 * @returns Boolean indicating if the key exists
 */
export const hasItem = (key: string): boolean => {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error("Error checking localStorage item:", error);
      return false;
    }
  }
  return false;
};
