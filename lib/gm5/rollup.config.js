import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import { join } from 'path';
import {
  rph,
  rphMultibundles
} from './plugins/rollup-plugin-hotreload';
// import { rph, rphMultibundles } from "rollup-plugin-hotreload";
import './utils/server';

const isProd = process.env.NODE_ENV === 'production' ? true : false;

const config = {
  output: {
    file: "",
    format: isProd ? 'umd' : 'iife',
    sourcemap: isProd ? true : false
  },
  watch: {
    include: [join(__dirname, 'src/**')],
    exclude: '../../node_modules/**'
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
    (isProd && uglify()),
    (!isProd && rph({
      templateHtmlPath: "src/index.html",
      isStopRPH: false,
      rootDir: "build",
      buildPaths: [
        // first one is relative path to rootDir
        ["js/index.min.js", "src/index.js"]
      ]
    }))
  ]
};
export default rphMultibundles(config, __dirname);
