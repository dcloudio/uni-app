const path = require('path')
const webpack = require('webpack')

const {
  getMainEntry
} = require('@dcloudio/uni-cli-shared')

const vueLoader = require('@dcloudio/uni-cli-shared/lib/vue-loader')

const {
  getGlobalUsingComponentsCode
} = require('@dcloudio/uni-cli-shared/lib/pages')

const WebpackUniAppPlugin = require('../../packages/webpack-uni-app-loader/plugin/index')

const {
  getPartialIdentifier
} = require('../util')

// const {
//   createTemplateCacheLoader
// } = require('../cache-loader')

const runtimePath = '@dcloudio/uni-mp-weixin/dist/mp.js'
const wxsPath = '@dcloudio/uni-mp-weixin/dist/wxs.js'
const uniCloudPath = path.resolve(__dirname, '../../packages/uni-cloud/dist/index.js')
const cryptoPath = path.resolve(__dirname, '../crypto.js')

function getProvides (isAppService) {
  if (isAppService) {
    return { // app-service
      __f__: [path.resolve(__dirname, '../format-log.js'), 'default'],
      wx: [runtimePath, 'default'],
      'wx.nextTick': [runtimePath, 'nextTick'],
      Page: [runtimePath, 'Page'],
      Component: [runtimePath, 'Component'],
      Behavior: [runtimePath, 'Behavior'],
      getDate: [wxsPath, 'getDate'],
      getRegExp: [wxsPath, 'getRegExp'],
      uniCloud: [uniCloudPath, 'default'],
      crypto: [cryptoPath, 'default'],
      'window.crypto': [cryptoPath, 'default'],
      'global.crypto': [cryptoPath, 'default']
    }
  }
  return { // app-view
    __f__: [path.resolve(__dirname, '../format-log.js'), 'default'],
    getDate: [wxsPath, 'getDate'],
    getRegExp: [wxsPath, 'getRegExp']
  }
}

const v3 = {
  vueConfig: {
    parallel: false
  },
  webpackConfig (webpackConfig, vueOptions, api) {
    const isAppService = !!vueOptions.pluginOptions['uni-app-plus'].service
    const isAppView = !!vueOptions.pluginOptions['uni-app-plus'].view

    const statCode = process.env.UNI_USING_STAT ? 'import \'@dcloudio/uni-stat\';' : ''

    const beforeCode = 'import \'uni-pages\';'

    if (!webpackConfig.optimization) {
      webpackConfig.optimization = {}
    }
    // disable noEmitOnErrors
    webpackConfig.optimization.noEmitOnErrors = false

    if (isAppService) {
      webpackConfig.optimization.runtimeChunk = {
        name: 'app-config'
      }
      webpackConfig.optimization.splitChunks = require('../split-chunks')()
    } else if (isAppView) {
      webpackConfig.optimization.runtimeChunk = false
      webpackConfig.optimization.splitChunks = false
    }

    const rules = []

    const scriptLoaders = []
    if (isAppView) {
      scriptLoaders.push({
        loader: path.resolve(__dirname,
          '../../packages/webpack-uni-app-loader/view/script')
      })
    }
    scriptLoaders.push({
      loader: path.resolve(__dirname,
        '../../packages/webpack-uni-app-loader/using-components')
    })
    rules.push({ // 解析组件，css 等
      resourceQuery: /vue&type=script/,
      use: scriptLoaders
    })
    // TODO 临时方案,将 wxs 也编译至 service
    rules.push({
      resourceQuery: [/lang=wxs/, /blockType=wxs/],
      use: [{
        loader: path.resolve(__dirname, '../../packages/webpack-uni-filter-loader')
      }]
    })

    if (isAppService) {
      rules.push({
        test: [/\.css$/, /\.p(ost)?css$/, /\.scss$/, /\.sass$/, /\.less$/, /\.styl(us)?$/],
        use: [{
          loader: path.resolve(__dirname, '../../packages/webpack-uni-app-loader/service/style.js')
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
      mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
      externals: {
        vue: 'Vue'
      },
      entry () {
        return entry
      },
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
            loader: isAppService
              ? path.resolve(__dirname, '../../packages/wrap-loader') : path.resolve(__dirname,
                '../../packages/webpack-uni-app-loader/view/main.js'),
            options: {
              compiler: vueLoader.compiler,
              before: [
                beforeCode + statCode + getGlobalUsingComponentsCode()
              ]
            }
          }]
        },
        {
          resourceQuery: /vue&type=template/,
          use: [{
            loader: path.resolve(__dirname,
              '../../packages/webpack-uni-app-loader/filter-modules-template.js')
          }, {
            loader: path.resolve(__dirname,
              '../../packages/webpack-uni-app-loader/page-meta')
          }]
        },
        ...rules
          // v3 暂不支持 cache
          // createTemplateCacheLoader(api,
          //   isAppService
          //     ? 'uni-template-compiler-service'
          //     : 'uni-template-compiler-view'
          // )
        ]
      },
      plugins: [
        new WebpackUniAppPlugin(),
        new webpack.ProvidePlugin(getProvides(isAppService))
      ]
    }
  },
  chainWebpack (webpackConfig, vueOptions, api) {
    webpackConfig.entryPoints.delete('app')

    const isAppService = !!vueOptions.pluginOptions['uni-app-plus'].service
    const isAppView = !!vueOptions.pluginOptions['uni-app-plus'].view

    const cacheConfig = {
      cacheDirectory: false,
      cacheIdentifier: false
    }

    if (process.env.UNI_USING_CACHE) {
      Object.assign(cacheConfig, api.genCacheConfig(
        'vue-template-compiler/' + process.env.UNI_PLATFORM,
        getPartialIdentifier()
      ))
    }

    const compilerOptions = {
      preserveWhitespace: false,
      service: isAppService,
      view: isAppView
    }

    // disable vue cache-loader
    webpackConfig.module
      .rule('vue')
      .test(vueLoader.test)
      .use('vue-loader') //  service 层移除 style 节点，view 层返回固定 script
      .loader(vueLoader.loader)
      .tap(options => Object.assign(options, vueLoader.options({
        isAppService,
        isAppView
      }, compilerOptions), cacheConfig))
      .end()

    // 是否启用 cache
    if (process.env.UNI_USING_CACHE) {
      webpackConfig.module
        .rule('vue')
        .use('cache-loader')
        .tap(options => Object.assign(options, api.genCacheConfig(
          'vue-loader/' + process.env.UNI_PLATFORM,
          getPartialIdentifier()
        )))
    } else {
      webpackConfig.module
        .rule('vue')
        .uses
        .delete('cache-loader')
    }

    if (isAppView) {
      if (process.env.UNI_USING_V3_SCOPED) {
        webpackConfig.module
          .rule('vue')
          .use('uniapp-app-style-scoped')
          .loader(path.resolve(__dirname,
            '../../packages/webpack-uni-app-loader/view/style'))
      }

      if (process.env.NODE_ENV === 'production') {
        require('../h5/cssnano-options')(webpackConfig)
      }
    }

    if (isAppService) { // service 层移除 css 相关
      ['css', 'postcss', 'scss', 'sass', 'less', 'stylus'].forEach(cssLang => {
        webpackConfig.module.rules.delete(cssLang)
      })
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
