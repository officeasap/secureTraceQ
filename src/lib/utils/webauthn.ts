export const webauthnUtils = {
  // Check if WebAuthn is supported
  isSupported: (): boolean => {
    return 'credentials' in navigator && 'PublicKeyCredential' in window;
  },

  // Register new credential
  register: async (options: any): Promise<Credential | null> => {
    if (!webauthnUtils.isSupported()) {
      throw new Error('WebAuthn not supported');
    }
    
    try {
      const credential = await navigator.credentials.create({
        publicKey: options,
      });
      return credential;
    } catch (error) {
      console.error('WebAuthn registration failed:', error);
      throw error;
    }
  },

  // Authenticate with existing credential
  authenticate: async (options: any): Promise<Credential | null> => {
    if (!webauthnUtils.isSupported()) {
      throw new Error('WebAuthn not supported');
    }
    
    try {
      const credential = await navigator.credentials.get({
        publicKey: options,
      });
      return credential;
    } catch (error) {
      console.error('WebAuthn authentication failed:', error);
      throw error;
    }
  },

  // Generate registration options
  generateRegistrationOptions: (userId: string, userName: string): any => {
    return {
      challenge: cryptoUtils.randomString(32),
      rp: {
        name: 'SecureTrace',
        id: window.location.hostname,
      },
      user: {
        id: userId,
        name: userName,
        displayName: userName,
      },
      pubKeyCredParams: [
        {
          type: 'public-key',
          alg: -7, // ES256
        },
        {
          type: 'public-key',
          alg: -257, // RS256
        },
      ],
      timeout: 60000,
      attestation: 'none',
    };
  },

  // Generate authentication options
  generateAuthenticationOptions: (): any => {
    return {
      challenge: cryptoUtils.randomString(32),
      timeout: 60000,
      rpId: window.location.hostname,
      allowCredentials: [
        {
          type: 'public-key',
          transports: ['internal', 'hybrid', 'cross-platform'],
        },
      ],
    };
  },
};