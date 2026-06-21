export const notificationUtils = {
  // Show success toast
  success: (message: string, title?: string) => {
    // Use your toast library here
    console.log('Success:', { title, message });
  },

  // Show error toast
  error: (message: string, title?: string) => {
    // Use your toast library here
    console.log('Error:', { title, message });
  },

  // Show warning toast
  warning: (message: string, title?: string) => {
    // Use your toast library here
    console.log('Warning:', { title, message });
  },

  // Show info toast
  info: (message: string, title?: string) => {
    // Use your toast library here
    console.log('Info:', { title, message });
  },

  // Show confirmation dialog
  confirm: async (message: string, title?: string): Promise<boolean> => {
    return window.confirm(message);
  },

  // Show alert
  alert: (message: string, title?: string) => {
    window.alert(message);
  },
};