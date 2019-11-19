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

  const platformOptions = require('./lib/' + process.env.UNI_PLATFORM)

  Object.assign(options, { // TODO 考虑非 HBuilderX 运行时，可以支持自定义输出目录
    outputDir: process.env.UNI_OUTPUT_TMP_DIR || process.env.UNI_OUTPUT_DIR,
    assetsDir
  }, platformOptions.vueConfig)

  require('./lib/options')(options)

  api.configureWebpack(require('./lib/configure-webpack')(platformOptions, manifestPlatformOptions, options, api))
  api.chainWebpack(require('./lib/chain-webpack')(platformOptions, api))
}

module.exports.defaultModes = {
  'uni-serve': 'development',
  'uni-build': process.env.NODE_ENV
}
