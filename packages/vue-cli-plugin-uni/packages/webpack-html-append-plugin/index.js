const HtmlWebpackPlugin = require('html-webpack-plugin')

class WebpackHtmlAppendPlugin {
  constructor (content) {
    this.content = content || ''
  }
  apply (compiler) {
    compiler.hooks.compilation.tap('WebpackHtmlAppendPlugin', (compilation) => {
      const beforeEmit = compilation.hooks.htmlWebpackPluginAfterHtmlProcessing ||
                HtmlWebpackPlugin.getHooks(compilation).beforeEmit

      beforeEmit.tapAsync('WebpackHtmlAppendPlugin', (data, cb) => {
        data.html += this.content
        cb(null, data)
      })
    })
  }
}

module.exports = WebpackHtmlAppendPlugin
