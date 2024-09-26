import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import os from 'os';
import path from 'path';
import { defineConfig } from 'vite';

dotenv.config();

const key = process.env.VITE_KEY;
const cert = process.env.VITE_CERT;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 3001,
    ...(key && cert
      ? {
          https: {
            key: `${os.homedir()}/${key}`,
            cert: `${os.homedir()}/${cert}`,
          },
        }
      : {}),
  },
});
