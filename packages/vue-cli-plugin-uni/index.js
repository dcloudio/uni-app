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

  if (process.env.UNI_PLATFORM === 'quickapp-native') {
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

    const vueConfig = require('@dcloudio/uni-quickapp-native/lib/vue.config.js')
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

  if (options.pages) {
    // h5平台 允许 vue.config.js pages 覆盖，其他平台移除 pages 配置
    if (process.env.UNI_PLATFORM === 'h5') {
      delete vueConfig.pages
    } else {
      delete options.pages
    }
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
}

const args = require('minimist')(process.argv.slice(2))

module.exports.defaultModes = {
  'uni-serve': args.mode || 'development',
  'uni-build': args.mode || process.env.NODE_ENV
}
