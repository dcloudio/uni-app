const path = require('path')
const alias = require('rollup-plugin-alias')
const replace = require('rollup-plugin-replace')
const nodeResolve = require('rollup-plugin-node-resolve')
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
    `export function createServiceContext(Vue, weex, plus, __uniConfig, __uniRoutes, UniServiceJSBridge,instanceContext){
var localStorage = plus.storage
var setTimeout = instanceContext.setTimeout
var clearTimeout = instanceContext.clearTimeout
var setInterval = instanceContext.setInterval
var clearInterval = instanceContext.clearInterval
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

const resolve = dir => path.resolve(__dirname, '../', dir)

module.exports = {
  input,
  output,
  plugins: [
    nodeResolve(),
    commonjs(),
    requireContext(),
    alias({
      'uni-core': resolve('src/core'),
      'uni-platform': resolve('src/platforms/' + process.env.UNI_PLATFORM),
      'uni-platforms': resolve('src/platforms'),
      'uni-shared': resolve('src/shared/index.js'),
      'uni-helpers': resolve('src/core/helpers'),
      'uni-invoke-api': resolve('src/platforms/app-plus/service/api'),
      'uni-service-api': resolve('src/core/service/platform-api'),
      'uni-api-protocol': resolve('src/core/helpers/protocol')
    }),
    replace({
      __GLOBAL__: 'getGlobalUni()',
      __PLATFORM__: JSON.stringify('app-plus'),
      __PLATFORM_TITLE__: 'app-plus-nvue'
    })
  ],
  external
}
