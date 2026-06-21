export const pwaUtils = {
  // Check if app is installable
  isInstallable: (): boolean => {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  },

  // Request installation
  installApp: async (): Promise<boolean> => {
    if (!('serviceWorker' in navigator)) return false;

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Show install prompt if available
      if ('showInstallPrompt' in registration) {
        return await (registration as any).showInstallPrompt();
      }

      return false;
    } catch (error) {
      console.error('PWA installation failed:', error);
      return false;
    }
  },

  // Check if app is installed
  isInstalled: (): boolean => {
    return window.matchMedia('(display-mode: standalone)').matches;
  },

  // Register service worker
  registerServiceWorker: async (): Promise<ServiceWorkerRegistration | null> => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        return registration;
      } catch (error) {
        console.error('Service worker registration failed:', error);
        return null;
      }
    }
    return null;
  },

  // Request notification permission
  requestNotificationPermission: async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.error('Notification permission request failed:', error);
      return 'denied';
    }
  },
};