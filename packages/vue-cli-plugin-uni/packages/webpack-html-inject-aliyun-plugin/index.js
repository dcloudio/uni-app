const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

class WebpackHtmlInjectAliYunPlugin {
  isEnableFacialRecognition = false;
  isInserted = false;
  AliYunCloudAuthWebSDK = '';

  constructor (AliYunCloudAuthWebSDK) {
    this.AliYunCloudAuthWebSDK = AliYunCloudAuthWebSDK
  }

  apply (compiler) {
    if (webpack.version[0] > 4) {
      compiler.hooks.compilation.tap('WebpackHtmlInjectAliYunPlugin', compilation => {
        compilation.hooks.processAssets.tap(
          {
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
    if (this.isInserted) {
      return
    }
    if (!this.isEnableFacialRecognition) {
      const assets = compilation.assets
      const chunkNames = Object.keys(assets).filter(name =>
        name.endsWith('.js')
      )
      chunkNames.forEach(name => {
        if (!this.isEnableFacialRecognition) {
          const asset = assets[name]
          const source = asset.source()

          this.isEnableFacialRecognition =
            source.includes('getFacialRecognitionMetaInfo') ||
            source.includes('window.getMetaInfo')
        }
      })
    }

    if (!this.isEnableFacialRecognition) return

    if (compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration) {
      compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync(
        'WebpackHtmlInjectAliYunPlugin',
        (data, cb) => {
          if (!this.isInserted) {
            data.assets.js.unshift(this.AliYunCloudAuthWebSDK)
            this.isInserted = true
            cb(null, data)
          }
        }
      )
    } else if (!this.isInserted) {
      const hooks = HtmlWebpackPlugin.getHooks(compilation)
      if (hooks) {
        hooks.beforeAssetTagGeneration.tapAsync(
          'WebpackHtmlInjectAliYunPlugin',
          (data, cb) => {
            data.assets.js.unshift(this.AliYunCloudAuthWebSDK)
            cb(null, data)
          }
        )
      }
      this.isInserted = true
    }
  }
}

module.exports = WebpackHtmlInjectAliYunPlugin
