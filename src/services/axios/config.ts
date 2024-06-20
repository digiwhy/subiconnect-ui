import { SUBI_CONNECT_PUBLIC_BASE_URL } from '../../envs';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: SUBI_CONNECT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: true,
});

export default axiosClient;
