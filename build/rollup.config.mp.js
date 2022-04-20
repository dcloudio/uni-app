const path = require('path')
const json = require('@rollup/plugin-json')
const alias = require('@rollup/plugin-alias')
const replace = require('@rollup/plugin-replace')

const PLATFORMS = {
  'mp-weixin': {
    prefix: 'wx',
    title: '微信小程序'
  },
  'mp-qq': {
    prefix: 'wx',
    title: 'QQ小程序'
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
  'mp-kuaishou': {
    prefix: 'ks',
    title: '快手小程序'
  },
  'mp-lark': {
    prefix: 'tt',
    title: '飞书小程序'
  },
  'mp-jd': {
    prefix: 'jd',
    title: '京东小程序'
  },
  'mp-xhs': {
    prefix: 'xhs',
    title: '小红书小程序'
  },
  'quickapp-webview': {
    prefix: 'qa',
    title: '快应用(Webview)版'
  },
  'app-plus': {
    prefix: 'wx',
    title: 'app-plus'
  }
}

const platform = PLATFORMS[process.env.UNI_PLATFORM]

let input = 'src/core/runtime/index.js'
const output = {
  file: `packages/uni-${process.env.UNI_PLATFORM}/dist/index.js`,
  format: 'es'
}

if (process.env.UNI_MP) {
  input = 'src/core/runtime/mp/index.js'
  output.file = `packages/uni-${process.env.UNI_PLATFORM}/dist/mp.js`
}

module.exports = {
  input,
  output,
  plugins: [
    alias({
      entries: [{
        find: '@dcloudio',
        replacement: path.resolve(__dirname, '../packages')
      }, {
        find: 'uni-core',
        replacement: path.resolve(__dirname, '../src/core')
      }, {
        find: 'uni-api-protocol',
        replacement: path.resolve(__dirname, '../src/core/helpers/protocol')
      }, {
        find: 'uni-shared/query',
        replacement: path.resolve(__dirname, '../src/shared/query.js')
      }, {
        find: 'uni-shared',
        replacement: path.resolve(__dirname, '../src/shared/util.js')
      }, {
        find: 'uni-platform',
        replacement: path.resolve(__dirname, '../src/platforms/' + process.env.UNI_PLATFORM)
      }, {
        find: 'uni-wrapper',
        replacement: path.resolve(__dirname, '../src/core/runtime/wrapper')
      }, {
        find: 'uni-helpers',
        replacement: path.resolve(__dirname, '../src/core/helpers')
      }]
    }),
    json(),
    replace({
      __GLOBAL__: platform.prefix,
      __PLATFORM_TITLE__: platform.title,
      __PLATFORM_PREFIX__: JSON.stringify(platform.prefix),
      __PLATFORM__: JSON.stringify(process.env.UNI_PLATFORM)
    })
  ],
  external: ['vue', '@dcloudio/uni-i18n']
}
