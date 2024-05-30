import onErrorResponse from './interceptors/error';
import onRequest from './interceptors/request';
import onResponse from './interceptors/response';
import axios from 'axios';

export const BASE_URL =
  process.env.PUBLIC_SUBI_CONNECT_PUBLIC_BASE_URL ??
  'http://localhost:8082/subi-connect/';
//'https://subiconnect.dev.api.subi.au/';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: process.env.NODE_ENV === 'local',
});

axiosClient.interceptors.request.use(onRequest, onErrorResponse);
axiosClient.interceptors.response.use(onResponse, onErrorResponse);

export default axiosClient;
