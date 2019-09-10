const path = require('path')

const webpack = require('webpack')

const WebpackOptimizePlugin = require('./packages/webpack-optimize-plugin')

const {
  src,
  lib
} = require('@dcloudio/uni-h5/path')

const resolve = dir => path.resolve(__dirname, './', dir)

module.exports = (api, options) => {
  if (!process.env.UNI_OPT_TREESHAKINGNG) {
    return
  }

  if (process.env.NODE_ENV !== 'production' || process.env.UNI_PLATFORM !== 'h5') {
    return
  }

  // 组件
  const uniComponentsPath = resolve('.tmp/components.js')

  const uniInvokeApiPath = resolve('.tmp/invoke-api.js')
  const uniServiceApiPath = resolve('.tmp/api.js')
  const uniApiProtocolPath = resolve('.tmp/protocol.js')
  const uniApiSubscribePath = resolve('.tmp/subscribe.js')
  const uniH5AppComponentsPath = resolve('.tmp/app-components.js')
  const uniH5AppMixinsPath = resolve('.tmp/app-mixins.js')
  const uniH5SystemRoutes = resolve('.tmp/system-routes.js')

  options.transpileDependencies.push(/vue-cli-plugin-uni-optimize/)
  options.transpileDependencies.push(/uni-h5/)

  api.configureWebpack(webpackConfig => {
    return {
      watch: true,
      resolve: {
        alias: {
          ['uni-' + process.env.UNI_PLATFORM]: path.join(lib, `${process.env.UNI_PLATFORM}/main.js`),
          'uni-core': path.join(src, 'core'),
          'uni-view': path.join(src, 'core/view'),
          'uni-service': path.join(src, 'core/service'),
          'uni-shared': path.join(src, 'shared'),
          'uni-mixins': path.join(src, 'core/view/mixins'),
          'uni-helpers': path.join(src, 'core/helpers'),
          'uni-platform': path.join(src, 'platforms/' + process.env.UNI_PLATFORM),

          // tree shaking
          'uni-components': uniComponentsPath,
          'uni-invoke-api': uniInvokeApiPath,
          'uni-service-api': uniServiceApiPath,
          'uni-api-protocol': uniApiProtocolPath,
          'uni-api-subscribe': uniApiSubscribePath,
          // h5 components
          'uni-h5-app-components': uniH5AppComponentsPath,
          'uni-h5-app-mixins': uniH5AppMixinsPath,
          'uni-h5-system-routes': uniH5SystemRoutes
        }
      },
      plugins: [
        new WebpackOptimizePlugin(),
        new webpack.DefinePlugin({
          __VERSION__: JSON.stringify(require('@dcloudio/uni-' + process.env.UNI_PLATFORM + '/package.json').version),
          __PLATFORM__: JSON.stringify(process.env.UNI_PLATFORM)
        }),
        new webpack.ProvidePlugin({
          'console': [path.join(src, 'core/helpers/console'), 'default'],
          'UniViewJSBridge': [path.join(src, 'core/view/bridge/index')],
          'UniServiceJSBridge': [path.join(src, 'core/service/bridge/index')]
        })
      ]
    }
  })

  api.chainWebpack(webpackConfig => {
    // Vue
    webpackConfig.module
      .rule('vue')
      .use('vue-loader')
      .loader(resolve('packages/vue-loader'))
      .tap(options => Object.assign(options, {
        cacheDirectory: false,
        cacheIdentifier: false,
        compilerOptions: require('@dcloudio/vue-cli-plugin-uni/lib/h5/compiler-options')
      }))
      .end()
      .uses
      .delete('cache-loader')
  })
}
