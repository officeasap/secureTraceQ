export const timeUtils = {
  // Get current timestamp
  now: (): number => {
    return Date.now();
  },

  // Format relative time
  relativeTime: (timestamp: number): string => {
    const now = timeUtils.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return timeUtils.formatDate(new Date(timestamp));
  },

  // Format date
  formatDate: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  // Countdown timer
  countdown: (targetTime: number, onComplete?: () => void): { remaining: number; stop: () => void } => {
    let interval: NodeJS.Timeout;
    
    const update = () => {
      const remaining = Math.max(0, targetTime - Date.now());
      if (remaining <= 0) {
        onComplete?.();
        return;
      }
    };
    
    interval = setInterval(update, 1000);
    update();
    
    return {
      remaining: Math.max(0, targetTime - Date.now()),
      stop: () => clearInterval(interval),
    };
  },

  // Sleep promise
  sleep: (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
};