export const numberUtils = {
  // Format number with commas
  formatWithCommas: (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  // Format number with decimal places
  formatDecimal: (num: number, decimals: number = 2): string => {
    return num.toFixed(decimals);
  },

  // Parse number from string
  parseNumber: (str: string): number => {
    return parseFloat(str.replace(/,/g, ''));
  },

  // Calculate percentage
  calculatePercentage: (value: number, total: number): number => {
    return total > 0 ? (value / total) * 100 : 0;
  },

  // Round to nearest
  round: (num: number, precision: number = 0): number => {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  },

  // Clamp number
  clamp: (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
  },

  // Get random number
  random: (min: number = 0, max: number = 1): number => {
    return Math.random() * (max - min) + min;
  },

  // Get random integer
  randomInt: (min: number = 0, max: number = 100): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // Calculate average
  average: (numbers: number[]): number => {
    if (numbers.length === 0) return 0;
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  },

  // Calculate sum
  sum: (...numbers: number[]): number => {
    return numbers.reduce((sum, num) => sum + num, 0);
  },

  // Calculate difference
  difference: (a: number, b: number): number => {
    return Math.abs(a - b);
  },
};