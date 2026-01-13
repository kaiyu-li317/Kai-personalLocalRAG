class Log {
  private static console = true;
  log(title: string, text: string) {
    if (!Log.console) return;
    if (import.meta.env.MODE === 'production') return;
    const color = '#18A058';
    console.log(
      `%c ${title} %c ${text} %c`,
      `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
      'background:transparent'
    );
  }
  closeConsole() {
    Log.console = false;
  }
}

class EventDispatcher extends Log {
  private listeners: { [type: string]: Function[] } = {};

  protected addEventListener(type: string, listener: Function) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    if (this.listeners[type].indexOf(listener) === -1) {
      this.listeners[type].push(listener);
    }
  }

  protected removeEventListener(type: string) {
    this.listeners[type] = [];
  }

  protected dispatchEvent(type: string, data: any) {
    const listenerArray = this.listeners[type] || [];
    if (listenerArray.length === 0) return;
    listenerArray.forEach(listener => {
      listener.call(this, data);
    });
  }
}

export default class WebSocketClient extends EventDispatcher {
  // #WebSocket connection URL
  private url = '';
  // #WebSocket instance
  private socket: WebSocket | null = null;
  // #Reconnection attempts
  private reconnectAttempts = 0;
  // #Maximum reconnection attempts
  private maxReconnectAttempts = 5;
  // #Reconnection interval
  private reconnectInterval = 10000; // 10 seconds
  // #Heartbeat data sending interval
  private heartbeatInterval = 1000 * 30;
  // #Timer id
  private heartbeatTimer: any = undefined;
  // #Completely terminate WebSocket
  private stopWs = false;
  // *Constructor
  constructor(url: string) {
    super();
    this.url = url;
  }
  // >Lifecycle hooks
  onopen(callBack: Function) {
    this.addEventListener('open', callBack);
  }
  onmessage(callBack: Function) {
    this.addEventListener('message', callBack);
  }
  onclose(callBack: Function) {
    this.addEventListener('close', callBack);
  }
  onerror(callBack: Function) {
    this.addEventListener('error', callBack);
  }
  // >Send message
  public send(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('[WebSocket] Not connected');
    }
  }

  // !Initialize connection
  public connect(): void {
    if (this.reconnectAttempts === 0) {
      this.log('WebSocket', `Initializing connection...      ${this.url}`);
    }
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }
    this.socket = new WebSocket(this.url);

    // !WebSocket connection successful
    this.socket.onopen = event => {
      this.stopWs = false;
      // Reset reconnection attempts on successful connection
      this.reconnectAttempts = 0;
      // Stop current heartbeat detection and restart on successful connection
      this.startHeartbeat();
      this.log('WebSocket', `Connection successful, waiting for server data push [onopen]...   ${this.url}`);
      this.dispatchEvent('open', event);
    };

    this.socket.onmessage = event => {
      this.dispatchEvent('message', event);
      this.startHeartbeat();
    };

    this.socket.onclose = event => {
      if (this.reconnectAttempts === 0) {
        this.log('WebSocket', `Connection closed [onclose]...  ${this.url}`);
      }
      if (!this.stopWs) {
        this.handleReconnect();
      }
      this.dispatchEvent('close', event);
    };

    this.socket.onerror = event => {
      if (this.reconnectAttempts === 0) {
        this.log('WebSocket', `Connection error [onerror]...  ${this.url}`);
      }
      this.closeHeartbeat();
      this.dispatchEvent('error', event);
    };
  }

  // > Reconnection logic for network disconnection
  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.log('WebSocket', `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})     ${this.url}`);
      setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    } else {
      this.closeHeartbeat();
      this.log('WebSocket', `Max reconnection attempts reached, terminating reconnection: ${this.url}`);
    }
  }

  // >Close connection
  public close(): void {
    if (this.socket) {
      this.stopWs = true;
      this.socket.close();
      this.socket = null;
      this.removeEventListener('open');
      this.removeEventListener('message');
      this.removeEventListener('close');
      this.removeEventListener('error');
    }
    this.closeHeartbeat();
  }

  // >Start heartbeat detection -> Periodically send heartbeat messages
  private startHeartbeat(): void {
    if (this.stopWs) return;
    if (this.heartbeatTimer) {
      this.closeHeartbeat();
    }
    this.heartbeatTimer = setInterval(() => {
      if (this.socket) {
        this.socket.send(JSON.stringify({ type: 'ping', data: {} }));
        this.log('WebSocket', 'Sending heartbeat data...');
      } else {
        console.error('[WebSocket] Not connected');
      }
    }, this.heartbeatInterval);
  }

  // >Close heartbeat
  private closeHeartbeat(): void {
    clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = undefined;
  }
}