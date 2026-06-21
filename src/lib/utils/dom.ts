export const domUtils = {
  // Get element by ID
  getById: (id: string): HTMLElement | null => {
    return document.getElementById(id);
  },

  // Get elements by class
  getByClass: (className: string): NodeListOf<HTMLElement> => {
    return document.getElementsByClassName(className) as NodeListOf<HTMLElement>;
  },

  // Get elements by tag
  getByTag: (tagName: string): NodeListOf<HTMLElement> => {
    return document.getElementsByTagName(tagName) as NodeListOf<HTMLElement>;
  },

  // Find element
  find: (selector: string): HTMLElement | null => {
    return document.querySelector(selector);
  },

  // Find all elements
  findAll: (selector: string): NodeListOf<HTMLElement> => {
    return document.querySelectorAll(selector);
  },

  // Get parent
  getParent: (element: HTMLElement, selector?: string): HTMLElement | null => {
    let parent = element.parentElement;
    while (parent) {
      if (!selector || parent.matches(selector)) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return null;
  },

  // Get children
  getChildren: (element: HTMLElement): HTMLElement[] => {
    return Array.from(element.children) as HTMLElement[];
  },

  // Get siblings
  getSiblings: (element: HTMLElement): HTMLElement[] => {
    const parent = element.parentElement;
    if (!parent) return [];
    return Array.from(parent.children).filter(child => child !== element) as HTMLElement[];
  },

  // Get next sibling
  getNextSibling: (element: HTMLElement): HTMLElement | null => {
    return element.nextElementSibling as HTMLElement;
  },

  // Get previous sibling
  getPreviousSibling: (element: HTMLElement): HTMLElement | null => {
    return element.previousElementSibling as HTMLElement;
  },

  // Check if element contains another
  contains: (parent: HTMLElement, child: HTMLElement): boolean => {
    return parent.contains(child);
  },

  // Get element offset
  getOffset: (element: HTMLElement): { top: number; left: number } => {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };
  },

  // Get viewport dimensions
  getViewport: (): { width: number; height: number } => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },

  // Check if element is visible
  isVisible: (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Scroll to element
  scrollTo: (element: HTMLElement, behavior: 'auto' | 'smooth' = 'auto'): void => {
    element.scrollIntoView({ behavior, block: 'center' });
  },

  // Get scroll position
  getScrollPosition: (): { x: number; y: number } => {
    return {
      x: window.scrollX,
      y: window.scrollY,
    };
  },

  // Set scroll position
  setScrollPosition: (x: number, y: number): void => {
    window.scrollTo(x, y);
  },
};