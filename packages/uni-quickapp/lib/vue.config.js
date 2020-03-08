const path = require('path')
const webpack = require('webpack')

const CopyPlugin = require('copy-webpack-plugin')

const HandlerPlugin = require('@hap-toolkit/packager/lib/plugin/handler-plugin')

const ZipPlugin = require('@hap-toolkit/packager/lib/plugin/zip-plugin')

const Css2jsonPlugin = require('@hap-toolkit/dsl-vue/lib/plugin/css2json-plugin')
const InstVuePlugin = require('@hap-toolkit/dsl-vue/lib/plugin/instvue-plugin')

const env = {
  // 平台：native
  NODE_PLATFORM: 'native',
  // 阶段: dev|test|release
  NODE_PHASE: process.env.NODE_PHASE
}

const dslFilename = 'vue.' + (process.env.NODE_ENV === 'production' ? 'prod' : 'dev') + '.js'
global.framework = {}
global.framework.manifest = require('/Users/fxy/Documents/demo/my-qa-project/src/manifest.json')

module.exports = {
  configureWebpack: {
    devtool: false,
    entry: {
      'app': '/Users/fxy/Documents/demo/my-qa-project/src/App.vue?uxType=app',
      'pages/index/index': '/Users/fxy/Documents/demo/my-qa-project/src/pages/index/index.vue?uxType=page',
      'pages/detail/detail': '/Users/fxy/Documents/demo/my-qa-project/src/pages/detail/detail.vue?uxType=page',
      'pages/about/about': '/Users/fxy/Documents/demo/my-qa-project/src/pages/about/about.vue?uxType=page'
    },
    plugins: [
      new webpack.DefinePlugin({
        // 平台：na
        ENV_PLATFORM: JSON.stringify(env.NODE_PLATFORM),
        // 阶段: dev|test|release
        ENV_PHASE: JSON.stringify(env.NODE_PHASE),
        ENV_PHASE_DV: env.NODE_PHASE === 'dev',
        ENV_PHASE_QA: env.NODE_PHASE === 'test',
        ENV_PHASE_OL: env.NODE_PHASE === 'prod'
      }),
      new CopyPlugin([{
        from: path.resolve(__dirname, './dsls/' + dslFilename),
        to: 'dsl.js'
      }]),
      new HandlerPlugin({}),
      new Css2jsonPlugin(),
      new InstVuePlugin()
      // new ZipPlugin({
      //   name: s,
      //   icon: r,
      //   versionCode: t,
      //   output: l,
      //   pathBuild: u,
      //   pathSignFolder: a,
      //   sign: k,
      //   priorities: m,
      //   subpackages: c,
      //   comment: S,
      //   cwd: i,
      //   disableStreamPack: n.disableStreamPack,
      //   disableSubpackages: n.disableSubpackages
      // })
    ]
  },
  chainWebpack: config => {
    // config.module
    //   .rule('vue')
    //   .test([/\.vue$/, /\.nvue$/])
    //   .use('vue-loader')
    //   .loader(require.resolve('@dcloudio/vue-cli-plugin-uni/packages/vue-loader'))
    //   .tap(options => Object.assign(options, {
    //     hotReload: false
    //   }))

    config.plugins.delete('hmr')
    config.plugins.delete('html')
    config.plugins.delete('copy')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  }
}
