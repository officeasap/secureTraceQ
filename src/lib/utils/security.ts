export const securityUtils = {
  // Generate CSRF token
  generateCsrfToken: (): string => {
    const token = Array.from({ length: 32 }, () => Math.random().toString(36)[2]).join('');
    localStorage.setItem('csrf_token', token);
    return token;
  },

  // Get CSRF token
  getCsrfToken: (): string | null => {
    return localStorage.getItem('csrf_token');
  },

  // Validate session
  validateSession: async (token: string): Promise<boolean> => {
    // In production, validate against your backend
    return true;
  },

  // Secure fetch wrapper
  secureFetch: async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = securityUtils.getCsrfToken();
    
    const headers = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token || '',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'same-origin',
    });

    if (response.status === 401) {
      // Session expired, redirect to login
      localStorage.removeItem('csrf_token');
      window.location.href = '/';
    }

    return response;
  },

  // Rate limiting utility
  createRateLimiter: (maxAttempts: number, windowMs: number) => {
    const attempts: { [key: string]: number[] } = {};

    return {
      isAllowed: (key: string): boolean => {
        const now = Date.now();
        if (!attempts[key]) attempts[key] = [];

        // Clean old attempts
        attempts[key] = attempts[key].filter(time => now - time < windowMs);

        if (attempts[key].length >= maxAttempts) {
          return false;
        }

        attempts[key].push(now);
        return true;
      },

      getRemainingAttempts: (key: string): number => {
        const now = Date.now();
        if (!attempts[key]) return maxAttempts;

        attempts[key] = attempts[key].filter(time => now - time < windowMs);
        return Math.max(0, maxAttempts - attempts[key].length);
      },
    };
  },
};