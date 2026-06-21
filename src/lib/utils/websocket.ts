export const websocketUtils = {
  // Create WebSocket connection
  connect: (url: string, handlers?: {
    onMessage?: (data: any) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onError?: (error: Event) => void;
  }): WebSocket => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      handlers?.onOpen?.();
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handlers?.onMessage?.(data);
      } catch (error) {
        console.error('WebSocket message parse error:', error);
      }
    };
    
    ws.onclose = () => {
      handlers?.onClose?.();
    };
    
    ws.onerror = (error) => {
      handlers?.onError?.(error);
    };
    
    return ws;
  },

  // Send message
  send: (ws: WebSocket, data: any): void => {
    ws.send(JSON.stringify(data));
  },

  // Close connection
  close: (ws: WebSocket, code?: number, reason?: string): void => {
    ws.close(code || 1000, reason || 'Normal closure');
  },
};