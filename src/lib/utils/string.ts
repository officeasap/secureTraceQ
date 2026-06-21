export const stringUtils = {
  // Capitalize first letter
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  // Lowercase first letter
  lowercase: (str: string): string => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  },

  // Uppercase all letters
  uppercase: (str: string): string => {
    return str.toUpperCase();
  },

  // Truncate string
  truncate: (str: string, length: number, suffix: string = '...'): string => {
    if (str.length <= length) return str;
    return str.slice(0, length - suffix.length) + suffix;
  },

  // Pad string
  pad: (str: string, length: number, char: string = ' '): string => {
    return str.padStart(length, char);
  },

  // Remove whitespace
  removeWhitespace: (str: string): string => {
    return str.replace(/\s/g, '');
  },

  // Replace spaces with hyphens
  hyphenate: (str: string): string => {
    return str.replace(/\s+/g, '-');
  },

  // Convert to slug
  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  },

  // Escape HTML
  escapeHtml: (str: string): string => {
    return str
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  // Unescape HTML
  unescapeHtml: (str: string): string => {
    return str
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  },

  // Get first N characters
  first: (str: string, n: number): string => {
    return str.slice(0, n);
  },

  // Get last N characters
  last: (str: string, n: number): string => {
    return str.slice(-n);
  },

  // Repeat string
  repeat: (str: string, times: number): string => {
    return str.repeat(times);
  },

  // Reverse string
  reverse: (str: string): string => {
    return str.split('').reverse().join('');
  },

  // Shuffle array of strings
  shuffle: <T extends string>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // Check if string contains another
  contains: (str: string, search: string): boolean => {
    return str.includes(search);
  },

  // Check if string starts with another
  startsWith: (str: string, prefix: string): boolean => {
    return str.startsWith(prefix);
  },

  // Check if string ends with another
  endsWith: (str: string, suffix: string): boolean => {
    return str.endsWith(suffix);
  },

  // Replace all occurrences
  replaceAll: (str: string, search: string, replace: string): string => {
    return str.split(search).join(replace);
  },

  // Split and join
  splitAndJoin: (str: string, separator: string, joiner: string): string => {
    return str.split(separator).join(joiner);
  },
};