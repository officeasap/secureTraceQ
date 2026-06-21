export const colorUtils = {
  // Convert hex to RGB
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  // Convert RGB to hex
  rgbToHex: (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  },

  // Convert HSL to RGB
  hslToRgb: (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h / 360 + 1/3);
      g = hue2rgb(p, q, h / 360);
      b = hue2rgb(p, q, h / 360 - 1/3);
    }
    
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  },

  // Get luminance
  getLuminance: (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  // Get contrast ratio
  getContrastRatio: (color1: string, color2: string): number => {
    const rgb1 = colorUtils.hexToRgb(color1);
    const rgb2 = colorUtils.hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return 0;
    
    const lum1 = colorUtils.getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = colorUtils.getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const lighter = Math.min(lum1, lum2);
    const darker = Math.max(lum1, lum2);
    
    return (darker + 0.05) / (lighter + 0.05);
  },

  // Check if color is accessible
  isAccessible: (foreground: string, background: string, minRatio: number = 4.5): boolean => {
    const ratio = colorUtils.getContrastRatio(foreground, background);
    return ratio >= minRatio;
  },

  // Generate random color
  random: (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  // Lighten color
  lighten: (color: string, amount: number): string => {
    const rgb = colorUtils.hexToRgb(color);
    if (!rgb) return color;
    
    const newRgb = {
      r: Math.min(255, Math.round(rgb.r + (255 - rgb.r) * amount)),
      g: Math.min(255, Math.round(rgb.g + (255 - rgb.g) * amount)),
      b: Math.min(255, Math.round(rgb.b + (255 - rgb.b) * amount))
    };
    
    return colorUtils.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  },

  // Darken color
  darken: (color: string, amount: number): string => {
    const rgb = colorUtils.hexToRgb(color);
    if (!rgb) return color;
    
    const newRgb = {
      r: Math.max(0, Math.round(rgb.r * (1 - amount))),
      g: Math.max(0, Math.round(rgb.g * (1 - amount))),
      b: Math.max(0, Math.round(rgb.b * (1 - amount)))
    };
    
    return colorUtils.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  },
};