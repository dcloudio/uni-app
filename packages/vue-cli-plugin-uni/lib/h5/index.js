const fs = require('fs')
const path = require('path')

const {
  getMainEntry,
  getH5Options,
  getPlatformCompiler
} = require('@dcloudio/uni-cli-shared')

const WebpackHtmlAppendPlugin = require('../../packages/webpack-html-append-plugin')

function resolve (dir) {
  return path.resolve(__dirname, '../../', dir)
}

const {
  title,
  publicPath,
  template,
  devServer
} = getH5Options()

const plugins = []

if (process.env.NODE_ENV !== 'production') {
  plugins.push(new WebpackHtmlAppendPlugin(
    `
        <script>
        ${fs.readFileSync(path.resolve(__dirname, './auto-reload.js'), 'utf8')}
        </script>
        `
  ))
}

const vueConfig = {
  parallel: false, // 因为传入了自定义 compiler，避免参数丢失，禁用parallel
  publicPath,
  pages: {
    index: {
      // page 的入口
      entry: path.resolve(process.env.UNI_INPUT_DIR, getMainEntry()),
      // 模板来源
      template,
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title,
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      baseUrl: publicPath
    }
  }
}

if (devServer && Object.keys(devServer).length) {
  vueConfig.devServer = devServer
}

module.exports = {
  vueConfig,
  webpackConfig (webpackConfig) {
    let useBuiltIns = 'usage'

    const statCode = process.env.UNI_USING_STAT ? `import '@dcloudio/uni-stat';` : ''

    try {
      const babelConfig = require(path.resolve(process.env.UNI_CLI_CONTEXT, 'babel.config.js'))
      useBuiltIns = babelConfig.presets[0][1].useBuiltIns
    } catch (e) {}

    const beforeCode = (useBuiltIns === 'entry' ? `import '@babel/polyfill';` : '') +
            `import 'uni-pages';import 'uni-${process.env.UNI_PLATFORM}';`

    return {
      devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
      resolve: {
        extensions: ['.nvue'],
        alias: {
          'vue-router': resolve('packages/h5-vue-router'),
          'uni-h5': require.resolve('@dcloudio/uni-h5')
        }
      },
      module: {
        rules: [{
          test: path.resolve(process.env.UNI_INPUT_DIR, getMainEntry()),
          use: [{
            loader: 'wrap-loader',
            options: {
              before: [
                beforeCode + statCode
              ]
            }
          }]
        }, {
          test: /App\.vue$/,
          use: {
            loader: 'wrap-loader',
            options: {
              before: [`<template><App :keepAliveInclude="keepAliveInclude"/></template>`]
            }
          }
        }, {
          resourceQuery: /vue&type=template/,
          use: [{
            loader: resolve('packages/webpack-uni-app-loader/filter-modules-template.js')
          }]
        }, {
          resourceQuery: [/lang=wxs/, /blockType=wxs/],
          use: [{
            loader: resolve('packages/webpack-uni-filter-loader')
          }]
        }]
      },
      resolveLoader: {
        alias: {
          'vue-style-loader': resolve('packages/h5-vue-style-loader')
        }
      },
      plugins
    }
  },
  chainWebpack (webpackConfig) {
    webpackConfig.plugins.delete('copy')

    if (!process.env.UNI_OPT_PREFETCH) {
      webpackConfig.plugins.delete('prefetch-index')
    }
    if (!process.env.UNI_OPT_PRELOAD) {
      webpackConfig.plugins.delete('preload-index')
    }
    // Vue
    webpackConfig.module
      .rule('vue')
      .test([/\.vue$/, /\.nvue$/])
      .use('vue-loader')
      .tap(options => Object.assign(options, {
        compiler: getPlatformCompiler(),
        compilerOptions: require('./compiler-options'),
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
      .use('uniapp-scoped')
      .loader(resolve('packages/webpack-scoped-loader'))
      .end()
      .uses
      .delete('cache-loader')

    if (process.env.NODE_ENV === 'production') {
      require('./cssnano-options')(webpackConfig)
    }
  }
}
