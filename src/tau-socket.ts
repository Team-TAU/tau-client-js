import WebSocket from 'ws';
import { TwitchEvents } from './twitch-events';

export interface TauSocketOptions {
  url: string;
  token: string;
  isSecure?: boolean;
}

export interface ConnectResult {
  error?: Error;
  message?: string;
}

export class TauSocket extends TwitchEvents {
  private socket?: WebSocket;
  private token!: string;
  private isInitialSetup: boolean = true;

  /**
   * The main class for handling connection to an instance of TAU and capturing websocket events
   */
  constructor() {
    super();
  }

  public async connect(options: TauSocketOptions): Promise<ConnectResult> {
    // TODO: validate options provided
    this.token = options.token;

    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(options.url, {
          protocol: options.isSecure === true ? 'wss' : 'ws',
        });

        this.socket.onopen = (_event: WebSocket.OpenEvent): void => {
          console.log('Socket opened');
          const message = `{ "token": "${this.token}" }`;
          this.socket!.send(message, handleAuthResponse);
        };

        const handleAuthResponse = (error?: Error): void => {
          if (error) {
            console.error(error);
            return reject({ error, message: undefined });
          } else {
            this.isInitialSetup = false;
            // Listen for messages after successful authentication
            this.socket!.onmessage = this.handleSocketMessage;
            return resolve({
              error: undefined,
              message:
                'Successfully authenticated with TAU and listening for events...',
            });
          }
        };

        this.socket.onerror = (_event: WebSocket.ErrorEvent): void => {
          if (this.isInitialSetup) {
            return reject({
              error: _event.error,
              message: undefined,
            });
          }
        };

        this.socket.onclose = this.handleClosedSocket;
      } catch (error) {
        return reject({ error, message: undefined });
      }
    });
  }

  handleClosedSocket(_event: WebSocket.CloseEvent): void {
    console.warn(`Socket closed: ${_event.reason}`);
    this.socket = undefined;
  }

  handleSocketMessage(_event: WebSocket.MessageEvent): void {
    // TODO: switch on event types and call respective function in TwitchEvents (such as onFollow)
    console.log(_event.data);
  }

  handleSocketError(event: WebSocket.ErrorEvent): void {
    console.error(event.error);
  }

  public async close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
