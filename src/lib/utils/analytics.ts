export const analyticsUtils = {
  // Track page view
  trackPageView: (path: string, title?: string) => {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
        page_title: title,
      });
    }

    // Custom analytics
    console.log('Page view tracked:', { path, title, timestamp: new Date().toISOString() });
  },

  // Track event
  trackEvent: (category: string, action: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    console.log('Event tracked:', { category, action, label, value });
  },

  // Track error
  trackError: (error: Error, errorInfo?: any) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      });
    }

    console.error('Error tracked:', { error, errorInfo, timestamp: new Date().toISOString() });
  },

  // Track user interaction
  trackInteraction: (element: string, action: string, metadata?: any) => {
    analyticsUtils.trackEvent('User Interaction', action, element, metadata);
  },
};