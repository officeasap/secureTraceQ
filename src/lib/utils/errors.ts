export const errorUtils = {
  // Format error
  format: (error: any): { message: string; code?: string; details?: any } => {
    if (error instanceof Error) {
      return {
        message: error.message,
        code: error.name,
        details: error.stack,
      };
    }
    
    if (typeof error === 'object' && error !== null) {
      return {
        message: error.message || 'Unknown error',
        code: error.code,
        details: error,
      };
    }
    
    return {
      message: String(error),
    };
  },

  // Handle error
  handle: (error: any, context?: string): void => {
    const formatted = errorUtils.format(error);
    
    console.error(`Error${context ? ` in ${context}:` : ':'}`, formatted);
    
    // Send to error tracking service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: formatted.message,
        fatal: false,
      });
    }
  },

  // Retry function
  retry: async <T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    let lastError: any;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
      }
    }
    
    throw lastError;
  },
};