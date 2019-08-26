const path = require('path')

const {
  md5,
  parseEntry
} = require('@dcloudio/uni-cli-shared')

const {
  getPages,
  getSubPages,
  getTemplates,
  getCompilerOptions
} = require('../shared')

const generateApp = require('./generate-app')

const generatePagesWxml = require('./generate-pages-wxml')

const generateComponentsWxml = require('./generate-components-wxml')

const emitFileCaches = {}

function emitFile (filePath, source, compilation) {
  const emitFileMD5 = md5(filePath + source)
  if (emitFileCaches[filePath] !== emitFileMD5) {
    emitFileCaches[filePath] = emitFileMD5
    compilation.assets[filePath] = {
      size () {
        return Buffer.byteLength(source, 'utf8')
      },
      source () {
        return source
      }
    }
  }
}

class WebpackUniMPPlugin {
  apply (compiler) {
    compiler.hooks.emit.tapPromise('webpack-uni-mp-emit', compilation => {
      return new Promise((resolve, reject) => {
        // app.js,app.wxss
        generateApp(compilation)
          .forEach(({
            file,
            source
          }) => emitFile(file, source, compilation))

        if (process.env.UNI_PLATFORM === 'mp-alipay') { // 支付宝页面 axml 仅生成一个（因 template 内不能使用自定义组件，比如 rich-text ）
          const pageAxmls = {}
          generatePagesWxml(getPages(), getSubPages())
            .forEach(({
              file,
              source
            }) => {
              pageAxmls[file] = source
            })
          // components wxml
          generateComponentsWxml(getTemplates(), getCompilerOptions(), Array.from(new Set(
            Object.values(process.UNI_SUB_PACKAGES_ROOT))))
            .forEach(({
              file,
              source
            }) => {
              const pageAxmlPath = file.replace('.vue', '')
              const pageAxmlSource = pageAxmls[pageAxmlPath]
              if (pageAxmlSource) { // page.axml
                emitFile(pageAxmlPath, source + '\n' + pageAxmlSource,
                  compilation)
              } else {
                emitFile(file, source, compilation)
              }
            })
        } else {
          // pages wxml
          generatePagesWxml(getPages(), getSubPages())
            .forEach(({
              file,
              source
            }) => emitFile(file, source, compilation))

          // components wxml
          generateComponentsWxml(getTemplates(), getCompilerOptions(), Array.from(new Set(
            Object.values(process.UNI_SUB_PACKAGES_ROOT))))
            .forEach(({
              file,
              source
            }) => emitFile(file, source, compilation))
        }

        resolve()
      })
    })

    compiler.hooks.invalid.tap('webpack-uni-mp-invalid', (fileName, changeTime) => {
      if (fileName && typeof fileName === 'string' && path.basename(fileName) === 'pages.json') { // 重新解析 entry
        try {
          parseEntry()
        } catch (e) {
          console.error(e)
        }
      }
    })
  }
}

module.exports = WebpackUniMPPlugin
