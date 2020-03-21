const path = require('path')

const {
  sassLoaderVersion
} = require('@dcloudio/uni-cli-shared/lib/scss')

const {
  getPartialIdentifier
} = require('./util')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = function chainWebpack (platformOptions, vueOptions, api) {
  const {
    runByHBuilderX, // 使用 HBuilderX 运行
    cssPreprocessOptions
  } = require('@dcloudio/uni-cli-shared')

  return function (webpackConfig) {
    // 处理静态资源 limit
    const urlLoader = require('@dcloudio/uni-cli-shared/lib/url-loader')
    const staticTypes = ['images', 'media', 'fonts']
    staticTypes.forEach(staticType => {
      webpackConfig.module
        .rule(staticType)
        .use('url-loader')
        .loader(urlLoader.loader)
        .tap(options => Object.assign(options, urlLoader.options()))
    })
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
        if (process.env.UNI_USING_CACHE) {
          langRule.oneOf(type)
            .use(`uniapp-cache-css`)
            .loader('cache-loader')
            .options(api.genCacheConfig(
              'css-loader/' + process.env.UNI_PLATFORM,
              getPartialIdentifier()
            ))
            .before('css-loader')
        }
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

    if (sassLoaderVersion >= 8) { // check indentedSyntax
      // vue cli 3 and sass-loader 8
      cssTypes.forEach(type => {
        webpackConfig.module.rule('sass').oneOf(type).use('sass-loader').tap(options => {
          if (options.indentedSyntax) {
            if (!options.sassOptions) {
              options.sassOptions = {}
            }
            options.sassOptions.indentedSyntax = true
            delete options.indentedSyntax
          }
          return options
        })
      })
    }

    platformOptions.chainWebpack(webpackConfig, vueOptions, api)
    // define
    webpackConfig
      .plugin('uni-define')
      .use(require.resolve('webpack/lib/DefinePlugin'), [{
        'process.env.UNI_ENV': JSON.stringify(process.env.UNI_PLATFORM),
        'process.env.UNI_CLOUD_PROVIDER': process.env.UNI_CLOUD_PROVIDER,
        'process.env.HBX_USER_TOKEN': JSON.stringify(process.env.HBX_USER_TOKEN || '')
      }])

    if (runByHBuilderX) { // 由 HBuilderX 运行时，移除进度，错误
      webpackConfig.plugins.delete('progress')
      webpackConfig.plugins.delete('friendly-errors')
    }
    if (process.env.BUILD_ENV === 'ali-ide') {
      webpackConfig.plugins.delete('progress')
    }
  }
}
