export const cacheUtils = {
  // Set cache item
  set: (key: string, value: any, ttl?: number): void => {
    const item = {
      value,
      timestamp: Date.now(),
      ttl,
    };
    
    localStorage.setItem(key, JSON.stringify(item));
  },

  // Get cache item
  get: (key: string): any => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    try {
      const parsed = JSON.parse(item);
      const now = Date.now();
      
      if (parsed.ttl && now - parsed.timestamp > parsed.ttl) {
        localStorage.removeItem(key);
        return null;
      }
      
      return parsed.value;
    } catch (error) {
      localStorage.removeItem(key);
      return null;
    }
  },

  // Remove cache item
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  // Clear all cache
  clear: (): void => {
    localStorage.clear();
  },

  // Get cache stats
  getStats: (): { keys: number; size: number } => {
    const keys = Object.keys(localStorage).length;
    let size = 0;
    
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        size += localStorage[key].length + key.length;
      }
    }
    
    return { keys, size };
  },
};