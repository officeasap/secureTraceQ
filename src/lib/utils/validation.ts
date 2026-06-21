export const validationUtils = {
  // Required field
  required: (value: any): string | null => {
    if (value === null || value === undefined || value === '') {
      return 'This field is required';
    }
    return null;
  },

  // Email validation
  email: (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  // Phone number validation
  phone: (value: string): string | null => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  // URL validation
  url: (value: string): string | null => {
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  // Date validation
  date: (value: string): string | null => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'Please enter a valid date';
    }
    return null;
  },

  // Min length
  minLength: (value: string, min: number): string | null => {
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  // Max length
  maxLength: (value: string, max: number): string | null => {
    if (value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return null;
  },

  // Min value
  min: (value: number, min: number): string | null => {
    if (value < min) {
      return `Must be at least ${min}`;
    }
    return null;
  },

  // Max value
  max: (value: number, max: number): string | null => {
    if (value > max) {
      return `Must be no more than ${max}`;
    }
    return null;
  },

  // Pattern validation
  pattern: (value: string, pattern: RegExp, message?: string): string | null => {
    if (!pattern.test(value)) {
      return message || 'Invalid format';
    }
    return null;
  },

  // Custom validation
  custom: (value: any, validator: (value: any) => boolean, message: string): string | null => {
    if (!validator(value)) {
      return message;
    }
    return null;
  },

  // Validate form
  validateForm: <T extends Record<string, any>>(form: T, rules: Partial<Record<keyof T, (value: T[keyof T]) => string | null>>): Partial<Record<keyof T, string>> => {
    const errors: Partial<Record<keyof T, string>> = {};
    
    for (const key in rules) {
      if (form.hasOwnProperty(key)) {
        const error = rules[key]?.(form[key]);
        if (error) {
          errors[key] = error;
        }
      }
    }
    
    return errors;
  },

  // Validate object
  validateObject: <T>(obj: T, schema: Partial<Record<keyof T, { required?: boolean; validator?: (value: T[keyof T]) => boolean; message?: string }>>): Partial<Record<keyof T, string>> => {
    const errors: Partial<Record<keyof T, string>> = {};
    
    for (const key in schema) {
      if (obj.hasOwnProperty(key)) {
        const rule = schema[key];
        const value = obj[key];
        
        if (rule?.required && validationUtils.required(value)) {
          errors[key] = rule.message || 'This field is required';
        } else if (value !== null && value !== undefined && rule?.validator && !rule.validator(value)) {
          errors[key] = rule.message || 'Invalid value';
        }
      }
    }
    
    return errors;
  },

  // Sanitize string
  sanitizeString: (str: string): string => {
    return str
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  // Sanitize HTML
  sanitizeHtml: (html: string): string => {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
  },

  // Check if object is valid
  isValid: <T>(obj: T, schema: Partial<Record<keyof T, any>>): boolean => {
    const errors = validationUtils.validateObject(obj, schema);
    return Object.keys(errors).length === 0;
  },
};