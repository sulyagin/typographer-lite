import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/typographer-lite.js',
  output: {
    name: 'typographerLite',
    file: 'dist/typographer-lite.min.js',
    format: 'iife'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    terser()
  ]
};