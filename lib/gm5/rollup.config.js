import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import path from 'path';
import { rph } from './plugins/rollup-plugin-hotreload';
import server from './utils/server';

const isProd = process.env.NODE_ENV === 'production' ? true : false;

const config = {
  output: {
    file: "",
    format: isProd ? 'umd' : 'iife',
    sourcemap: isProd ? true : false
  },
  watch: {
    include: [path.join(__dirname, 'src/**'), path.join(__dirname, 'utils/hotreload.js')],
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
      server,
      templateHtmlPath: "src/index.html",
      injectHtml: true
    }))
  ]
};


function bundle(config, outputpath, sourcefilepath) {
  let addHashKeyOutputpath = outputpath;
  const output1 = Object.assign({}, config.output, {
    file: path.join(__dirname, addHashKeyOutputpath)
  });
  const module1 = Object.assign({}, config, {
    input: path.join(__dirname, sourcefilepath),
    output: output1,
  });
  return module1;
}

export default [
  bundle(config, "build/js/index.min.js", "src/index.js")
];