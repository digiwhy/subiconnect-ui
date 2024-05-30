import axios from 'axios';

export const BASE_URL =
  process.env.PUBLIC_SUBI_CONNECT_PUBLIC_BASE_URL ??
  'https://subiconnect-api.subi.au/subi-connect/';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: process.env.NODE_ENV === 'local',
});

export default axiosClient;
