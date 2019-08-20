const path = require('path')
const alias = require('rollup-plugin-alias')
const replace = require('rollup-plugin-replace')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const requireContext = require('../lib/rollup-plugin-require-context')


const resolve = dir => path.resolve(__dirname, '../', dir)

module.exports = {
  input: 'packages/uni-stat/src/index.js',
  output: {
    file: 'packages/uni-stat/dist/index.js',
    format: 'es'
  },
  external: ['vue', '@dcloudio/uni-stat/package.json'],
  plugins: []
}
