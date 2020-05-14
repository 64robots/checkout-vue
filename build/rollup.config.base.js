import path from 'path';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';

const projectRoot = path.resolve(__dirname, '..');

export default {
  input: 'src/index.js',
  plugins: {
    preVue: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),

      alias({
        resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        entries: {
          '@': path.resolve(projectRoot, 'src'),
        },
      }),

      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      }),

      image(),

      json(),
    ],
    vue: {
      css: true,
      template: {
        isProduction: true,
      },
    },
    babel: {
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    },
  },
};
