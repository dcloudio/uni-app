const path = require('path')

const {
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const {
  initAutoImportScanComponents
} = require('@dcloudio/uni-cli-shared/lib/pages')

class WebpackUniAppPlugin {
  apply(compiler) {
    if (process.UNI_CONFUSION) {
      compiler.hooks.emit.tapPromise('webpack-uni-app-emit', compilation => {
        return new Promise((resolve, reject) => {
          if (compilation.assets['app-confusion.js']) { //存在加密
            const manifestJson = JSON.parse(`${compilation.assets['manifest.json'].source()}`)
            manifestJson.plus.confusion.resources['app-confusion.js'] = {}
            const source = JSON.stringify(manifestJson)
            compilation.assets['manifest.json'] = {
              size() {
                return Buffer.byteLength(source, 'utf8')
              },
              source() {
                return source
              }
            }
          }
          resolve()
        })
      })
    }

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
