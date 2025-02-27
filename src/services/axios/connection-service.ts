import { httpClient } from '.';
import type { Logger } from '../logger';
import type { ConnectionServiceResetOptions } from './types';
import { ACCESS_TOKEN_NAME } from '@/constants';
import { handleProviderOptions } from '@/lib/handle-provider-options';
import type { SubiConnectConnectionFn, SubiConnectOptions } from '@/types/main';
import type { AxiosInstance } from 'axios';

const DEFAULT_CONTEXT = '';

export class ConnectionService {
  private connectionFn: SubiConnectConnectionFn | null = null;
  private context: string = DEFAULT_CONTEXT;
  private readonly httpClient: AxiosInstance;

  /**
   * Initialise the connection service with a connection function and context.
   * @param connectionFn - The function to connect to the SubiConnect API.
   * @param context - The context to use for the connection.
   * @returns The connection service.
   */
  constructor({
    connectionFn,
    context,
    logger,
    providerOptions,
  }: {
    connectionFn: SubiConnectConnectionFn | null;
    context: string;
    logger: Logger;
    providerOptions?: SubiConnectOptions;
  }) {
    this.setConnectionFn(connectionFn);
    this.setContext(context);
    this.httpClient = httpClient({ connectionService: this, logger });

    handleProviderOptions({
      httpClient: this.httpClient,
      logger,
      ...providerOptions,
    });
  }

  public setConnectionFn(fn: SubiConnectConnectionFn | null) {
    this.connectionFn = fn;
    return this;
  }

  public getConnectionFn() {
    return this.connectionFn;
  }

  public setContext(plainContext: string) {
    const encodedContext = this.hexEncodeContext(plainContext);
    this.updateAccessTokenContext({
      oldContext: this.context,
      newContext: encodedContext,
    });
    this.context = encodedContext;
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
    return localStorage.getItem(this.getStorageKey());
  }

  public setAccessToken(token: string) {
    localStorage.setItem(this.getStorageKey(), token);
    return this;
  }

  public getHttpClient() {
    return this.httpClient;
  }

  private updateAccessTokenContext({
    oldContext,
    newContext,
  }: {
    oldContext: string;
    newContext: string;
  }) {
    const token = localStorage.getItem(this.getStorageKey(oldContext));

    if (!token) {
      return this;
    }

    localStorage.setItem(this.getStorageKey(newContext), token);

    localStorage.removeItem(this.getStorageKey(oldContext));

    return this;
  }

  public reset({ keepAccessToken = false }: ConnectionServiceResetOptions) {
    if (!keepAccessToken) {
      localStorage.removeItem(this.getStorageKey());
    }
    return this;
  }

  public updateAccessToken(token: string) {
    this.setAccessToken(token);
    this.httpClient.defaults.headers.common['Authorization'] =
      `Bearer ${token}`;
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
        .join('') ?? DEFAULT_CONTEXT
    );
  }

  private getStorageKey(context: string = this.context) {
    return `${ACCESS_TOKEN_NAME}__${context}`;
  }
}
