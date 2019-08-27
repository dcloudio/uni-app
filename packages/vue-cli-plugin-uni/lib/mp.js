const path = require('path')
const webpack = require('webpack')

const moduleAlias = require('module-alias')
// TODO 重写 vue scoped(若升级 vue 编译器，需要确认该文件路径是否发生变化)
moduleAlias.addAlias('./stylePlugins/scoped', path.resolve(__dirname, './scoped.js'))

const {
  parseEntry,
  getMainEntry,
  getPlatformExts,
  getPlatformCompiler,
  getPlatformCssnano
} = require('@dcloudio/uni-cli-shared')

function createUniMPPlugin () {
  if (process.env.UNI_USING_COMPONENTS) {
    const WebpackUniMPPlugin = require('@dcloudio/webpack-uni-mp-loader/lib/plugin/index-new')
    return new WebpackUniMPPlugin()
  }
  const WebpackUniMPPlugin = require('@dcloudio/webpack-uni-mp-loader/lib/plugin')
  return new WebpackUniMPPlugin()
}

function getProvides () {
  const uniPath = require.resolve('@dcloudio/uni-' + process.env.UNI_PLATFORM)
  const provides = {
    'uni': [uniPath, 'default']
  }

  if (process.env.UNI_USING_COMPONENTS) {
    provides['createApp'] = [uniPath, 'createApp']
    provides['createPage'] = [uniPath, 'createPage']
    provides['createComponent'] = [uniPath, 'createComponent']
  }

  if (
    process.env.UNI_PLATFORM === 'app-plus' &&
    process.env.UNI_USING_V8
  ) {
    provides['__f__'] = [path.resolve(__dirname, 'format-log.js'), 'default']
  }

  // TODO 目前依赖库 megalo 通过判断 wx 对象是否存在来识别平台做不同处理
  if (
    process.env.UNI_PLATFORM !== 'mp-qq' &&
    process.env.UNI_PLATFORM !== 'mp-weixin' &&
    process.env.UNI_PLATFORM !== 'app-plus'
  ) { // 非微信小程序，自动注入 wx 对象
    provides['wx'] = provides['uni']
  }
  return provides
}

module.exports = {
  vueConfig: {
    parallel: false
  },
  webpackConfig (webpackConfig) {
    if (!webpackConfig.optimization) {
      webpackConfig.optimization = {}
    }
    // disable noEmitOnErrors
    webpackConfig.optimization.noEmitOnErrors = false

    webpackConfig.optimization.runtimeChunk = {
      name: 'common/runtime'
    }

    webpackConfig.optimization.splitChunks = require('./split-chunks')()

    parseEntry()

    let devtool = false
    if (process.env.NODE_ENV !== 'production') {
      if (process.env.UNI_PLATFORM === 'app-plus') {
        if (process.env.UNI_USING_V8) {
          devtool = 'eval-source-map'
        } else {
          devtool = 'eval'
        }
      } else if (
        process.env.UNI_PLATFORM === 'mp-baidu' ||
        process.env.UNI_PLATFORM === 'mp-toutiao'
      ) {
        devtool = 'inline-source-map'
      } else {
        devtool = 'sourcemap'
      }
    }

    return {
      devtool,
      mode: process.env.NODE_ENV,
      entry () {
        return process.UNI_ENTRY
      },
      output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
        globalObject: process.env.UNI_PLATFORM === 'mp-alipay' ? 'my' : 'global',
        sourceMapFilename: '../.sourcemap/' + process.env.UNI_PLATFORM + '/[name].js.map'
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
          }]
        }, {
          resourceQuery: [/blockType=wxs/, /blockType=filter/, /blockType=import-sjs/],
          use: [{
            loader: require.resolve(
              '@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-filter-loader')
          }]
        }]
      },
      plugins: [
        createUniMPPlugin(),
        new webpack.ProvidePlugin(getProvides())
      ]
    }
  },
  chainWebpack (webpackConfig) {
    if (process.env.UNI_PLATFORM === 'mp-baidu') {
      webpackConfig.module
        .rule('js')
        .exclude
        .add(/\.filter\.js$/)
    }

    // disable vue cache-loader
    webpackConfig.module
      .rule('vue')
      .test([/\.vue$/, /\.nvue$/])
      .use('vue-loader')
      .tap(options => Object.assign(options, {
        compiler: getPlatformCompiler(),
        compilerOptions: process.env.UNI_USING_COMPONENTS ? {
          preserveWhitespace: false
        } : require('./mp-compiler-options'),
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
      .use('uniapp-nvue-loader')
      .loader(require.resolve('@dcloudio/webpack-uni-mp-loader/lib/style.js'))
      .end()
      .uses
      .delete('cache-loader')

    const styleExt = getPlatformExts().style

    webpackConfig.plugin('extract-css')
      .init((Plugin, args) => new Plugin({
        filename: '[name]' + styleExt
      }))

    if (
      process.env.NODE_ENV === 'production' &&
      process.env.UNI_PLATFORM !== 'app-plus'
    ) {
      const OptimizeCssnanoPlugin = require('../packages/@intervolga/optimize-cssnano-plugin/index.js')
      webpackConfig.plugin('optimize-css')
        .init((Plugin, args) => new OptimizeCssnanoPlugin({
          sourceMap: false,
          filter (assetName) {
            return path.extname(assetName) === styleExt
          },
          cssnanoOptions: {
            preset: [
              'default',
              getPlatformCssnano()
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
