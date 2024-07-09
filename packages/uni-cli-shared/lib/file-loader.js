const path = require('path')
const webpack = require('webpack')
const {
  normalizePath
  // normalizeNodeModules
} = require('./util')

let inputDir

const uniModulesStaticRe = /uni_modules\/[^/]+\/static\//
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
        const subPackageStatic = Object.keys(process.UNI_SUBPACKAGES || {}).map(root => normalizePath(path.join(root,
          'static')) + '/')
        if (relativePath.startsWith('static/') || uniModulesStaticRe.test(relativePath) ||
          subPackageStatic.some(s => relativePath.startsWith(s))) {
          return relativePath
        }
      }
      return `assets/[name].[hash:8]${webpack.version[0] > 4 ? '' : '.'}[ext]`
    }
    // publicPath (url, resourcePath, context) {
    //   return '/' + normalizeNodeModules(path.relative(process.env.UNI_INPUT_DIR, resourcePath))
    // },
    // outputPath (url, resourcePath, context) {
    //   return normalizeNodeModules(path.relative(process.env.UNI_INPUT_DIR, resourcePath))
    // }
  }
}
