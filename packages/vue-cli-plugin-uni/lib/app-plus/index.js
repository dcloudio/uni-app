const path = require('path')
const webpack = require('webpack')

const {
  getMainEntry,
  getPlatformCompiler
} = require('@dcloudio/uni-cli-shared')

const {
  isUnaryTag
} = require('../util')

function getProvides () {
  return {
    '__f__': [path.resolve(__dirname, '../format-log.js'), 'default'],
    'Behavior': ['@dcloudio/uni-mp-weixin/dist/mp.js', 'Behavior'],
    'Component': ['@dcloudio/uni-mp-weixin/dist/mp.js', 'Component']
  }
}

const v3 = {
  vueConfig: {
    parallel: false
  },
  webpackConfig (webpackConfig, vueOptions) {
    const isAppService = !!vueOptions.pluginOptions['uni-app-plus']['service']
    const isAppView = !!vueOptions.pluginOptions['uni-app-plus']['view']

    const statCode = process.env.UNI_USING_STAT ? `import '@dcloudio/uni-stat';` : ''

    const beforeCode = `import 'uni-pages';`

    if (!webpackConfig.optimization) {
      webpackConfig.optimization = {}
    }
    // disable noEmitOnErrors
    webpackConfig.optimization.noEmitOnErrors = false

    if (isAppService) {
      webpackConfig.optimization.runtimeChunk = {
        name: 'app-config'
      }
    } else if (isAppView) {
      webpackConfig.optimization.runtimeChunk = false
    }

    webpackConfig.optimization.splitChunks = false

    let devtool = false

    const rules = []

    if (isAppView) {
      rules.push({ // 解析组件，css 等
        resourceQuery: /vue&type=script/,
        use: [{
          loader: path.resolve(__dirname,
            '../../packages/webpack-uni-app-loader/view/script')
        }]
      })
      rules.push({
        resourceQuery: [/lang=wxs/, /blockType=wxs/],
        use: [{
          loader: path.resolve(__dirname, '../../packages/webpack-uni-filter-loader')
        }]
      })
    }

    const entry = {}
    if (isAppService) {
      entry['app-service'] = path.resolve(process.env.UNI_INPUT_DIR, getMainEntry())
    } else if (isAppView) {
      entry['app-view'] = path.resolve(process.env.UNI_INPUT_DIR, getMainEntry())
    }

    return {
      devtool,
      mode: isAppView ? 'production' : process.env.NODE_ENV,
      externals: {
        vue: 'Vue'
      },
      entry,
      output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
        globalObject: 'this'
      },
      performance: {
        hints: false
      },
      resolve: {
        extensions: ['.nvue']
      },
      resolveLoader: {
        alias: {
          'vue-style-loader': path.resolve(__dirname, '../../packages/app-vue-style-loader')
        }
      },
      module: {
        rules: [{
          test: path.resolve(process.env.UNI_INPUT_DIR, getMainEntry()),
          use: [{
            loader: isAppService ? 'wrap-loader' : path.resolve(__dirname,
              '../../packages/webpack-uni-app-loader/view/main.js'),
            options: {
              compiler: getPlatformCompiler(),
              before: [
                beforeCode + statCode
              ]
            }
          }]
        },
        {
          resourceQuery: /vue&type=template/,
          use: [{
            loader: path.resolve(__dirname,
              '../../packages/webpack-uni-app-loader/filter-modules-template.js')
          }]
        },
        ...rules
        ]
      },
      plugins: [
        new webpack.ProvidePlugin(getProvides())
      ]
    }
  },
  chainWebpack (webpackConfig, vueOptions) {
    webpackConfig.entryPoints.delete('app')

    const isAppService = !!vueOptions.pluginOptions['uni-app-plus']['service']
    const isAppView = !!vueOptions.pluginOptions['uni-app-plus']['view']

    const compilerOptions = {
      isUnaryTag,
      preserveWhitespace: false,
      service: isAppService,
      view: isAppView
    }

    // disable vue cache-loader
    webpackConfig.module
      .rule('vue')
      .test([/\.vue$/, /\.nvue$/])
      .use('vue-loader') //  service 层移除 style 节点，view 层返回固定 script
      .loader(path.resolve(__dirname, '../../packages/vue-loader/lib'))
      .tap(options => Object.assign(options, {
        isAppService,
        isAppView,
        compiler: getPlatformCompiler(),
        compilerOptions,
        cacheDirectory: false,
        cacheIdentifier: false
      }))
      .end()
      .use('uniapp-custom-block-loader')
      .loader(require.resolve('@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader'))
      .options({
        compiler: getPlatformCompiler()
      })
      .end()
      .uses
      .delete('cache-loader')
      .end()

    if (isAppView) {
      webpackConfig.module
        .rule('vue')
        .test([/\.vue$/, /\.nvue$/])
        .use('uniapp-custom-block-loader')
        .loader(require.resolve('@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader'))
        .options({
          compiler: getPlatformCompiler()
        })
      if (process.env.NODE_ENV === 'production') {
        require('../h5/cssnano-options')(webpackConfig)
      }
    }

    webpackConfig.plugins.delete('hmr')
    webpackConfig.plugins.delete('html')
    webpackConfig.plugins.delete('copy')
    webpackConfig.plugins.delete('preload')
    webpackConfig.plugins.delete('prefetch')
  }
}
if (process.env.UNI_USING_V3) {
  module.exports = v3
} else {
  module.exports = require('../mp')
}
