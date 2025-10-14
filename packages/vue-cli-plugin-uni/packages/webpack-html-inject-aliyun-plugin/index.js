const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

class WebpackHtmlInjectAliYunPlugin {
  AliYunCloudAuthWebSDK = '';

  constructor (AliYunCloudAuthWebSDK) {
    this.AliYunCloudAuthWebSDK = AliYunCloudAuthWebSDK
  }

  apply (compiler) {
    if (webpack.version[0] > 4) {
      compiler.hooks.compilation.tap('WebpackHtmlInjectAliYunPlugin', compilation => {
        compilation.hooks.processAssets.tap({
          name: 'WebpackHtmlInjectAliYunPlugin',
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING
        },
        _ => {
          this.analyze(compilation)
        }
        )
      })
    } else {
      compiler.hooks.afterCompile.tap(
        'WebpackHtmlInjectAliYunPlugin',
        compilation => {
          this.analyze(compilation)
        }
      )
    }
  }

  analyze (compilation) {
    const assets = compilation.assets
    const chunkNames = Object.keys(assets).filter(name =>
      name.endsWith('.js') && !name.includes('chunk-vendors')
    )
    const findChunkName = chunkNames.find(name => {
      const asset = assets[name]
      const source = asset.source()
      return source.includes('getFacialRecognitionMetaInfo') || source.includes('window.getMetaInfo')
    })
    if (!findChunkName) return

    if (compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration) {
      compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync(
        'WebpackHtmlInjectAliYunPlugin',
        (data, cb) => {
          const index = data.assets.js.indexOf(this.AliYunCloudAuthWebSDK)
          if (index === -1) {
            data.assets.js.unshift(this.AliYunCloudAuthWebSDK)
          }
          cb(null, data)
        }
      )
    } else {
      const hooks = HtmlWebpackPlugin.getHooks(compilation)
      if (hooks) {
        hooks.beforeAssetTagGeneration.tapAsync(
          'WebpackHtmlInjectAliYunPlugin',
          (data, cb) => {
            const index = data.assets.js.indexOf(this.AliYunCloudAuthWebSDK)
            if (index === -1) {
              data.assets.js.unshift(this.AliYunCloudAuthWebSDK)
            }
            cb(null, data)
          }
        )
      }
    }
  }
}

module.exports = WebpackHtmlInjectAliYunPlugin
