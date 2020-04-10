const fs = require('fs')
const path = require('path')

process.env.UNI_CLI_CONTEXT = path.resolve(__dirname, '../../../')

process.env.UNI_HBUILDERX_PLUGINS = process.env.UNI_HBUILDERX_PLUGINS || path.resolve(__dirname, '../../../../')

require('./module-alias')

module.exports = (api, options) => { // 仅处理 app-plus 相关逻辑
  if (process.env.UNI_PLATFORM !== 'app-plus') {
    return
  }

  if (
    (
      !process.env.UNI_USING_V3 &&
      !process.env.UNI_USING_NATIVE &&
      !process.env.UNI_USING_V3_NATIVE
    ) ||
    (
      process.env.UNI_USING_NATIVE &&
      !process.env.UNI_USING_NVUE_COMPILER
    )
  ) {
    if (!fs.existsSync(path.resolve(process.env.UNI_HBUILDERX_PLUGINS, 'weapp-tools/lib/index.js'))) {
      console.error('请使用 HBuilderX 编译运行至 app-plus 平台')
      process.exit(0)
    }
  }

  const plugins = []

  const output = {}
  const WebpackAppPlusPlugin = require('./packages/webpack-app-plus-plugin')

  plugins.push(new WebpackAppPlusPlugin())

  const {
    devtoolModuleFilenameTemplate
  } = require('./util')

  // sourcemap 输出相对路径
  output.devtoolModuleFilenameTemplate = devtoolModuleFilenameTemplate

  api.configureWebpack(webpackConfig => {
    return {
      output,
      plugins
    }
  })
}
