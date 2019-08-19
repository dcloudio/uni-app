const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = function chainWebpack (platformOptions) {
  const {
    runByHBuilderX, // 使用 HBuilderX 运行
    cssPreprocessOptions
  } = require('@dcloudio/uni-cli-shared')

  return function (webpackConfig) {
    // 处理静态资源 limit
    webpackConfig.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 40960
      }))

    webpackConfig.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 40960
      }))
    // 条件编译 vue 文件统一直接过滤html,js,css三种类型,单独资源文件引用各自过滤

    const loaders = {
      'scss': 'sass-loader',
      'sass': 'sass-loader',
      'less': 'less-loader',
      'stylus': 'stylus-loader'
    }
    // 独立css,postcss,scss,sass,less,stylus
    const cssLang = ['css', 'postcss', 'scss', 'sass', 'less', 'stylus']

    const cssTypes = ['vue-modules', 'vue', 'normal-modules', 'normal']

    cssLang.forEach(lang => {
      const langRule = webpackConfig.module.rule(lang)
      const loader = loaders[lang]
      cssTypes.forEach(type => {
        langRule.oneOf(type)
          .use(`uniapp-preprocss`)
          .loader(resolve('packages/webpack-preprocess-loader'))
          .options(cssPreprocessOptions)
          .before('css-loader') // 在 css-loader 之后条件编译一次，避免 import 进来的 css 没有走条件编译
        if (loader) { // 在 scss,less,stylus 之前先条件编译一次
          langRule.oneOf(type)
            .use(`uniapp-preprocss-` + lang)
            .loader(resolve('packages/webpack-preprocess-loader'))
            .options(cssPreprocessOptions)
            .after(loader)
        }
      })
    })

    platformOptions.chainWebpack(webpackConfig)
    // define
    webpackConfig
      .plugin('uni-define')
      .use(require.resolve('webpack/lib/DefinePlugin'), [{
        'process.env.UNI_ENV': JSON.stringify(process.env.UNI_PLATFORM)
      }])

    if (runByHBuilderX) { // 由 HBuilderX 运行时，移除进度，错误
      webpackConfig.plugins.delete('progress')
      webpackConfig.plugins.delete('friendly-errors')
    }
  }
}
