const path = require('path')
const webpack = require('webpack')

const {
  parseEntry,
  getMainEntry,
  getPlatformExts,
  getPlatformCssnano
} = require('@dcloudio/uni-cli-shared')

const WebpackUniAppPlugin = require('../../packages/webpack-uni-app-loader/plugin/index')

const modifyVueLoader = require('../vue-loader')

const {
  createTemplateCacheLoader
} = require('../cache-loader')

function createUniMPPlugin () {
  const WebpackUniMPPlugin = require('@dcloudio/webpack-uni-mp-loader/lib/plugin/index-new')
  return new WebpackUniMPPlugin()
}

function getProvides () {
  const uniPath = require.resolve('@dcloudio/uni-' + process.env.UNI_PLATFORM)
  const uniCloudPath = path.resolve(__dirname, '../../packages/uni-cloud/dist/index.js')
  const provides = {
    uni: [uniPath, 'default'],
    uniCloud: [uniCloudPath, 'default']
  }

  if (process.env.UNI_USING_COMPONENTS) {
    provides.createApp = [uniPath, 'createApp']
    provides.createPage = [uniPath, 'createPage']
    provides.createComponent = [uniPath, 'createComponent']
  }

  if (
    process.env.UNI_PLATFORM === 'app-plus' &&
    process.env.UNI_USING_V8
  ) {
    provides.__f__ = [path.resolve(__dirname, '../format-log.js'), 'default']

    const cryptoProvide = [path.resolve(__dirname, '../crypto.js'), 'default']
    provides.crypto = cryptoProvide
    provides['window.crypto'] = cryptoProvide
    provides['global.crypto'] = cryptoProvide
  }

  // TODO 目前依赖库 megalo 通过判断 wx 对象是否存在来识别平台做不同处理
  if (
    process.env.UNI_PLATFORM !== 'mp-qq' &&
    process.env.UNI_PLATFORM !== 'mp-weixin' &&
    process.env.UNI_PLATFORM !== 'app-plus'
  ) { // 非微信小程序，自动注入 wx 对象
    provides.wx = provides.uni
  }
  return provides
}

module.exports = {
  vueConfig: {
    parallel: false
  },
  webpackConfig (webpackConfig, vueOptions, api) {
    if (!webpackConfig.optimization) {
      webpackConfig.optimization = {}
    }
    // disable noEmitOnErrors
    webpackConfig.optimization.noEmitOnErrors = false

    webpackConfig.optimization.runtimeChunk = {
      name: 'common/runtime'
    }

    webpackConfig.optimization.splitChunks = require('../split-chunks')()

    parseEntry()

    const statCode = process.env.UNI_USING_STAT ? 'import \'@dcloudio/uni-stat\';' : ''

    const beforeCode = 'import \'uni-pages\';'

    const automator = `@dcloudio/uni-${process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM}/dist/automator`
    const automatorCode = process.env.UNI_AUTOMATOR_WS_ENDPOINT ? `import '${automator}';` : ''

    return {
      mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
      entry () {
        return process.UNI_ENTRY
      },
      output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
        globalObject: process.env.UNI_PLATFORM === 'mp-alipay' ? 'my' : 'global',
        sourceMapFilename: '../.sourcemap/' + process.env.UNI_PLATFORM + '/[name].js.map'
      },
      performance: {
        hints: false
      },
      resolve: {
        extensions: ['.nvue'],
        alias: { // 仅 mp-weixin
          'mpvue-page-factory': require.resolve(
            '@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory')
        }
      },
      module: {
        rules: [{
          test: path.resolve(process.env.UNI_INPUT_DIR, getMainEntry()),
          use: [{
            loader: path.resolve(__dirname, '../../packages/wrap-loader'),
            options: {
              before: [
                beforeCode + automatorCode + statCode
              ]
            }
          }, {
            loader: '@dcloudio/webpack-uni-mp-loader/lib/main'
          }]
        }, {
          resourceQuery: /vue&type=script/,
          use: [{
            loader: '@dcloudio/webpack-uni-mp-loader/lib/script'
          }]
        }, {
          resourceQuery: /vue&type=template/,
          use: [{
            loader: '@dcloudio/webpack-uni-mp-loader/lib/template'
          }, {
            loader: '@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta'
          }]
        }, createTemplateCacheLoader(api), {
          resourceQuery: [
            /lang=wxs/,
            /lang=filter/,
            /lang=sjs/,
            /blockType=wxs/,
            /blockType=filter/,
            /blockType=sjs/
          ],
          use: [{
            loader: require.resolve(
              '@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-filter-loader')
          }]
        }]
      },
      plugins: [
        new WebpackUniAppPlugin(),
        createUniMPPlugin(),
        new webpack.ProvidePlugin(getProvides())
      ]
    }
  },
  chainWebpack (webpackConfig, vueOptions, api) {
    if (process.env.UNI_PLATFORM === 'mp-baidu') {
      webpackConfig.module
        .rule('js')
        .exclude
        .add(/\.filter\.js$/)
    }

    const compilerOptions = process.env.UNI_USING_COMPONENTS ? {} : require('../mp-compiler-options')

    modifyVueLoader(webpackConfig, {}, compilerOptions, api)

    const styleExt = getPlatformExts().style

    webpackConfig.plugin('extract-css')
      .init((Plugin, args) => new Plugin({
        filename: '[name]' + styleExt
      }))

    if (
      process.env.NODE_ENV === 'production' &&
      process.env.UNI_PLATFORM !== 'app-plus'
    ) {
      const OptimizeCssnanoPlugin = require('../../packages/@intervolga/optimize-cssnano-plugin/index.js')
      webpackConfig.plugin('optimize-css')
        .init((Plugin, args) => new OptimizeCssnanoPlugin({
          sourceMap: false,
          filter (assetName) {
            return path.extname(assetName) === styleExt
          },
          cssnanoOptions: {
            preset: [
              'default',
              Object.assign({}, getPlatformCssnano(), {
                discardComments: true
              })
            ]
          }

        }))
    }

    webpackConfig.plugins.delete('hmr')
    webpackConfig.plugins.delete('html')
    webpackConfig.plugins.delete('copy')
    webpackConfig.plugins.delete('preload')
    webpackConfig.plugins.delete('prefetch')
  }
}
