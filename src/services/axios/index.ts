import type { ConnectionService } from './connection-service';
import onErrorResponse from './interceptors/error';
import onRequest from './interceptors/request';
import onResponse from './interceptors/response';
import axios from 'axios';

export const BASE_URL = process.env.SUBI_CONNECT_PUBLIC_BASE_URL;

export const httpClient = ({
  connectionService,
}: {
  connectionService: ConnectionService;
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
    onRequest,
    onErrorResponse(connectionService),
  );
  client.interceptors.response.use(
    onResponse,
    onErrorResponse(connectionService),
  );

  return client;
};
