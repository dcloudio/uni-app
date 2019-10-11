const path = require('path')
const webpack = require('webpack')

const resolve = dir => path.resolve(__dirname, '../', dir)

const pkg = require('../package.json')

const externals = {}

if (process.env.UNI_VIEW !== 'true') {
  externals['vue'] = {
    commonjs: 'vue',
    commonjs2: 'vue',
    root: 'Vue'
  }
  externals['vue-router'] = {
    commonjs: 'vue-router',
    commonjs2: 'vue-router',
    root: 'VueRouter'
  }
}

const alias = {
  'uni-core': resolve('src/core'),
  'uni-view': resolve('src/core/view'),
  'uni-service': resolve('src/core/service'),
  'uni-shared': resolve('src/shared'),
  'uni-mixins': resolve('src/core/view/mixins'),
  'uni-helpers': resolve('src/core/helpers'),
  'uni-platform': resolve('src/platforms/' + process.env.UNI_PLATFORM),
  // tree shaking
  'uni-components': resolve('src/core/view/components'),
  'uni-invoke-api': resolve('src/platforms/' + process.env.UNI_PLATFORM + '/service/api'),
  'uni-service-api': resolve('src/core/service/platform-api'),
  'uni-api-protocol': resolve('src/core/helpers/protocol'),
  'uni-api-subscribe': resolve('src/core/view/bridge/subscribe/api/index'),
  // h5 components
  'uni-h5-app-components': resolve('src/platforms/h5/components/app/popup/index'),
  'uni-h5-app-mixins': resolve('src/platforms/h5/components/app/popup/mixins/index'),
  'uni-h5-system-routes': resolve('src/platforms/h5/components/system-routes/index')
}

const provides = {
  'console': [resolve('src/core/helpers/console'), 'default'],
  'UniViewJSBridge': [resolve('src/core/view/bridge/index')],
  'UniServiceJSBridge': [resolve('src/core/service/bridge/index')]
}
if (process.env.UNI_VIEW) { // 方便调试
  delete provides['console']
}
module.exports = function configureWebpack (config) {
  if (process.env.UNI_VIEW === 'true') {
    delete config.externals['vue']
    alias['vue$'] = resolve('packages/uni-app-plus/dist/view.runtime.esm.js')
  }

  return {
    mode: 'production',
    devtool: false,
    externals,
    resolve: {
      alias
    },
    module: {
      rules: []
    },
    plugins: [
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(pkg.version),
        __PLATFORM__: JSON.stringify(process.env.UNI_PLATFORM)
      }),
      new webpack.ProvidePlugin(provides)
    ]
  }
}
