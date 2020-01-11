const path = require('path')

const {
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const {
  initAutoImportScanComponents
} = require('@dcloudio/uni-cli-shared/lib/pages')

class WebpackUniAppPlugin {
  apply(compiler) {
    compiler.hooks.invalid.tap('webpack-uni-app-invalid', (fileName, changeTime) => {
      if (fileName && typeof fileName === 'string') {
        if (fileName.indexOf('.vue') !== -1 || fileName.indexOf('.nvue') !== -1) {
          if (process.UNI_AUTO_SCAN_COMPONENTS) {
            initAutoImportScanComponents()
          }
        }
      }
    })
  }
}

module.exports = WebpackUniAppPlugin
