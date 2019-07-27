const path = require('path')
const alias = require('rollup-plugin-alias')
const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const requireContext = require('../lib/rollup-plugin-require-context')

let input = 'src/platforms/app-plus/service/framework/create-instance-context.js'

const output = {
  file: 'packages/uni-app-plus-nvue/dist/index.js',
  format: 'es'
}

const external = []

if (process.env.UNI_SERVICE === 'legacy') {
  input = 'src/platforms/app-plus-nvue/services/index.legacy.js'
  output.file = 'packages/uni-app-plus-nvue/dist/index.legacy.js'
} else {
  input = 'src/platforms/app-plus/service/index.js'
  output.file = 'packages/uni-app-plus-nvue/dist/index.js'
  output.format = 'iife'
  output.name = 'serviceContext'
  output.banner =
    `export function createServiceContext(Vue, weex, plus, __uniConfig, __uniRoutes, UniServiceJSBridge){
var localStorage = plus.storage
var setTimeout = global.setTimeout
var clearTimeout = global.clearTimeout
`
  output.footer =
    `
var uni = serviceContext.uni
var getApp = serviceContext.getApp
var getCurrentPages = serviceContext.getCurrentPages

var __registerPage = serviceContext.__registerPage

return serviceContext \n}
`
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
      'uni-shared': path.resolve(__dirname, '../src/shared/index.js'),
      'uni-helpers': path.resolve(__dirname, '../src/core/helpers')
    }),
    replace({
      __GLOBAL__: 'getGlobalUni()',
      __PLATFORM__: JSON.stringify('app-plus'),
      __PLATFORM_TITLE__: 'app-plus-nvue'
    })
  ],
  external
}
