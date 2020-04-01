const fs = require('fs')
const path = require('path')

const {
  manifestPlatformOptions
} = require('./lib/env')

const {
  assetsDir
} = require('./lib/copy-webpack-options')

require('./lib/check-update')()

const initBuildCommand = require('./commands/build')
const initServeCommand = require('./commands/serve')

module.exports = (api, options) => {
  initServeCommand(api, options)

  initBuildCommand(api, options)

  if (process.env.UNI_PLATFORM === 'quickapp') {
    process.env.UNI_OUTPUT_DIR = path.resolve(process.env.UNI_OUTPUT_DIR, 'build')
    Object.assign(options, {
      assetsDir,
      parallel: false,
      outputDir: process.env.UNI_OUTPUT_DIR
    })
    require('./lib/options')(options)
    const platformOptions = {
      webpackConfig: {},
      chainWebpack () {}
    }
    const manifestPlatformOptions = {}
    api.configureWebpack(require('./lib/configure-webpack')(platformOptions, manifestPlatformOptions, options, api))
    api.chainWebpack(require('./lib/chain-webpack')(platformOptions, options, api))

    const vueConfig = require('@dcloudio/uni-quickapp/lib/vue.config.js')
    api.configureWebpack(vueConfig.configureWebpack)
    api.chainWebpack(vueConfig.chainWebpack)
    return
  }

  const type = ['app-plus', 'h5'].includes(process.env.UNI_PLATFORM)
    ? process.env.UNI_PLATFORM
    : 'mp'

  const platformOptions = require('./lib/' + type)

  let vueConfig = platformOptions.vueConfig

  if (typeof vueConfig === 'function') {
    vueConfig = vueConfig(options, api)
  }

  Object.assign(options, { // TODO 考虑非 HBuilderX 运行时，可以支持自定义输出目录
    outputDir: process.env.UNI_OUTPUT_TMP_DIR || process.env.UNI_OUTPUT_DIR,
    assetsDir
  }, vueConfig) // 注意，此处目前是覆盖关系，后续考虑改为webpack merge逻辑

  require('./lib/options')(options)

  api.configureWebpack(require('./lib/configure-webpack')(platformOptions, manifestPlatformOptions, options, api))
  api.chainWebpack(require('./lib/chain-webpack')(platformOptions, options, api))

  global.uniPlugin.configureWebpack.forEach(configureWebpack => {
    api.configureWebpack(function (webpackConfig) {
      return configureWebpack(webpackConfig, options)
    })
  })
  global.uniPlugin.chainWebpack.forEach(chainWebpack => {
    api.chainWebpack(function (webpackConfig) {
      return chainWebpack(webpackConfig, options)
    })
  })

  if (
    process.env.UNI_PLATFORM === 'h5' ||
    (
      process.env.UNI_PLATFORM === 'app-plus' &&
      process.env.UNI_USING_V3
    )
  ) {
    const migrate = require('@dcloudio/uni-migration')
    const wxcomponents = path.resolve(process.env.UNI_INPUT_DIR, 'wxcomponents')
    if (fs.existsSync(wxcomponents)) { // 转换 mp-weixin 小程序组件
      migrate(wxcomponents, false, {
        silent: true // 不输出日志
      })
    }
  }
}

module.exports.defaultModes = {
  'uni-serve': 'development',
  'uni-build': process.env.NODE_ENV
}
