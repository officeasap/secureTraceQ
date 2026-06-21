export const i18nUtils = {
  // Get current language
  getLanguage: (): string => {
    return localStorage.getItem('language') || 'en';
  },

  // Set language
  setLanguage: (lang: string): void => {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Emit language change event
    eventUtils.emit('languagechange', { language: lang });
  },

  // Translate key
  t: (key: string, options?: Record<string, any>): string => {
    const lang = i18nUtils.getLanguage();
    const translations = i18nUtils.getTranslations(lang);
    
    let translation = translations[key] || key;
    
    if (options) {
      Object.entries(options).forEach(([placeholder, value]) => {
        translation = translation.replace(`{{${placeholder}}}`, String(value));
      });
    }
    
    return translation;
  },

  // Get translations for language
  getTranslations: (lang: string): Record<string, string> => {
    const defaultTranslations = {
      'en': {
        'app.name': 'SecureTrace',
        'app.description': 'Corporate Verification Portal',
        'nav.home': 'Home',
        'nav.admin': 'Admin Dashboard',
        'nav.auditLogs': 'Audit Logs',
        'auth.login': 'Login',
        'auth.logout': 'Logout',
        'auth.verify': 'Verify',
        'error.generic': 'An error occurred',
        'error.notFound': 'Page not found',
        'error.unauthorized': 'Access denied',
        'loading': 'Loading...',
        'success': 'Success',
        'warning': 'Warning',
        'error': 'Error',
      },
      'es': {
        'app.name': 'SecureTrace',
        'app.description': 'Portal de Verificación Corporativa',
        'nav.home': 'Inicio',
        'nav.admin': 'Panel de Administración',
        'nav.auditLogs': 'Registros de Auditoría',
        'auth.login': 'Iniciar Sesión',
        'auth.logout': 'Cerrar Sesión',
        'auth.verify': 'Verificar',
        'error.generic': 'Ocurrió un error',
        'error.notFound': 'Página no encontrada',
        'error.unauthorized': 'Acceso denegado',
        'loading': 'Cargando...',
        'success': 'Éxito',
        'warning': 'Advertencia',
        'error': 'Error',
      }
    };
    
    return defaultTranslations[lang] || defaultTranslations.en;
  },
};