export const mathUtils = {
  // Add numbers
  add: (...numbers: number[]): number => {
    return numbers.reduce((sum, num) => sum + num, 0);
  },

  // Subtract numbers
  subtract: (a: number, b: number): number => {
    return a - b;
  },

  // Multiply numbers
  multiply: (...numbers: number[]): number => {
    return numbers.reduce((product, num) => product * num, 1);
  },

  // Divide numbers
  divide: (a: number, b: number): number => {
    return b !== 0 ? a / b : NaN;
  },

  // Calculate percentage
  percentage: (value: number, total: number): number => {
    return total > 0 ? (value / total) * 100 : 0;
  },

  // Calculate average
  average: (...numbers: number[]): number => {
    return numbers.length > 0 ? mathUtils.add(...numbers) / numbers.length : 0;
  },

  // Calculate sum
  sum: (...numbers: number[]): number => {
    return mathUtils.add(...numbers);
  },

  // Calculate product
  product: (...numbers: number[]): number => {
    return mathUtils.multiply(...numbers);
  },

  // Calculate difference
  difference: (a: number, b: number): number => {
    return Math.abs(a - b);
  },

  // Round number
  round: (num: number, precision: number = 0): number => {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  },

  // Floor number
  floor: (num: number): number => {
    return Math.floor(num);
  },

  // Ceiling number
  ceil: (num: number): number => {
    return Math.ceil(num);
  },

  // Absolute value
  abs: (num: number): number => {
    return Math.abs(num);
  },

  // Square root
  sqrt: (num: number): number => {
    return Math.sqrt(num);
  },

  // Power
  pow: (base: number, exponent: number): number => {
    return Math.pow(base, exponent);
  },

  // Logarithm
  log: (num: number, base?: number): number => {
    return base ? Math.log(num) / Math.log(base) : Math.log(num);
  },

  // Natural logarithm
  ln: (num: number): number => {
    return Math.log(num);
  },

  // Base 10 logarithm
  log10: (num: number): number => {
    return Math.log10(num);
  },

  // Maximum
  max: (...numbers: number[]): number => {
    return Math.max(...numbers);
  },

  // Minimum
  min: (...numbers: number[]): number => {
    return Math.min(...numbers);
  },

  // Clamp value
  clamp: (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
  },

  // Random number
  random: (min: number = 0, max: number = 1): number => {
    return Math.random() * (max - min) + min;
  },

  // Random integer
  randomInt: (min: number = 0, max: number = 100): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // Factorial
  factorial: (num: number): number => {
    if (num < 0) return NaN;
    if (num === 0) return 1;
    return num * mathUtils.factorial(num - 1);
  },

  // Fibonacci
  fibonacci: (n: number): number => {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      [a, b] = [b, a + b];
    }
    return b;
  },

  // GCD
  gcd: (a: number, b: number): number => {
    return b === 0 ? a : mathUtils.gcd(b, a % b);
  },

  // LCM
  lcm: (a: number, b: number): number => {
    return a * b / mathUtils.gcd(a, b);
  },

  // Is even
  isEven: (num: number): boolean => {
    return num % 2 === 0;
  },

  // Is odd
  isOdd: (num: number): boolean => {
    return num % 2 !== 0;
  },

  // Is prime
  isPrime: (num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  },

  // Get divisors
  divisors: (num: number): number[] => {
    const divisors: number[] = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        divisors.push(i);
        if (i !== num / i) {
          divisors.push(num / i);
        }
      }
    }
    return divisors.sort((a, b) => a - b);
  },

  // Get factors
  factors: (num: number): number[] => {
    const factors: number[] = [];
    for (let i = 2; i <= num; i++) {
      while (num % i === 0) {
        factors.push(i);
        num /= i;
      }
    }
    return factors;
  },
};