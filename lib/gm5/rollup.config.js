import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production' ? true : false;

export default {
  input: path.join(__dirname, 'src/index.js'),
  output: {
    file: path.join(__dirname, 'build/js/index.min.js'),
    format: isProd ? 'umd' : 'iife',
    sourcemap: isProd ? true : false
  },
  plugins: [
    postcss({
      plugins: [
        cssnano()
      ],
      extensions: ['.css'],
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: '../../node_modules/**',
    }),
    replace({
      exclude: '../../node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
  external: ["express"]
};