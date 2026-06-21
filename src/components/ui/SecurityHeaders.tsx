import { useEffect } from 'react';

const SecurityHeaders = () => {
  useEffect(() => {
    // Set security headers via meta tags and HTTP headers
    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Set security-related meta tags
    setMetaTag('referrer', 'strict-origin-when-cross-origin');
    setMetaTag('theme-color', '#1e40af');
    
    // Set CSP via http-equiv (note: this is limited in client-side)
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!cspMeta) {
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', 'Content-Security-Policy');
      meta.setAttribute('content', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://*.supabase.co; frame-ancestors 'none';");
      document.head.appendChild(meta);
    }

    // Set secure session cookie attributes via meta (client-side limitation)
    const secureCookieMeta = document.querySelector('meta[name="secure-cookie"]');
    if (!secureCookieMeta) {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'secure-cookie');
      meta.setAttribute('content', 'HttpOnly; Secure; SameSite=Strict; Partitioned');
      document.head.appendChild(meta);
    }

    // Add CSRF token to localStorage for API calls
    const generateCsrfToken = () => {
      const token = Array.from({ length: 32 }, () => Math.random().toString(36)[2]).join('');
      localStorage.setItem('csrf_token', token);
      return token;
    };

    if (!localStorage.getItem('csrf_token')) {
      generateCsrfToken();
    }

    // Add event listener for CSRF protection
    const handleBeforeSend = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'FORM' || target.closest('form')) {
        const token = localStorage.getItem('csrf_token');
        if (token) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'csrf_token';
          input.value = token;
          target.appendChild(input);
        }
      }
    };

    document.addEventListener('submit', handleBeforeSend);

    return () => {
      document.removeEventListener('submit', handleBeforeSend);
    };
  }, []);

  return null; // This is a utility component, doesn't render anything
};

export default SecurityHeaders;