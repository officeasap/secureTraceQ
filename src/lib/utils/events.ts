export const eventUtils = {
  // Add event listener
  addListener: (
    element: EventTarget,
    event: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void => {
    element.addEventListener(event, handler, options);
  },

  // Remove event listener
  removeListener: (
    element: EventTarget,
    event: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void => {
    element.removeEventListener(event, handler, options);
  },

  // Emit custom event
  emit: (eventName: string, detail?: any): void => {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  },

  // Listen for custom event
  listen: (eventName: string, handler: (event: CustomEvent) => void): (() => void) => {
    const wrappedHandler = (event: Event) => handler(event as CustomEvent);
    document.addEventListener(eventName, wrappedHandler);
    return () => document.removeEventListener(eventName, wrappedHandler);
  },

  // Get event target
  getTarget: (event: Event): HTMLElement => {
    return event.target as HTMLElement;
  },

  // Get event type
  getType: (event: Event): string => {
    return event.type;
  },

  // Get event timestamp
  getTimestamp: (event: Event): number => {
    return event.timeStamp;
  },

  // Prevent default
  preventDefault: (event: Event): void => {
    event.preventDefault();
  },

  // Stop propagation
  stopPropagation: (event: Event): void => {
    event.stopPropagation();
  },

  // Get mouse position
  getMousePosition: (event: MouseEvent): { x: number; y: number } => {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  },

  // Get touch position
  getTouchPosition: (event: TouchEvent): { x: number; y: number } => {
    const touch = event.touches[0] || event.changedTouches[0];
    return {
      x: touch.clientX,
      y: touch.clientY,
    };
  },
};