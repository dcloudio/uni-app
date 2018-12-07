const path = require('path')
const alias = require('rollup-plugin-alias')
const replace = require('rollup-plugin-replace')

const GLOBAL = {
  'mp-weixin': 'wx',
  'mp-alipay': 'my',
  'mp-baidu': 'swan'
}
module.exports = {
  input: 'src/core/uni.js',
  output: {
    file: `packages/uni-${process.env.UNI_PLATFORM}/dist/index.js`,
    format: 'es'
  },
  plugins: [
    alias({
      'uni-shared': path.resolve(__dirname, '../src/shared/util.js'),
      'uni-platform': path.resolve(__dirname, '../src/platforms/' + process.env.UNI_PLATFORM)
    }),
    replace({
      __GLOBAL__: GLOBAL[process.env.UNI_PLATFORM]
    })
  ]
}
