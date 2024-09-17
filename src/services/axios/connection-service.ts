import { ACCESS_TOKEN_NAME } from '@/constants';
import type { SubiConnectConnectionFn } from '@/types/main';

const DEFAULT_CONTEXT = '';

// Singleton to store the connection function
export default class ConnectionService {
  private static instance: ConnectionService;
  private connectionFn: SubiConnectConnectionFn | null = null;
  private context: string = DEFAULT_CONTEXT;

  private constructor() {}

  public static getInstance(): ConnectionService {
    if (!ConnectionService.instance) {
      ConnectionService.instance = new ConnectionService();
    }
    return ConnectionService.instance;
  }

  /**
   * Initialise the connection service with a connection function and context.
   * @param connectionFn - The function to connect to the SubiConnect API.
   * @param context - The context to use for the connection.
   * @returns The connection service.
   */
  public initialise({
    connectionFn,
    context,
  }: {
    connectionFn: SubiConnectConnectionFn | null;
    context: string;
  }) {
    this.setConnectionFn(connectionFn);
    this.setContext(context);

    return this;
  }

  public setConnectionFn(fn: SubiConnectConnectionFn | null) {
    this.connectionFn = fn;
    return this;
  }

  public getConnectionFn() {
    return this.connectionFn;
  }

  public setContext(plainContext: string) {
    this.updateAccessTokenContext(this.context, plainContext);
    this.context = this.hexEncodeContext(plainContext);
    return this;
  }

  public getContext() {
    return this.hexDecodeContext(this.context);
  }

  public async generateAccessToken() {
    if (!this.connectionFn) {
      throw new Error('No connection function set');
    }

    const accessToken = await this.connectionFn();
    this.setAccessToken(accessToken);
    return accessToken;
  }

  public getAccessToken() {
    return localStorage.getItem(`${ACCESS_TOKEN_NAME}__${this.context}`);
  }

  public setAccessToken(token: string) {
    localStorage.setItem(`${ACCESS_TOKEN_NAME}__${this.context}`, token);
    return this;
  }

  private updateAccessTokenContext(oldContext: string, newContext: string) {
    const oldToken = localStorage.getItem(
      `${ACCESS_TOKEN_NAME}__${oldContext}`,
    );

    if (!oldToken) {
      return this;
    }

    localStorage.setItem(`${ACCESS_TOKEN_NAME}__${newContext}`, oldToken);
    localStorage.removeItem(`${ACCESS_TOKEN_NAME}__${oldContext}`);

    return this;
  }

  public reset() {
    this.context = DEFAULT_CONTEXT;
    this.connectionFn = null;
    return this;
  }

  private hexEncodeContext(context: string) {
    return Array.from(context)
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }

  private hexDecodeContext(encodedContext: string) {
    return (
      encodedContext
        .match(/.{1,2}/g)
        ?.map((hex) => String.fromCharCode(parseInt(hex, 16)))
        .join('') || ''
    );
  }
}
