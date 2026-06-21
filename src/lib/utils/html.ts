export const htmlUtils = {
  // Create element
  create: (tag: string, options?: {
    id?: string;
    className?: string;
    text?: string;
    html?: string;
    attributes?: Record<string, string>;
  }): HTMLElement => {
    const element = document.createElement(tag);
    
    if (options?.id) element.id = options.id;
    if (options?.className) element.className = options.className;
    if (options?.text) element.textContent = options.text;
    if (options?.html) element.innerHTML = options.html;
    
    if (options?.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }
    
    return element;
  },

  // Get element by selector
  get: (selector: string): HTMLElement | null => {
    return document.querySelector(selector);
  },

  // Get all elements
  getAll: (selector: string): NodeListOf<HTMLElement> => {
    return document.querySelectorAll(selector);
  },

  // Add class
  addClass: (element: HTMLElement, className: string): void => {
    element.classList.add(className);
  },

  // Remove class
  removeClass: (element: HTMLElement, className: string): void => {
    element.classList.remove(className);
  },

  // Toggle class
  toggleClass: (element: HTMLElement, className: string): void => {
    element.classList.toggle(className);
  },

  // Set attribute
  setAttribute: (element: HTMLElement, name: string, value: string): void => {
    element.setAttribute(name, value);
  },

  // Get attribute
  getAttribute: (element: HTMLElement, name: string): string | null => {
    return element.getAttribute(name);
  },

  // Remove element
  remove: (element: HTMLElement): void => {
    element.remove();
  },

  // Append to parent
  append: (child: HTMLElement, parent: HTMLElement): void => {
    parent.appendChild(child);
  },

  // Prepend to parent
  prepend: (child: HTMLElement, parent: HTMLElement): void => {
    parent.insertBefore(child, parent.firstChild);
  },

  // Insert before
  insertBefore: (newElement: HTMLElement, existingElement: HTMLElement): void => {
    existingElement.parentNode?.insertBefore(newElement, existingElement);
  },

  // Replace element
  replace: (oldElement: HTMLElement, newElement: HTMLElement): void => {
    oldElement.parentNode?.replaceChild(newElement, oldElement);
  },

  // Get HTML content
  getHtml: (element: HTMLElement): string => {
    return element.innerHTML;
  },

  // Set HTML content
  setHtml: (element: HTMLElement, html: string): void => {
    element.innerHTML = html;
  },

  // Get text content
  getText: (element: HTMLElement): string => {
    return element.textContent || '';
  },

  // Set text content
  setText: (element: HTMLElement, text: string): void => {
    element.textContent = text;
  },
};