import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import filesize from 'rollup-plugin-filesize';
import minify from 'rollup-plugin-babel-minify';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';

const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'build/index.js',
      format: 'umd',
      name: 'npms-client',
    },
    {
      file: 'build/index.cjs.js',
      format: 'cjs',
      name: 'npms-client',
    },
    {
      file: 'build/index.esm.js',
      format: 'es',
    },
  ],
  plugins: [
    builtins(),
    babel({ exclude: 'node_modules/**' }),
    minify(),
    localResolve(),
    resolve(),
    commonjs(),
    json(),
    filesize(),
  ],
};

export default config;
