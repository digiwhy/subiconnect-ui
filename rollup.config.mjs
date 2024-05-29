import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import {dts} from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy'
import path from 'path';

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
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      json(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.stories.ts', '**/*.stories.tsx', 'storybook-static/*', 'storybook-static/**/*', 'storybook-static/**/*.js', 'src/stories/*'],
      }),
      postcss({
        extensions: ['.css'],
        extract: path.resolve('dist/styles.css'),
      }),

      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: ['node_modules/**', 'src/stories/**', 'src/**/*.stories.*', 'storybook-static/**/*'],
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
            src: "src/assets/fonts/*",
            dest: "./dist/assets/fonts",
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
