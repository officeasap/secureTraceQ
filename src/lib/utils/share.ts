export const shareUtils = {
  // Share URL
  shareUrl: async (url: string, title?: string, text?: string): Promise<boolean> => {
    if ('share' in navigator) {
      try {
        await navigator.share({
          title: title || document.title,
          text: text || '',
          url: url,
        });
        return true;
      } catch (error) {
        console.error('Share failed:', error);
        return false;
      }
    }
    
    // Fallback to clipboard
    return await clipboardUtils.copy(url);
  },

  // Share tracking code
  shareTrackingCode: async (trackingCode: string): Promise<boolean> => {
    const url = `${window.location.origin}/tracking/${trackingCode}`;
    return await shareUtils.shareUrl(url, 'SecureTrace Tracking', `Track your delivery: ${trackingCode}`);
  },
};