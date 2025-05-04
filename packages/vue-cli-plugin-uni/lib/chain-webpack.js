const path = require('path')
const webpack = require('webpack')

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
      const newOptions = urlLoader.options()
      if (webpack.version[0] > 4) {
        if ('limit' in newOptions) {
          webpackConfig.module.rule(staticType).parser({
            dataUrlCondition: {
              maxSize: newOptions.limit
            }
          })
        }
        if (newOptions.fallback && newOptions.fallback.options) {
          const generator = {}
          const options = newOptions.fallback.options
          // const keys = ['publicPath', 'outputPath']
          // keys.forEach(key => {
          //   generator[key] = pathData => {
          //     const outputPath = oldOptions[key](null, pathData.module.request)
          //     const basename = path.basename(outputPath)
          //     return outputPath.substring(0, outputPath.length - basename.length)
          //   }
          // })
          generator.filename = pathData => {
            return options.name(pathData.module.request)
          }
          webpackConfig.module.rule(staticType).set('generator', generator)
        }
      } else {
        webpackConfig.module
          .rule(staticType)
          .use('url-loader')
          .loader(urlLoader.loader)
          .tap(options => Object.assign(options, newOptions))
      }
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
        if (webpack.version[0] > 4) {
          langRule.oneOf(type)
            .use('css-loader')
            .tap(options => {
              options.url = {
                filter: function (url) {
                  return url[0] !== '/'
                }
              }
              return options
            })
          const platformExcludes = ['app-plus', 'h5', 'mp-360']
          const platform = process.env.UNI_PLATFORM
          if (!platformExcludes.includes(platform)) {
            // remove warning https://github.com/vuejs/vue-loader/issues/1742
            langRule.oneOf(type)
              .use('extract-css-loader')
              .tap(options => {
                options.esModule = false
                // 参考 https://github.com/vuejs/vue-cli/commit/b41ed76c5ce54c618587f24b9d14c35cf31a96d4
                // 修复 部分平台 css 内的资源路径不正确，如uni-icons在百度小程序上引用的字体文件路径
                options.publicPath = '/'
                return options
              })
          }
        } else {
          if (langRule.oneOf(type).uses.has('extract-css-loader')) {
            langRule.oneOf(type)
              .use('extract-css-loader')
              .tap(options => {
                // 参考 https://github.com/vuejs/vue-cli/commit/b41ed76c5ce54c618587f24b9d14c35cf31a96d4
                // 修复 部分平台 css 内的资源路径不正确，如uni-icons在百度小程序上引用的字体文件路径
                if (options) options.publicPath = '/'
                return options
              })
          }
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

    platformOptions.chainWebpack(webpackConfig, vueOptions, api)
    // define
    const deferredCreated = process.env.UNI_PLATFORM === 'mp-toutiao' ||
      process.env.UNI_PLATFORM === 'quickapp-webview' ||
      process.env.UNI_PLATFORM === 'mp-harmony'
    const defines = {
      // UNI_ENV好像没用
      __UNI_FEATURE_PROMISE__: JSON.stringify(false),
      'process.env.UNI_ENV': JSON.stringify(process.env.UNI_PLATFORM),
      'process.env.UNI_APP_ID': JSON.stringify(process.env.UNI_APP_ID),
      'process.env.UNI_APP_NAME': JSON.stringify(process.env.UNI_APP_NAME),
      'process.env.UNI_PLATFORM': JSON.stringify(process.env.UNI_PLATFORM),
      'process.env.UNI_SUB_PLATFORM': JSON.stringify(process.env.UNI_SUB_PLATFORM),
      'process.env.UNI_CLOUD_PROVIDER': process.env.UNI_CLOUD_PROVIDER,
      'process.env.UNI_SECURE_NETWORK_ENABLE': process.env.UNI_SECURE_NETWORK_ENABLE,
      'process.env.UNI_SECURE_NETWORK_CONFIG': process.env.UNI_SECURE_NETWORK_CONFIG || '[]',
      'process.env.UNICLOUD_DEBUG': process.env.UNICLOUD_DEBUG,
      'process.env.RUN_BY_HBUILDERX': process.env.RUN_BY_HBUILDERX,
      'process.env.UNI_AUTOMATOR_WS_ENDPOINT': JSON.stringify(process.env.UNI_AUTOMATOR_WS_ENDPOINT),
      'process.env.UNI_STATISTICS_CONFIG': process.env.UNI_STATISTICS_CONFIG,
      'process.env.UNI_STAT_UNI_CLOUD': process.env.UNI_STAT_UNI_CLOUD,
      'process.env.UNI_STAT_DEBUG': process.env.UNI_STAT_DEBUG,
      'process.env.UNI_COMPILER_VERSION': JSON.stringify(process.env.UNI_COMPILER_VERSION),
      'process.env.UNI_APP_VERSION_NAME': JSON.stringify(process.env.UNI_APP_VERSION_NAME),
      'process.env.UNI_APP_VERSION_CODE': JSON.stringify(process.env.UNI_APP_VERSION_CODE),
      __UNI_SOCKET_HOSTS__: JSON.stringify(process.env.UNI_SOCKET_HOSTS || ''),
      __UNI_SOCKET_PORT__: JSON.stringify(process.env.UNI_SOCKET_PORT || ''),
      __UNI_SOCKET_ID__: JSON.stringify(process.env.UNI_SOCKET_ID || ''),
      __UNI_CONSOLE_KEEP_ORIGINAL__: JSON.stringify(
        !(process.env.UNI_PLATFORM === 'mp-harmony' ||
        process.env.UNI_PLATFORM === 'app-harmony')
      )
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

    if (process.env.UNI_CLOUD_PROVIDER && process.env.NODE_ENV !== 'development') {
      webpackConfig.optimization.minimizer('terser').tap((args) => {
        // reduce_vars 优化常量
        args[0].terserOptions.compress.reduce_vars = true
        return args
      })
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

    // webpack4 support import mjs
    if (webpack.version[0] < 5) {
      webpackConfig.module
        .rule('mjs')
        .test(/.mjs$/)
        .type('javascript/auto')
    }

    webpackConfig.resolve.alias
      .delete('@')
      .set(
        '@/pages.json',
        path.resolve(process.env.UNI_INPUT_DIR, 'pages.json') +
        '?' + JSON.stringify({
          type: 'origin-pages-json'
        })
      )
      .set('@', path.resolve(process.env.UNI_INPUT_DIR))
  }
}
