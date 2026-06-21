export const cookieUtils = {
  // Set cookie
  set: (name: string, value: string, options?: {
    expires?: Date | number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  }): void => {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    if (options?.expires) {
      if (typeof options.expires === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        cookie += `; expires=${date.toUTCString()}`;
      } else {
        cookie += `; expires=${options.expires.toUTCString()}`;
      }
    }
    
    if (options?.path) cookie += `; path=${options.path}`;
    if (options?.domain) cookie += `; domain=${options.domain}`;
    if (options?.secure) cookie += '; secure';
    if (options?.sameSite) cookie += `; samesite=${options.sameSite}`;
    
    document.cookie = cookie;
  },

  // Get cookie
  get: (name: string): string | null => {
    const nameEQ = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
      }
    }
    
    return null;
  },

  // Remove cookie
  remove: (name: string, path?: string, domain?: string): void => {
    cookieUtils.set(name, '', {
      expires: -1,
      path,
      domain,
    });
  },

  // Get all cookies
  getAll: (): Record<string, string> => {
    const cookies: Record<string, string> = {};
    const all = document.cookie.split(';');
    
    for (let i = 0; i < all.length; i++) {
      const cookie = all[i];
      const [name, value] = cookie.split('=').map(part => part.trim());
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
    }
    
    return cookies;
  },
};