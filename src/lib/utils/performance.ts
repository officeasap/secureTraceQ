export const performanceUtils = {
  // Measure performance
  measurePerformance: (name: string, fn: () => any): any => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    console.log(`${name} took ${end - start}ms`);
    return result;
  },

  // Get page load metrics
  getPageMetrics: (): PerformanceNavigationTiming | null => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return navigation;
    }
    return null;
  },

  // Check if user has slow connection
  isSlowConnection: (): boolean => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
    }
    return false;
  },

  // Preload resource
  preloadResource: (url: string, type: 'script' | 'style' | 'image'): Promise<void> => {
    return new Promise((resolve, reject) => {
      const element = document.createElement(type === 'script' ? 'script' : type === 'style' ? 'link' : 'link');
      
      if (type === 'script') {
        element.src = url;
        element.onload = () => resolve();
        element.onerror = () => reject();
        document.head.appendChild(element);
      } else if (type === 'style') {
        element.rel = 'stylesheet';
        element.href = url;
        element.onload = () => resolve();
        element.onerror = () => reject();
        document.head.appendChild(element);
      } else {
        element.rel = 'preload';
        element.as = 'image';
        element.href = url;
        element.onload = () => resolve();
        element.onerror = () => reject();
        document.head.appendChild(element);
      }
    });
  },
};