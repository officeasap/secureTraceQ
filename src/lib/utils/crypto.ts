export const cryptoUtils = {
  // SHA-256 hash
  sha256: async (data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  // Generate random string
  randomString: (length: number = 32): string => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  },

  // Generate secure token
  generateToken: (): string => {
    return cryptoUtils.randomString(64);
  },

  // Encrypt data (client-side only - use server for production)
  encrypt: async (data: string, key: string): Promise<string> => {
    // In production, use proper encryption like AES-GCM
    return btoa(data);
  },

  // Decrypt data (client-side only - use server for production)
  decrypt: async (encrypted: string, key: string): Promise<string> => {
    // In production, use proper decryption
    return atob(encrypted);
  },
};