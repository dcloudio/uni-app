const fs = require('fs')
const path = require('path')

const {
  getMainEntry,
  getH5Options,
  getPlatformCompiler,
  getPlatformCssnano
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
          test: /App\.vue$/,
          use: {
            loader: 'wrap-loader',
            options: {
              before: [`<template><App :keepAliveInclude="keepAliveInclude"/></template>`]
            }
          }
        }, {
          resourceQuery: /blockType=wxs/,
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
      const module = webpackConfig.module
      // TODO 临时 hack calc:false 看看 vue cli 后续是否开放 cssnano 的配置
      const cssnanoOptions = {
        sourceMap: false,
        plugins: [require('cssnano')({
          preset: ['default', getPlatformCssnano()]
        })]
      }

      module.rule('css').oneOf('vue-modules').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
      module.rule('css').oneOf('vue').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
      module.rule('css').oneOf('normal-modules').use('cssnano').loader('postcss-loader').options(
        cssnanoOptions)
      module.rule('css').oneOf('normal').use('cssnano').loader('postcss-loader').options(cssnanoOptions)

      module.rule('postcss').oneOf('vue-modules').use('cssnano').loader('postcss-loader').options(
        cssnanoOptions)
      module.rule('postcss').oneOf('vue').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
      module.rule('postcss').oneOf('normal-modules').use('cssnano').loader('postcss-loader').options(
        cssnanoOptions)
      module.rule('postcss').oneOf('normal').use('cssnano').loader('postcss-loader').options(cssnanoOptions)

      module.rule('scss').oneOf('vue-modules').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
      module.rule('scss').oneOf('vue').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
      module.rule('scss').oneOf('normal-modules').use('cssnano').loader('postcss-loader').options(
        cssnanoOptions)
      module.rule('scss').oneOf('normal').use('cssnano').loader('postcss-loader').options(cssnanoOptions)

      module.rule('sass').oneOf('vue-modules').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
      module.rule('sass').oneOf('vue').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
      module.rule('sass').oneOf('normal-modules').use('cssnano').loader('postcss-loader').options(
        cssnanoOptions)
      module.rule('sass').oneOf('normal').use('cssnano').loader('postcss-loader').options(cssnanoOptions)

      module.rule('less').oneOf('vue-modules').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
      module.rule('less').oneOf('vue').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
      module.rule('less').oneOf('normal-modules').use('cssnano').loader('postcss-loader').options(
        cssnanoOptions)
      module.rule('less').oneOf('normal').use('cssnano').loader('postcss-loader').options(cssnanoOptions)

      module.rule('stylus').oneOf('vue-modules').use('cssnano').loader('postcss-loader').options(
        cssnanoOptions)
      module.rule('stylus').oneOf('vue').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
      module.rule('stylus').oneOf('normal-modules').use('cssnano').loader('postcss-loader').options(
        cssnanoOptions)
      module.rule('stylus').oneOf('normal').use('cssnano').loader('postcss-loader').options(cssnanoOptions)
    }
  }
}
