import type { ILogger } from '../logger/ILogger';
import type { ConnectionService } from './connection-service';
import onErrorResponse from './interceptors/error';
import onRequest from './interceptors/request';
import onResponse from './interceptors/response';
import axios from 'axios';

export const BASE_URL = process.env.SUBI_CONNECT_PUBLIC_BASE_URL;

export const httpClient = ({
  connectionService,
  logger,
}: {
  connectionService: ConnectionService;
  logger: ILogger;
}) => {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    withCredentials: true,
  });

  client.interceptors.request.use(
    onRequest({ logger }),
    onErrorResponse({ connectionService, logger }),
  );
  client.interceptors.response.use(
    onResponse({ logger }),
    onErrorResponse({ connectionService, logger }),
  );

  return client;
};
