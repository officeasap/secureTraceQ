export const urlUtils = {
  // Parse URL
  parse: (url: string): URL => {
    return new URL(url);
  },

  // Get origin
  getOrigin: (url: string): string => {
    return new URL(url).origin;
  },

  // Get pathname
  getPathname: (url: string): string => {
    return new URL(url).pathname;
  },

  // Get query parameters
  getQueryParams: (url: string): Record<string, string> => {
    const urlObj = new URL(url);
    const params: Record<string, string> = {};
    
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    return params;
  },

  // Build URL
  build: (base: string, params?: Record<string, string>): string => {
    const url = new URL(base);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    return url.toString();
  },

  // Remove query parameters
  removeQueryParams: (url: string, params: string[]): string => {
    const urlObj = new URL(url);
    params.forEach(param => urlObj.searchParams.delete(param));
    return urlObj.toString();
  },

  // Check if URL is absolute
  isAbsolute: (url: string): boolean => {
    return /^https?:\/\//i.test(url);
  },

  // Check if URL is relative
  isRelative: (url: string): boolean => {
    return !urlUtils.isAbsolute(url);
  },

  // Get base URL
  getBaseUrl: (): string => {
    return window.location.origin;
  },

  // Get full URL
  getFullUrl: (path?: string): string => {
    const base = urlUtils.getBaseUrl();
    return path ? `${base}${path}` : base;
  },
};