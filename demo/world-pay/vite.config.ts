import react from '@vitejs/plugin-react-swc';
import os from 'os';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const key = env.VITE_KEY;
  const cert = env.VITE_CERT;

  return {
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
  };
});
