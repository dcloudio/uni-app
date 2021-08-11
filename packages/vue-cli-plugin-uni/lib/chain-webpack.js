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
      scss: 'sass-loader',
      sass: 'sass-loader',
      less: 'less-loader',
      stylus: 'stylus-loader'
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
            .use('uniapp-cache-css')
            .loader('cache-loader')
            .options(api.genCacheConfig(
              'css-loader/' + process.env.UNI_PLATFORM,
              getPartialIdentifier()
            ))
            .before('css-loader')
        }
        langRule.oneOf(type)
          .use('uniapp-preprocss')
          .loader(resolve('packages/webpack-preprocess-loader'))
          .options(cssPreprocessOptions)
          .after('css-loader') // 在 css-loader 之前条件编译一次

        if (loader) { // 在 scss,less,stylus 之前先条件编译一次（似乎没有必要了，保证css-loader处理一次即可，前提是条件编译注释都还存在）
          langRule.oneOf(type)
            .use('uniapp-preprocss-' + lang)
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
    const deferredCreated = process.env.UNI_PLATFORM === 'mp-toutiao' ||
      process.env.UNI_PLATFORM === 'quickapp-webview'
    const defines = {
      // UNI_ENV好像没用
      __UNI_FEATURE_PROMISE__: JSON.stringify(false),
      'process.env.UNI_ENV': JSON.stringify(process.env.UNI_PLATFORM),
      'process.env.UNI_APP_ID': JSON.stringify(process.env.UNI_APP_ID),
      'process.env.UNI_APP_NAME': JSON.stringify(process.env.UNI_APP_NAME),
      'process.env.UNI_PLATFORM': JSON.stringify(process.env.UNI_PLATFORM),
      'process.env.UNI_CLOUD_PROVIDER': process.env.UNI_CLOUD_PROVIDER,
      'process.env.UNICLOUD_DEBUG': process.env.UNICLOUD_DEBUG,
      'process.env.RUN_BY_HBUILDERX': process.env.RUN_BY_HBUILDERX,
      'process.env.UNI_AUTOMATOR_WS_ENDPOINT': JSON.stringify(process.env.UNI_AUTOMATOR_WS_ENDPOINT)
    }
    if (process.env.UNI_USING_VUE3) {
      Object.assign(defines, {
        __UNI_WX_API__: JSON.stringify(process.env.UNI_USING_WX_API === 'true'),
        __UNI_WXS_API__: JSON.stringify(process.env.UNI_USING_WXS_API === 'true'),
        __UNI_PROMISE_API__: JSON.stringify(process.env.UNI_USING_PROMISE_API === 'true'),
        __VUE_OPTIONS_API__: JSON.stringify(process.env.UNI_USING_VUE3_OPTIONS_API === 'true'),
        __VUE_CREATED_DEFERRED__: JSON.stringify(deferredCreated),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
      })
    }
    if (process.env.UNI_PLATFORM === 'h5') {
      // TODO manifest.json
      defines.__UNI_ROUTER_MODE__ = JSON.stringify('hash')
    }

    webpackConfig
      .plugin('uni-define')
      .use(require.resolve('webpack/lib/DefinePlugin'), [defines])

    if (runByHBuilderX) { // 由 HBuilderX 运行时，移除进度，错误
      webpackConfig.plugins.delete('progress')
      webpackConfig.plugins.delete('friendly-errors')
    } else {
      webpackConfig.plugin('friendly-errors')
        .tap(args => {
          if (global.__error_reporting__) {
            args[0].onErrors = function (severity, errors) {
              if (severity !== 'error') {
                return
              }
              const error = errors[0]
              global.__error_reporting__ && global.__error_reporting__(error.name, error.message || '')
            }
          }
          return args
        })
    }
    if (process.env.BUILD_ENV === 'ali-ide') {
      webpackConfig.plugins.delete('progress')
    }
  }
}
