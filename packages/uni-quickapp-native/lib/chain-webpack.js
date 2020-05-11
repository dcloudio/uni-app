const vueLoader = require('@dcloudio/uni-cli-shared/lib/vue-loader')

module.exports = config => {
  config.module
    .rule('vue')
    .test(vueLoader.test)
    .use('vue-loader')
    .loader(vueLoader.loader)
    .tap(options => Object.assign(options, vueLoader.options({}, {
      'quickapp-native': true
    })))

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
