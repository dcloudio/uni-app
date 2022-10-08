const path = require('path')
const {
  normalizeNodeModules
} = require('./util')

module.exports = {
  loader: 'file-loader',
  options: {
    publicPath (url, resourcePath, context) {
      return '/' + normalizeNodeModules(path.relative(process.env.UNI_INPUT_DIR, resourcePath))
    },
    outputPath (url, resourcePath, context) {
      return normalizeNodeModules(path.relative(process.env.UNI_INPUT_DIR, resourcePath))
    }
  }
}
