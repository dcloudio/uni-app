const path = require('path')

const isWin = /^win/.test(process.platform)

const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

module.exports = {
  loader: 'file-loader',
  options: {
    publicPath (url, resourcePath, context) {
      return '/' + normalizePath(path.relative(process.env.UNI_INPUT_DIR, resourcePath))
    },
    outputPath (url, resourcePath, context) {
      return normalizePath(path.relative(process.env.UNI_INPUT_DIR, resourcePath))
    }
  }
}
