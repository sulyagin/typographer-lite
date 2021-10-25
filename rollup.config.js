import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/typographer-lite.js',
  output: [
    {
      name: 'typographerLite',
      file: 'dist/typographer-lite.min.js',
      format: 'umd'
    },
    {
      name: 'typographerLite',
      file: 'demo/typographer-lite.min.js',
      format: 'umd'
    }
  ],
  plugins: [
    resolve({
      jsnext: true,
      browser: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    terser()
  ]
};