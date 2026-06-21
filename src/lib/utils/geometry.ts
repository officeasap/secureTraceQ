export const geometryUtils = {
  // Calculate distance between two points
  distance: (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  },

  // Calculate angle between three points
  angle: (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number => {
    const dx1 = x2 - x1;
    const dy1 = y2 - y1;
    const dx2 = x3 - x2;
    const dy2 = y3 - y2;
    
    return Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1);
  },

  // Get rectangle dimensions
  getRect: (element: HTMLElement): DOMRect => {
    return element.getBoundingClientRect();
  },

  // Check if point is inside rectangle
  isPointInRect: (pointX: number, pointY: number, rect: DOMRect): boolean => {
    return (
      pointX >= rect.left &&
      pointX <= rect.right &&
      pointY >= rect.top &&
      pointY <= rect.bottom
    );
  },

  // Get center of rectangle
  getCenter: (rect: DOMRect): { x: number; y: number } => {
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  },

  // Calculate aspect ratio
  getAspectRatio: (width: number, height: number): number => {
    return width / height;
  },

  // Clamp value
  clamp: (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  },

  // Round to nearest
  round: (value: number, precision: number = 0): number => {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  },
};