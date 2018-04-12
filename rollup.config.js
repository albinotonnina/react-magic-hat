import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import commonJS from 'rollup-plugin-commonjs'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      name: pkg.module,
      file: pkg.module,
      format: 'es'
    },
    {
      name: pkg.main,
      file: pkg.main,
      format: 'umd',
      sourcemap: false
    }
  ],
  plugins: [
    resolve(),
    commonJS({
      include: 'node_modules/**'
    }),
    babel({
      presets: ['react'],
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    uglify()
  ],
  external: ['react', 'react-dom']
}
