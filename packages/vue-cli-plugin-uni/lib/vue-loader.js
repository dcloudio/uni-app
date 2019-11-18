const {
  getPlatformCompiler
} = require('@dcloudio/uni-cli-shared')

const {
  isUnaryTag,
  getPartialIdentifier
} = require('./util')

module.exports = function modifyVueLoader (webpackConfig, compilerOptions, api) {
  // vue-loader options

  const cacheConfig = {
    cacheDirectory: false,
    cacheIdentifier: false
  }
  const partialIdentifier = {}

  if (process.env.UNI_USING_CACHE) {
    Object.assign(cacheConfig, api.genCacheConfig(
      'vue-template-compiler/' + process.env.UNI_PLATFORM,
      getPartialIdentifier()
    ))
  }

  webpackConfig.module
    .rule('vue')
    .test([/\.vue$/, /\.nvue$/])
    .use('vue-loader')
    .tap(options => Object.assign(options, {
      compiler: getPlatformCompiler(),
      compilerOptions: Object.assign({
        isUnaryTag,
        preserveWhitespace: false
      }, compilerOptions)
    }, cacheConfig))
    .end()
    .use('uniapp-custom-block-loader')
    .loader(require.resolve('@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader'))
    .options({
      compiler: getPlatformCompiler()
    })

  // h5 框架需要使用 scoped 样式,其他平台编译时识别是否 nvue 文件且注入 flex 相关样式
  if (process.env.UNI_PLATFORM === 'h5') {
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
        partialIdentifier
      )))
  } else {
    webpackConfig.module
      .rule('vue')
      .uses
      .delete('cache-loader')
  }
}
