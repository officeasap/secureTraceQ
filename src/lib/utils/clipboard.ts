export const clipboardUtils = {
  // Copy text to clipboard
  copy: async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Copy failed:', error);
      return false;
    }
  },

  // Copy object as JSON
  copyObject: async (obj: any): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
      return true;
    } catch (error) {
      console.error('Copy object failed:', error);
      return false;
    }
  },

  // Read from clipboard
  read: async (): Promise<string> => {
    try {
      return await navigator.clipboard.readText();
    } catch (error) {
      console.error('Read from clipboard failed:', error);
      throw error;
    }
  },
};