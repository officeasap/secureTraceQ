export const routingUtils = {
  // Get current path
  getCurrentPath: (): string => {
    return window.location.pathname;
  },

  // Navigate with transition
  navigateWithTransition: (path: string, transition: 'fade' | 'slide' | 'zoom' = 'fade'): void => {
    const main = document.querySelector('main');
    if (!main) return;
    
    main.classList.add('page-transition');
    setTimeout(() => {
      window.location.href = path;
    }, 150);
  },

  // Get query parameter
  getQueryParam: (param: string): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  // Set query parameter
  setQueryParam: (param: string, value: string): void => {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url.toString());
  },

  // Remove query parameter
  removeQueryParam: (param: string): void => {
    const url = new URL(window.location.href);
    url.searchParams.delete(param);
    window.history.pushState({}, '', url.toString());
  },

  // Check if path is active
  isPathActive: (path: string): boolean => {
    return routingUtils.getCurrentPath() === path;
  },

  // Build navigation URL
  buildUrl: (path: string, params?: Record<string, string>): string => {
    const url = new URL(path, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    return url.toString();
  },
};