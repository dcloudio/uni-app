module.exports = config => {

  config.module
    .rule('vue')
    .test([/\.vue$/, /\.nvue$/])
    .use('vue-loader')
    .loader(require.resolve('@dcloudio/vue-cli-plugin-uni/packages/vue-loader'))
    .tap(options => Object.assign(options, {
      compiler: require('@dcloudio/uni-template-compiler'),
      compilerOptions: {
        quickapp: true,
        preserveWhitespace: false
      },
      hotReload: false,
      cacheDirectory: false,
      cacheIdentifier: false
    }))

  config.module
    .rule('vue')
    .uses
    .delete('cache-loader')

  config.plugin('extract-css')
    .init((Plugin, args) => new Plugin({
      filename: '[name].css.json'
    }))

  config.plugins.delete('hmr')
  config.plugins.delete('html')
  config.plugins.delete('copy')
  config.plugins.delete('preload')
  config.plugins.delete('prefetch')
}
