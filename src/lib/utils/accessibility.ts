export const accessibilityUtils = {
  // Announce to screen reader
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Focus trap
  trapFocus: (container: HTMLElement): () => void => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },

  // Get color contrast ratio
  getContrastRatio: (color1: string, color2: string): number => {
    // Convert hex to RGB
    const rgb1 = accessibilityUtils.hexToRgb(color1);
    const rgb2 = accessibilityUtils.hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 0;
    
    const luminance1 = accessibilityUtils.getLuminance(rgb1);
    const luminance2 = accessibilityUtils.getLuminance(rgb2);
    
    const lighter = Math.min(luminance1, luminance2);
    const darker = Math.max(luminance1, luminance2);
    
    return (darker + 0.05) / (lighter + 0.05);
  },

  // Check if color is accessible
  isAccessible: (foreground: string, background: string): boolean => {
    const ratio = accessibilityUtils.getContrastRatio(foreground, background);
    return ratio >= 4.5; // WCAG AA standard
  },

  // Hex to RGB converter
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  // Get luminance
  getLuminance: (rgb: { r: number; g: number; b: number }): number => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  },
};