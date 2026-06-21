export const objectUtils = {
  // Get object keys
  keys: <T>(obj: T): (keyof T)[] => {
    return Object.keys(obj) as (keyof T)[];
  },

  // Get object values
  values: <T>(obj: T): T[keyof T][] => {
    return Object.values(obj);
  },

  // Get object entries
  entries: <T>(obj: T): [keyof T, T[keyof T]][] => {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
  },

  // Check if object is empty
  isEmpty: <T>(obj: T): boolean => {
    return Object.keys(obj).length === 0;
  },

  // Check if object is not empty
  isNotEmpty: <T>(obj: T): boolean => {
    return Object.keys(obj).length > 0;
  },

  // Get object size
  size: <T>(obj: T): number => {
    return Object.keys(obj).length;
  },

  // Deep clone
  deepClone: <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as any;
    if (obj instanceof Array) return obj.map(item => objectUtils.deepClone(item)) as any;
    
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = objectUtils.deepClone(obj[key]);
      }
    }
    return cloned;
  },

  // Merge objects
  merge: <T, U>(target: T, source: U): T & U => {
    return { ...target, ...source };
  },

  // Deep merge
  deepMerge: <T, U>(target: T, source: U): T & U => {
    const result = objectUtils.deepClone(target);
    
    for (const key in source) {
      if (source[key] instanceof Date) {
        result[key] = source[key] as any;
      } else if (typeof source[key] === 'object' && source[key] !== null) {
        result[key] = objectUtils.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key] as any;
      }
    }
    
    return result;
  },

  // Pick properties
  pick: <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
      result[key] = obj[key];
    });
    return result;
  },

  // Omit properties
  omit: <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = objectUtils.deepClone(obj);
    keys.forEach(key => {
      delete result[key];
    });
    return result;
  },

  // Get nested property
  get: <T>(obj: T, path: string | string[]): any => {
    const pathArray = Array.isArray(path) ? path : path.split('.');
    return pathArray.reduce((current, key) => current && current[key], obj);
  },

  // Set nested property
  set: <T>(obj: T, path: string | string[], value: any): T => {
    const pathArray = Array.isArray(path) ? path : path.split('.');
    const result = objectUtils.deepClone(obj);
    let current = result;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      const key = pathArray[i];
      current[key] = current[key] || {};
      current = current[key];
    }
    
    current[pathArray[pathArray.length - 1]] = value;
    return result;
  },

  // Delete nested property
  delete: <T>(obj: T, path: string | string[]): T => {
    const pathArray = Array.isArray(path) ? path : path.split('.');
    const result = objectUtils.deepClone(obj);
    let current = result;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      const key = pathArray[i];
      if (!current[key]) return obj;
      current = current[key];
    }
    
    delete current[pathArray[pathArray.length - 1]];
    return result;
  },

  // Check if object has property
  has: <T>(obj: T, path: string | string[]): boolean => {
    return objectUtils.get(obj, path) !== undefined;
  },

  // Get all property names
  getPropertyNames: <T>(obj: T): (keyof T)[] => {
    return Object.getOwnPropertyNames(obj) as (keyof T)[];
  },

  // Get own property names
  getOwnPropertyNames: <T>(obj: T): (keyof T)[] => {
    return Object.getOwnPropertyNames(obj) as (keyof T)[];
  },

  // Get prototype property names
  getPrototypeOf: <T>(obj: T): (keyof T)[] => {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
  },

  // Create object from entries
  fromEntries: <T>(entries: [string, T][]): Record<string, T> => {
    return Object.fromEntries(entries);
  },

  // Group by
  groupBy: <T, K extends keyof any>(obj: T[], key: (value: T) => K): Record<K, T[]> => {
    return obj.reduce((groups, item) => {
      const group = key(item);
      if (!groups[group]) groups[group] = [];
      groups[group].push(item);
      return groups;
    }, {} as Record<K, T[]>);
  },

  // Filter object
  filter: <T>(obj: T, predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean): Partial<T> => {
    const result = {} as Partial<T>;
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && predicate(obj[key], key, obj)) {
        result[key] = obj[key];
      }
    }
    return result;
  },

  // Map object
  map: <T, U>(obj: T, callback: (value: T[keyof T], key: keyof T, obj: T) => U): Record<keyof T, U> => {
    const result = {} as Record<keyof T, U>;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = callback(obj[key], key, obj);
      }
    }
    return result;
  },

  // Reduce object
  reduce: <T, U>(obj: T, callback: (accumulator: U, value: T[keyof T], key: keyof T, obj: T) => U, initialValue: U): U => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      return callback(acc, value as T[keyof T], key as keyof T, obj);
    }, initialValue);
  },
};