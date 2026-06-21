export const arrayUtils = {
  // Get unique values
  unique: <T>(array: T[]): T[] => {
    return [...new Set(array)];
  },

  // Remove duplicates
  removeDuplicates: <T>(array: T[]): T[] => {
    return arrayUtils.unique(array);
  },

  // Filter array
  filter: <T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T[] => {
    return array.filter(predicate);
  },

  // Map array
  map: <T, U>(array: T[], callback: (value: T, index: number, array: T[]) => U): U[] => {
    return array.map(callback);
  },

  // Reduce array
  reduce: <T, U>(array: T[], callback: (accumulator: U, value: T, index: number, array: T[]) => U, initialValue: U): U => {
    return array.reduce(callback, initialValue);
  },

  // Find element
  find: <T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined => {
    return array.find(predicate);
  },

  // Find index
  findIndex: <T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): number => {
    return array.findIndex(predicate);
  },

  // Check if array includes value
  includes: <T>(array: T[], value: T): boolean => {
    return array.includes(value);
  },

  // Get first element
  first: <T>(array: T[]): T | undefined => {
    return array[0];
  },

  // Get last element
  last: <T>(array: T[]): T | undefined => {
    return array[array.length - 1];
  },

  // Get element at index
  at: <T>(array: T[], index: number): T | undefined => {
    return array[index];
  },

  // Get length
  length: <T>(array: T[]): number => {
    return array.length;
  },

  // Check if empty
  isEmpty: <T>(array: T[]): boolean => {
    return array.length === 0;
  },

  // Check if not empty
  isNotEmpty: <T>(array: T[]): boolean => {
    return array.length > 0;
  },

  // Get slice
  slice: <T>(array: T[], start?: number, end?: number): T[] => {
    return array.slice(start, end);
  },

  // Get splice
  splice: <T>(array: T[], start: number, deleteCount?: number, ...items: T[]): T[] => {
    return array.splice(start, deleteCount, ...items);
  },

  // Insert at index
  insertAt: <T>(array: T[], index: number, value: T): T[] => {
    return [...array.slice(0, index), value, ...array.slice(index)];
  },

  // Remove at index
  removeAt: <T>(array: T[], index: number): T[] => {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  },

  // Swap elements
  swap: <T>(array: T[], index1: number, index2: number): T[] => {
    const newArray = [...array];
    [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
    return newArray;
  },

  // Shuffle array
  shuffle: <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // Sort array
  sort: <T>(array: T[], compareFn?: (a: T, b: T) => number): T[] => {
    return [...array].sort(compareFn);
  },

  // Group by
  groupBy: <T, K extends keyof any>(array: T[], key: (value: T) => K): Record<K, T[]> => {
    return array.reduce((groups, item) => {
      const group = key(item);
      if (!groups[group]) groups[group] = [];
      groups[group].push(item);
      return groups;
    }, {} as Record<K, T[]>);
  },

  // Chunk array
  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  // Flatten array
  flatten: <T>(array: T[][]): T[] => {
    return array.flat();
  },

  // Concat arrays
  concat: <T>(...arrays: T[][]): T[] => {
    return arrays.flat();
  },
};