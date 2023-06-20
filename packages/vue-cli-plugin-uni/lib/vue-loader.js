const vueLoader = require('@dcloudio/uni-cli-shared/lib/vue-loader')

const {
  getPartialIdentifier
} = require('./util')

module.exports = function modifyVueLoader (webpackConfig, loaderOptions, compilerOptions, api) {
  // vue-loader options

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

  webpackConfig.module
    .rule('vue')
    .test(vueLoader.test)
    .use('vue-loader')
    .loader(vueLoader.loader)
    .tap(options => Object.assign(options, vueLoader.options(loaderOptions, compilerOptions), cacheConfig))
    .end()

  // 强制使用vue2,vue3时会使用vue-loader-v16
  webpackConfig.plugin('vue-loader').use(require(vueLoader.loader).VueLoaderPlugin)

  // h5 框架需要使用 scoped 样式,其他平台编译时识别是否 nvue 文件且注入 flex 相关样式
  if (process.env.UNI_PLATFORM === 'h5' || process.env.UNI_PLATFORM === 'mp-weibo') {
    webpackConfig.module
      .rule('vue')
      .use('uniapp-h5-style-scoped')
      .loader(require.resolve('@dcloudio/vue-cli-plugin-uni/packages/webpack-scoped-loader'))
  } else {
    webpackConfig.module
      .rule('vue')
      .use('uniapp-nvue-style-loader')
      .loader(require.resolve('@dcloudio/webpack-uni-mp-loader/lib/style.js'))
  }
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
}
