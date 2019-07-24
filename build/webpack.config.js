const path = require('path')
const webpack = require('webpack')

const resolve = dir => path.resolve(__dirname, '../', dir)

const pkg = require('../package.json')

module.exports = {
  mode: 'production',
  devtool: false,
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      root: 'Vue'
    },
    'vue-router': {
      commonjs: 'vue-router',
      commonjs2: 'vue-router',
      root: 'VueRouter'
    }
  },
  resolve: {
    alias: {
      'uni-core': resolve('src/core'),
      'uni-view': resolve('src/core/view'),
      'uni-service': resolve('src/core/service'),
      'uni-shared': resolve('src/shared'),
      'uni-mixins': resolve('src/core/view/mixins'),
      'uni-helpers': resolve('src/core/helpers'),
      'uni-platform': resolve('src/platforms/' + process.env.UNI_PLATFORM),
      'uni-components': resolve('src/core/view/components')
    }
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(pkg.version),
      __PLATFORM__: JSON.stringify(process.env.UNI_PLATFORM)
    }),
    new webpack.ProvidePlugin({
      'console': [resolve('src/core/helpers/console'), 'default'],
      'UniViewJSBridge': [resolve('src/core/view/bridge/index')],
      'UniServiceJSBridge': [resolve('src/core/service/bridge/index')]
    })
  ]
}
