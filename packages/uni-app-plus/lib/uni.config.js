const fs = require('fs')
const path = require('path')

const COMPONENTS_DIR_NAME = 'wxcomponents'

function getComponentsCopyOption () {
  if (process.env.UNI_OUTPUT_TMP_DIR) { // TODO v3不需要，即将废弃
    const componentsDir = path.resolve(process.env.UNI_INPUT_DIR, COMPONENTS_DIR_NAME)
    if (fs.existsSync(componentsDir)) {
      return {
        from: componentsDir,
        to: COMPONENTS_DIR_NAME,
        ignore: ['**/*.vue', '**/*.css']
      }
    }
  }
}

module.exports = {
  options: {
    extnames: { // TODO v3不需要此配置
      style: '.wxss',
      template: '.wxml',
      filter: '.wxs'
    },
    filterTag: 'wxs'
  },
  copyWebpackOptions (platformOptions, vueOptions) {
    const copyOptions = []
    const componentsCopyOption = getComponentsCopyOption()
    if (componentsCopyOption) {
      copyOptions.push(componentsCopyOption)
    }
    copyOptions.push('hybrid/html')
    if (process.env.UNI_USING_V3) { // TODO 将仅保留v3逻辑
      copyOptions.push(path.resolve(__dirname, '../dist/view.css'))
      copyOptions.push(path.resolve(__dirname, '../dist/view.umd.min.js'))
      // TODO 后续common与v3目录应该合并
      copyOptions.push(path.resolve(__dirname, '../template/common'))
      copyOptions.push(path.resolve(__dirname, '../template/v3'))
    }
    return copyOptions
  },
  configureWebpack (webpackConfig, vueOptions) {
    let devtool = false
    if (process.env.NODE_ENV !== 'production') {
      if (process.env.UNI_USING_V3) {
        if (vueOptions.pluginOptions['uni-app-plus'].service) {
          devtool = 'eval-source-map'
        }
      } else {
        devtool = 'eval-source-map'
      }
    }
    return {
      devtool
    }
  }
}
