const webpack = require('webpack')
let VueLoaderPlugin = null

if (webpack.version && webpack.version[0] > 4) {
  // webpack5 and upper
  VueLoaderPlugin = require('./plugin-webpack5')
} else {
  // webpack4 and lower
  VueLoaderPlugin = require('./plugin-webpack4')
}

module.exports = VueLoaderPlugin
