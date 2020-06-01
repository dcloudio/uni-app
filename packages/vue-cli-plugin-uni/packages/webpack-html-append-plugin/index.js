const HtmlWebpackPlugin = require('html-webpack-plugin')

class WebpackHtmlAppendPlugin {
  constructor (content) {
    this.content = content || ''
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('WebpackHtmlAppendPlugin', (compilation) => {
      let beforeEmit = compilation.hooks.htmlWebpackPluginAfterHtmlProcessing
      if (!beforeEmit && HtmlWebpackPlugin.getHooks) {
        const hooks = HtmlWebpackPlugin.getHooks(compilation)
        if (hooks) {
          beforeEmit = hooks.beforeEmit
        }
      }
      beforeEmit && beforeEmit.tapAsync('WebpackHtmlAppendPlugin', (data, cb) => {
        data.html += this.content
        cb(null, data)
      })
    })
  }
}

module.exports = WebpackHtmlAppendPlugin
