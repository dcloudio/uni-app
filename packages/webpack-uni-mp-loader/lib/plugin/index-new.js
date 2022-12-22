const path = require('path')
const webpack = require('webpack')

const {
  parseEntry,
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const {
  pagesJsonJsFileName
} = require('@dcloudio/uni-cli-shared/lib/pages')

const { createSource, getModuleId } = require('../shared')

const generateApp = require('./generate-app')
const generateJson = require('./generate-json')
const generateComponent = require('./generate-component')
const clearStyleFile = require('./clear-style-file')
const mockGenericComponent = require('./mock-generic-component')
const addEmptyComponent = require('./add-empty-component')
const addPluginWrapper = require('./add-plugin-wrapper')

function emitFile (filePath, source, compilation) {
  compilation.emitAsset(filePath, createSource(source))
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
          const source = `require('${relativePath}');` + compilation.getAsset(name).source.source()

          compilation.updateAsset(name, createSource(source))
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
      const modules = Array.from(compilation.modules)
      const orignalSource = compilation.getAsset(name).source.source()
      const globalEnv = process.env.UNI_PLATFORM === 'mp-alipay' ? 'my' : 'wx'
      const filePath = normalizePath(path.resolve(process.env.UNI_INPUT_DIR, name))
      let uniModule = modules.find(module => module.resource && normalizePath(module.resource) === filePath)
      if (!uniModule && webpack.version[0] > 4) {
        uniModule = modules.find(module =>
          module.rootModule && module.rootModule.resource && normalizePath(module.rootModule.resource) === filePath
        )
      }
      const uniModuleId = getModuleId(compilation, uniModule)

      const source = orignalSource + `\nmodule.exports = ${globalEnv}.__webpack_require_UNI_MP_PLUGIN__('${uniModuleId}');\n`

      compilation.updateAsset(name, createSource(source))
    }
  })
}

function processAssets (compiler, compilation) {
  addSubPackagesRequire(compilation)

  addMPPluginRequire(compilation)

  generateJson(compilation)

  // app.js,app.wxss
  generateApp(compilation)
    .forEach(({
      file,
      source
    }) => emitFile(file, source, compilation))

  generateComponent(compilation, compiler.options.output[webpack.version[0] > 4 ? 'chunkLoadingGlobal' : 'jsonpFunction'])

  clearStyleFile(compilation)

  mockGenericComponent(compilation)

  addEmptyComponent(compilation)

  addPluginWrapper(compilation)
}

class WebpackUniMPPlugin {
  apply (compiler) {
    if (!process.env.UNI_USING_NATIVE && !process.env.UNI_USING_V3_NATIVE) {
      if (webpack.version[0] > 4) {
        compiler.hooks.compilation.tap('WebpackUniMPPlugin', compilation => {
          compilation.hooks.processAssets.tap({
            name: 'WebpackUniMPPlugin',
            stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
          }, (_) => {
            processAssets(compiler, compilation)
          })
        })
      } else {
        compiler.hooks.emit.tap('webpack-uni-mp-emit', (compilation) => processAssets(compiler, compilation))
      }
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
