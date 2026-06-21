export const storageUtils = {
  // Set item
  set: (key: string, value: any, storage: 'local' | 'session' = 'local'): void => {
    const storageObj = storage === 'local' ? localStorage : sessionStorage;
    try {
      storageObj.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set ${key} in ${storage}Storage:`, error);
    }
  },

  // Get item
  get: (key: string, storage: 'local' | 'session' = 'local'): any => {
    const storageObj = storage === 'local' ? localStorage : sessionStorage;
    try {
      const item = storageObj.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Failed to get ${key} from ${storage}Storage:`, error);
      return null;
    }
  },

  // Remove item
  remove: (key: string, storage: 'local' | 'session' = 'local'): void => {
    const storageObj = storage === 'local' ? localStorage : sessionStorage;
    storageObj.removeItem(key);
  },

  // Clear all
  clear: (storage: 'local' | 'session' = 'local'): void => {
    const storageObj = storage === 'local' ? localStorage : sessionStorage;
    storageObj.clear();
  },

  // Get all keys
  getKeys: (storage: 'local' | 'session' = 'local'): string[] => {
    const storageObj = storage === 'local' ? localStorage : sessionStorage;
    return Object.keys(storageObj);
  },

  // Check if key exists
  has: (key: string, storage: 'local' | 'session' = 'local'): boolean => {
    const storageObj = storage === 'local' ? localStorage : sessionStorage;
    return storageObj.hasOwnProperty(key);
  },

  // Get storage size
  getSize: (storage: 'local' | 'session' = 'local'): number => {
    const storageObj = storage === 'local' ? localStorage : sessionStorage;
    let size = 0;
    for (const key in storageObj) {
      if (storageObj.hasOwnProperty(key)) {
        size += storageObj[key].length + key.length;
      }
    }
    return size;
  },
};