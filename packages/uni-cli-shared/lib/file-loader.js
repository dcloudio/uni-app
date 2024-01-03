const path = require('path')
const {
  normalizePath
  // normalizeNodeModules
} = require('./util')

let inputDir

module.exports = {
  loader: 'file-loader',
  options: {
    name (resourcePath, resourceQuery) {
      if (!inputDir) {
        inputDir = normalizePath(process.env.UNI_INPUT_DIR)
      }
      resourcePath = normalizePath(resourcePath)
      if (resourcePath.startsWith(inputDir)) {
        const relativePath = normalizePath(path.relative(inputDir,
          resourcePath))
        if (relativePath.startsWith('static/') || relativePath.includes(
          'static/')) {
          return relativePath
        }
      }
      return 'assets/[name].[hash:8].[ext]'
    }
    // publicPath (url, resourcePath, context) {
    //   return '/' + normalizeNodeModules(path.relative(process.env.UNI_INPUT_DIR, resourcePath))
    // },
    // outputPath (url, resourcePath, context) {
    //   return normalizeNodeModules(path.relative(process.env.UNI_INPUT_DIR, resourcePath))
    // }
  }
}
