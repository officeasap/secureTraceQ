export const formatters = {
  // Format date
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    
    const formatOptions = { ...defaultOptions, ...options };
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return dateObj.toLocaleDateString('en-US', formatOptions);
  },

  // Format currency
  formatCurrency: (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },

  // Format tracking code
  formatTrackingCode: (code: string): string => {
    return code.toUpperCase().replace(/(\w{4})/g, '$1-').replace(/-$/, '');
  },

  // Truncate text
  truncate: (text: string, length: number = 100): string => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  },

  // Capitalize first letter
  capitalize: (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },
};