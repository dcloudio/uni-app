const {
  initAutoImportScanComponents
} = require('@dcloudio/uni-cli-shared/lib/pages')

let compiling = false

class WebpackUniAppPlugin {
  apply (compiler) {
    if (process.UNI_CONFUSION) {
      compiler.hooks.emit.tapPromise('webpack-uni-app-emit', compilation => {
        return new Promise((resolve, reject) => {
          if (compilation.assets['app-confusion.js']) { // 存在加密
            const manifestJson = JSON.parse(`${compilation.assets['manifest.json'].source()}`)
            manifestJson.plus.confusion.resources['app-confusion.js'] = {}
            const source = JSON.stringify(manifestJson)
            compilation.assets['manifest.json'] = {
              size () {
                return Buffer.byteLength(source, 'utf8')
              },
              source () {
                return source
              }
            }
          }
          resolve()
        })
      })
    }

    compiler.hooks.invalid.tap('webpack-uni-app-invalid', (fileName, changeTime) => {
      if (!process.env.UNI_USING_V3) {
        if (!compiling) {
          compiling = true
          console.log('开始差量编译...')
        }
      }
      if (fileName && typeof fileName === 'string') {
        if (fileName.indexOf('.vue') !== -1 || fileName.indexOf('.nvue') !== -1) {
          if (process.UNI_AUTO_SCAN_COMPONENTS) {
            initAutoImportScanComponents()
          }
        }
      }
    })
    // v3 版本在webpack-app-plus-plugin/index.js中处理，目前太乱了。后续要整理
    if (!process.env.UNI_USING_V3) {
      compiler.hooks.done.tapPromise('webpack-uni-app-done', compilation => {
        return new Promise((resolve, reject) => {
          compiling = false
          resolve()
        })
      })
    }
  }
}

module.exports = WebpackUniAppPlugin
