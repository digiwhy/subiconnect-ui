import dotenv from 'dotenv';
import { defineConfig } from 'tsup';

// Load .env
dotenv.config();
// Override any other environment variables with environment specific .env
dotenv.config({
  path: process.env.TARGET_ENV
    ? `.env.${process.env.TARGET_ENV}`
    : '.env.production',
});

export default defineConfig({
  // The file we created above that will be the entrypoint to the library.
  entry: ['src/index.ts'],
  target: 'esnext',
  // Enable TypeScript type definitions to be generated in the output.
  // This provides type-definitions to consumers.
  dts: true,
  // Clean the `dist` directory before building.
  // This is useful to ensure the output is only the latest.
  clean: true,
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV ?? 'production',
    ),
    'process.env.TARGET_ENV': JSON.stringify(
      process.env.TARGET_ENV ?? 'production',
    ),
    'process.env.SUBI_CONNECT_PUBLIC_BASE_URL': JSON.stringify(
      process.env.SUBI_CONNECT_PUBLIC_BASE_URL,
    ),
    'process.env.SUBI_CONNECT_SANDBOX_PUBLIC_BASE_URL': JSON.stringify(
      process.env.SUBI_CONNECT_SANDBOX_PUBLIC_BASE_URL,
    ),
    'process.env.SUBI_CONNECT_IMAGES_BASE_URL': JSON.stringify(
      process.env.SUBI_CONNECT_IMAGES_BASE_URL,
    ),
  },
  sourcemap: true,
  platform: 'browser',
  format: ['esm'],
  splitting: true,
  treeshake: true,
  minify: true,
  external: [
    'react',
    'react-dom',
    '@tanstack/react-query',
    '@tanstack/react-table',
  ],
});
