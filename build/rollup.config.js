const path = require('path')
const alias = require('rollup-plugin-alias')
const replace = require('rollup-plugin-replace')

const PLATFORMS = {
  'mp-weixin': {
    prefix: 'wx',
    title: '微信小程序'
  },
  'mp-alipay': {
    prefix: 'my',
    title: '支付宝小程序'
  },
  'mp-baidu': {
    prefix: 'swan',
    title: '百度小程序'
  },
  'mp-toutiao': {
    prefix: 'tt',
    title: '头条小程序'
  },
  'app-plus': {
    prefix: 'wx',
    title: 'app-plus'
  }
}

const platform = PLATFORMS[process.env.UNI_PLATFORM]

module.exports = {
  input: 'src/core/runtime/index.js',
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
      __GLOBAL__: platform.prefix,
      __PLATFORM_TITLE__: platform.title,
      __PLATFORM_PREFIX__: JSON.stringify(platform.prefix),
      __PLATFORM__: JSON.stringify(process.env.UNI_PLATFORM)
    })
  ],
  external: ['vue']
}
