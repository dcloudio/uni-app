const path = require('path')

const {
  md5,
  parseEntry,
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const {
  pagesJsonJsFileName
} = require('@dcloudio/uni-cli-shared/lib/pages')

const generateApp = require('./generate-app')
const generateJson = require('./generate-json')
const generateComponent = require('./generate-component')

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

function addSubPackagesRequire (compilation) {
  if (!process.env.UNI_OPT_SUBPACKAGES) {
    return
  }
  const assetsKeys = Object.keys(compilation.assets)
  Object.keys(process.UNI_SUBPACKAGES).forEach(root => {
    const subPackageVendorPath = normalizePath(path.join(root, 'common/vendor.js'))
    if (assetsKeys.indexOf(subPackageVendorPath) !== -1) {
      // TODO 理论上仅需在分包第一个 js 中添加 require common vendor，但目前不同平台可能顺序不一致，
      // 故 每个分包里的 js 里均添加一次 require
      assetsKeys.forEach(name => {
        if (
          path.extname(name) === '.js' &&
          name.indexOf(root + '/') === 0 &&
          name !== subPackageVendorPath
        ) {
          let relativePath = normalizePath(path.relative(path.dirname(name), subPackageVendorPath))
          if (!relativePath.startsWith('.')) {
            relativePath = './' + relativePath
          }
          const source = `require('${relativePath}');` + compilation.assets[name].source()

          compilation.assets[name] = {
            size () {
              return Buffer.byteLength(source, 'utf8')
            },
            source () {
              return source
            }
          }
        }
      })
    }
  })
}

function addMPPluginRequire (compilation) {
  // 编译到小程序插件 特殊处理入口文件
  const assetsKeys = Object.keys(compilation.assets)
  const UNI_MP_PLUGIN_MAIN = process.env.UNI_MP_PLUGIN_MAIN
  const UNI_MP_PLUGIN_EXPORT = JSON.parse(process.env.UNI_MP_PLUGIN_EXPORT)
  assetsKeys.forEach(name => {
    const needProcess = process.env.UNI_MP_PLUGIN ? name === UNI_MP_PLUGIN_MAIN : UNI_MP_PLUGIN_EXPORT.includes(name)
    if (needProcess) {
      const modules = compilation.modules
      const orignalSource = compilation.assets[name].source()
      const globalEnv = process.env.UNI_PLATFORM === 'mp-alipay' ? 'my' : 'wx'
      const filePath = normalizePath(path.resolve(process.env.UNI_INPUT_DIR, name))
      const uniModuleId = modules.find(module => module.resource && normalizePath(module.resource) === filePath).id

      const source = orignalSource + `\nmodule.exports = ${globalEnv}.__webpack_require_UNI_MP_PLUGIN__('${uniModuleId}');\n`

      compilation.assets[name] = {
        size () {
          return Buffer.byteLength(source, 'utf8')
        },
        source () {
          return source
        }
      }
    }
  })
}

class WebpackUniMPPlugin {
  apply (compiler) {
    if (!process.env.UNI_USING_NATIVE && !process.env.UNI_USING_V3_NATIVE) {
      compiler.hooks.emit.tapPromise('webpack-uni-mp-emit', compilation => {
        return new Promise((resolve, reject) => {
          addSubPackagesRequire(compilation)

          addMPPluginRequire(compilation)

          generateJson(compilation)

          // app.js,app.wxss
          generateApp(compilation)
            .forEach(({
              file,
              source
            }) => emitFile(file, source, compilation))

          generateComponent(compilation, compiler.options.output.jsonpFunction)

          resolve()
        })
      })
    }
    compiler.hooks.invalid.tap('webpack-uni-mp-invalid', (fileName, changeTime) => {
      if (
        fileName &&
        typeof fileName === 'string'
      ) { // 重新解析 entry
        const basename = path.basename(fileName)
        const deps = process.UNI_PAGES_DEPS || new Set()
        if (
          basename === 'pages.json' ||
          basename === pagesJsonJsFileName ||
          deps.has(normalizePath(fileName))
        ) {
          try {
            parseEntry()
          } catch (e) {
            console.error(e)
          }
        }
      }
    })
  }
}

module.exports = WebpackUniMPPlugin
