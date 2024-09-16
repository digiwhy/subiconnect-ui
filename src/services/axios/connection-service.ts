import { ACCESS_TOKEN_NAME } from '@/constants';
import type { SubiConnectAccessToken } from '@/types/main';

const DEFAULT_CONTEXT = 'NO_CONTEXT';

// Singleton to store the connection function
export default class ConnectionService {
  private static instance: ConnectionService;
  private connectionFn: (() => Promise<SubiConnectAccessToken>) | null = null;
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
    connectionFn: (() => Promise<SubiConnectAccessToken>) | null;
    context: string | undefined;
  }) {
    this.setConnectionFn(connectionFn);
    this.setContext(context);

    return this;
  }

  public setConnectionFn(fn: (() => Promise<SubiConnectAccessToken>) | null) {
    this.connectionFn = fn;
    return this;
  }

  public getConnectionFn() {
    return this.connectionFn;
  }

  public setContext(plainContext: string | undefined) {
    if (!plainContext) {
      this.context = DEFAULT_CONTEXT;
      return this;
    }

    this.context = this.hexEncodeContext(plainContext);
    return this;
  }

  public getContext() {
    return this.hexDecodeContext(this.context);
  }

  public async generateAccessToken(): Promise<string> {
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

  public reset() {
    this.context = DEFAULT_CONTEXT;
    this.connectionFn = null;
    return this;
  }

  private hexEncodeContext(context: string) {
    return Buffer.from(context).toString('hex');
  }

  private hexDecodeContext(encodedContext: string) {
    return Buffer.from(encodedContext, 'hex').toString('utf-8');
  }
}
