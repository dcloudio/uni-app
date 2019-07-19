const path = require('path')
const alias = require('rollup-plugin-alias')
const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const requireContext = require('./rollup-plugin-require-context')

let input = 'src/platforms/app-plus/service/uni/create-instance-context.js'

const output = {
  file: 'packages/uni-app-plus-nvue/dist/index.js',
  format: 'es'
}

if (process.env.UNI_SERVICE === 'legacy') {
  input = 'src/platforms/app-plus-nvue/service/index.legacy.js'
  output.file = 'packages/uni-app-plus-nvue/dist/index.legacy.js'
} else if (process.env.UNI_SERVICE === 'uni') {
  input = 'src/platforms/app-plus/service/uni/index.js'
  output.file = 'packages/uni-app-plus-nvue/dist/uni.js'
  output.banner =
    'export function createUniInstance(weex, plus, __uniConfig, __uniRoutes, UniServiceJSBridge, getApp, getCurrentPages){\n'
  output.footer = '\n  return uni$1 \n}'
}

module.exports = {
  input,
  output,
  plugins: [
    resolve(),
    commonjs(),
    requireContext(),
    alias({
      'uni-core': path.resolve(__dirname, '../src/core'),
      'uni-platform': path.resolve(__dirname, '../src/platforms/' + process.env.UNI_PLATFORM),
      'uni-platforms': path.resolve(__dirname, '../src/platforms'),
      'uni-shared': path.resolve(__dirname, '../src/shared/util.js'),
      'uni-helpers': path.resolve(__dirname, '../src/core/helpers')
    }),
    replace({
      __GLOBAL__: 'getGlobalUni()',
      __PLATFORM__: JSON.stringify(process.env.UNI_PLATFORM),
      __PLATFORM_TITLE__: 'app-plus-nvue'
    })
  ],
  external: ['./uni']
}
