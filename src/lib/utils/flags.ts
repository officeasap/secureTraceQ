export const flagUtils = {
  // Check if feature is enabled
  isEnabled: (feature: string): boolean => {
    const flags = localStorage.getItem('feature_flags');
    if (!flags) return false;
    
    try {
      const parsed = JSON.parse(flags);
      return parsed[feature] || false;
    } catch {
      return false;
    }
  },

  // Enable feature
  enable: (feature: string): void => {
    const flags = localStorage.getItem('feature_flags');
    const parsed = flags ? JSON.parse(flags) : {};
    parsed[feature] = true;
    localStorage.setItem('feature_flags', JSON.stringify(parsed));
  },

  // Disable feature
  disable: (feature: string): void => {
    const flags = localStorage.getItem('feature_flags');
    if (!flags) return;
    
    try {
      const parsed = JSON.parse(flags);
      delete parsed[feature];
      localStorage.setItem('feature_flags', JSON.stringify(parsed));
    } catch {}
  },

  // Get all enabled features
  getEnabled: (): string[] => {
    const flags = localStorage.getItem('feature_flags');
    if (!flags) return [];
    
    try {
      const parsed = JSON.parse(flags);
      return Object.keys(parsed).filter(key => parsed[key]);
    } catch {
      return [];
    }
  },
};