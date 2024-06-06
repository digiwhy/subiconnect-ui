import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dotenv from 'dotenv';
import copy from 'rollup-plugin-copy';
import { dts } from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

dotenv.config({path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.production'});

import packageJson from "./package.json" assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV ?? 'production',
        ),
        'process.env.SUBI_CONNECT_PUBLIC_BASE_URL': JSON.stringify(
          process.env.SUBI_CONNECT_PUBLIC_BASE_URL,
        ),
        preventAssignment: true,
      }),
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      json(),
      typescript({
        exclude: [
          '**/*.stories.ts',
          '**/*.stories.tsx',
          'storybook-static/*',
          'storybook-static/**/*',
          'storybook-static/**/*.js',
          'src/stories/*',
          'src/stories/**/*',
          'src/ui/*',
          'src/lib/*',
          'src/mdx/*',
        ],
      }),
      postcss({
        exclude: ['stories.index.css'],
        extensions: ['.css'],
        extract: 'styles.css',
      }),

      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: [
          'node_modules/**',
          'src/stories/**',
          'src/**/*.stories.*',
          'storybook-static/**/*',
        ],
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
      }),
      terser(),
      copy({
        targets: [
          {
            src: 'src/assets/fonts/*',
            dest: './dist/assets/fonts',
          },
        ],
      }),
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
