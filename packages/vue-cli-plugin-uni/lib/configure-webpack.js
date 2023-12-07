const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CopyWebpackPluginVersion = Number(require('copy-webpack-plugin/package.json').version.split('.')[0])

const merge = require('webpack-merge')

const {
  getPartialIdentifier
} = require('./util')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = function configureWebpack (platformOptions, manifestPlatformOptions, vueOptions, api) {
  const {
    runByHBuilderX, // 使用 HBuilderX 运行
    isInHBuilderX, // 在 HBuilderX 的插件中
    hasModule,
    jsPreprocessOptions,
    htmlPreprocessOptions,
    uts
  } = require('@dcloudio/uni-cli-shared')

  const {
    getPlatformVue
  } = require('@dcloudio/uni-cli-shared/lib/platform')

  const {
    getCopyWebpackPluginOptions
  } = require('./copy-webpack-options')

  function createMatcher (fakeFile) {
    return (rule, i) => {
      const clone = Object.assign({}, rule)
      delete clone.include
      if (webpack.version[0] > 4) {
        const BasicEffectRulePlugin = require('webpack/lib/rules/BasicEffectRulePlugin')
        const BasicMatcherRulePlugin = require('webpack/lib/rules/BasicMatcherRulePlugin')
        const RuleSetCompiler = require('webpack/lib/rules/RuleSetCompiler')
        const UseEffectRulePlugin = require('webpack/lib/rules/UseEffectRulePlugin')
        const ruleSetCompiler = new RuleSetCompiler([
          new BasicMatcherRulePlugin('test', 'resource'),
          new BasicMatcherRulePlugin('include', 'resource'),
          new BasicMatcherRulePlugin('exclude', 'resource', true),
          new BasicMatcherRulePlugin('resource'),
          new BasicMatcherRulePlugin('conditions'),
          new BasicMatcherRulePlugin('resourceQuery'),
          new BasicMatcherRulePlugin('realResource'),
          new BasicMatcherRulePlugin('issuer'),
          new BasicMatcherRulePlugin('compiler'),
          new BasicEffectRulePlugin('type'),
          new BasicEffectRulePlugin('sideEffects'),
          new BasicEffectRulePlugin('parser'),
          new BasicEffectRulePlugin('resolve'),
          new BasicEffectRulePlugin('generator'),
          new UseEffectRulePlugin()
        ])
        const ruleSet = ruleSetCompiler.compile([{
          rules: [clone]
        }])
        const rules = ruleSet.exec({
          resource: fakeFile
        })
        return rules.length > 0 && rule.use
      } else {
        const RuleSet = require('webpack/lib/RuleSet')
        const normalized = RuleSet.normalizeRule(clone, {}, '')
        return (
          !rule.enforce &&
          normalized.resource &&
          normalized.resource(fakeFile)
        )
      }
    }
  }

  function updateJsLoader (rawRules, fakeFile, checkLoaderRegex, loader) {
    const matchRule = rawRules.find(createMatcher(fakeFile))

    const matchUse = matchRule.use

    const matchLoaderUseIndex = matchUse.findIndex(u => {
      return checkLoaderRegex.test(u.loader)
    })

    if (matchLoaderUseIndex < 0) {
      throw new Error(`No matching use for ${fakeFile}`)
    }

    matchUse.push(loader)
  }

  const tsLoaderOptions = require('./util').getTsLoadOptions()

  function updateTsLoader (rawRules, fakeFile, loader) {
    const matchRule = rawRules.find(createMatcher(fakeFile))
    if (matchRule && matchRule.use) {
      if (isInHBuilderX) {
        matchRule.use.forEach(matchUse => {
          if (matchUse.loader.includes('ts-loader')) {
            Object.assign(matchUse.options, tsLoaderOptions)
          }
        })
      }
      matchRule.use.push(loader)
    }
  }

  function removeForkTsCheckerWebpackPlugin (rawPlugins) {
    if (isInHBuilderX && hasModule('fork-ts-checker-webpack-plugin')) {
      const pluginIndex = rawPlugins.findIndex(rawPlugin => rawPlugin.vue && rawPlugin.typescriptVersion)
      if (pluginIndex !== -1) {
        // 移除fork-ts-checker-webpack-plugin
        rawPlugins.splice(pluginIndex, 1)
        // 恢复vue-loader的ts检查
        tsLoaderOptions.transpileOnly = false
      }
    }
  }
  const babelLoaderRe = /^babel-loader|(\/|\\|@)babel-loader/
  const cacheLoaderRe = /^cache-loader|(\/|\\|@)cache-loader/
  return function (webpackConfig) {
    // disable js cache-loader
    const rawRules = webpackConfig.module.rules
    for (let i = rawRules.length - 1; i >= 0; i--) {
      const uses = rawRules[i].use
      if (Array.isArray(uses)) {
        const babelLoader = uses.find(use => babelLoaderRe.test(use.loader))
        if (babelLoader) {
          const options = api.genCacheConfig('babel-loader/' + process.env.UNI_PLATFORM, getPartialIdentifier())
          if (webpack.version[0] > 4) {
            babelLoader.options = babelLoader.options || {}
            Object.assign(babelLoader.options, process.env.UNI_USING_CACHE ? options : {
              cacheDirectory: false
            })
          } else {
            const index = uses.findIndex(use => cacheLoaderRe.test(use.loader))
            if (index >= 0) {
              if (process.env.UNI_USING_CACHE) {
                Object.assign(uses[index].options, options)
              } else {
                uses.splice(index, 1)
              }
            }
          }
        }
      }
    }

    // 如果在 HBuilderX 中
    removeForkTsCheckerWebpackPlugin(webpackConfig.plugins)
    // js preprocess
    updateJsLoader(rawRules, 'foo.js', babelLoaderRe, {
      loader: resolve('packages/webpack-preprocess-loader'),
      options: jsPreprocessOptions
    })
    // ts options and preprocess
    updateTsLoader(rawRules, 'foo.ts', {
      loader: resolve('packages/webpack-preprocess-loader'),
      options: jsPreprocessOptions
    })
    updateTsLoader(rawRules, 'foo.tsx', {
      loader: resolve('packages/webpack-preprocess-loader'),
      options: jsPreprocessOptions
    })

    let platformWebpackConfig = platformOptions.webpackConfig
    if (typeof platformWebpackConfig === 'function') {
      platformWebpackConfig = platformWebpackConfig(webpackConfig, vueOptions, api)
    }
    // 移除 node_modules 目录，避免受路径上的 node_modules 影响
    if (require('@dcloudio/uni-cli-shared/lib/util').isInHBuilderX) {
      webpackConfig.resolve.modules = webpackConfig.resolve.modules.filter(module => module !== 'node_modules')
    }

    const plugins = []

    const isAppView = process.env.UNI_PLATFORM === 'app-plus' &&
      vueOptions.pluginOptions &&
      vueOptions.pluginOptions['uni-app-plus'] &&
      vueOptions.pluginOptions['uni-app-plus'].view

    if (!isAppView) { // app-plus view不需要copy
      const patterns = getCopyWebpackPluginOptions(manifestPlatformOptions, vueOptions)
      plugins.push(new CopyWebpackPlugin(CopyWebpackPluginVersion > 5 ? {
        patterns
      } : patterns))

      const uniExtApis = require('@dcloudio/uni-cli-shared/lib/uts/uni_modules')
        .parseUniExtApis(false, process.env.UNI_UTS_PLATFORM, 'javascript')
      const keys = Object.keys(uniExtApis)
      if (keys.length) {
        const provides = {}
        keys.forEach(name => {
          const provide = uniExtApis[name]
          if (Array.isArray(provide) && provide.length === 3) {
            provide.pop()
          }
          provides[name] = provide
        })
        plugins.push(new webpack.ProvidePlugin(provides))
      }
    }
    if (!process.env.UNI_SUBPACKGE || !process.env.UNI_MP_PLUGIN) {
      try {
        const automatorJson = require.resolve('@dcloudio/uni-automator/dist/automator.json')
        const patterns = [{
          from: automatorJson,
          to: '../.automator/' + (process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM) +
            '/.automator.json',
          transform (content) {
            if (process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
              return JSON.stringify({
                version: require('@dcloudio/uni-automator/package.json').version,
                wsEndpoint: process.env.UNI_AUTOMATOR_WS_ENDPOINT
              })
            }
            return ''
          }
        }]
        plugins.push(new CopyWebpackPlugin(CopyWebpackPluginVersion > 5 ? {
          patterns
        } : patterns))
      } catch (e) {}
    }

    if (process.UNI_SCRIPT_ENV && Object.keys(process.UNI_SCRIPT_ENV).length) {
      // custom define
      const envs = Object.create(null)
      Object.keys(process.UNI_SCRIPT_ENV).forEach(name => {
        envs['process.env.' + name] = JSON.stringify(process.UNI_SCRIPT_ENV[name])
      })
      plugins.push(new webpack.DefinePlugin(envs))
    }

    if (runByHBuilderX) { // 使用 HBuilderX 中运行时，调整错误日志输出
      const WebpackErrorsPlugin = require('../packages/webpack-errors-plugin')
      const onErrors = require('../util/on-errors')
      const onWarnings = require('../util/on-warnings')
      plugins.push(new WebpackErrorsPlugin({
        onErrors,
        onWarnings
      }))
    }

    const rules = [{
      test: path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'),
      use: [{
        loader: 'babel-loader'
      }, {
        loader: '@dcloudio/webpack-uni-pages-loader'
      }],
      type: 'javascript/auto'
    },
    {
      resourceQuery: /vue&type=template/,
      use: [{
        loader: resolve('packages/webpack-preprocess-loader'),
        options: htmlPreprocessOptions
      }]
    }
    ]

    if (!process.env.UNI_USING_COMPONENTS) { // 新版本，在 script-loader 中处理（为了避免 babel generator 移除部分条件编译代码）
      rules.push({
        resourceQuery: /vue&type=script/,
        use: [{
          loader: resolve('packages/webpack-preprocess-loader'),
          options: jsPreprocessOptions
        }]
      })
    }

    if (process.env.NODE_ENV === 'development' || (process.env.NODE_ENV === 'production' && process.env
      .SOURCEMAP === 'true')) {
      const sourceMap = require('@dcloudio/uni-cli-shared/lib/source-map')
      let isAppService = false
      if (
        process.env.UNI_PLATFORM === 'app-plus' &&
        vueOptions.pluginOptions &&
        vueOptions.pluginOptions['uni-app-plus']
      ) {
        isAppService = !!vueOptions.pluginOptions['uni-app-plus'].service
      }

      const useEvalSourceMap = process.env.UNI_PLATFORM === 'h5' || isAppService
      const useSourceMap = process.env.UNI_PLATFORM.indexOf('mp-') === 0 &&
        process.env.UNI_PLATFORM !== 'mp-baidu' &&
        process.env.UNI_PLATFORM !== 'mp-alipay' &&
        process.env.UNI_PLATFORM !== 'quickapp-webview' // 目前 ov 的开发工具支持 eval 模式

      if (process.env.NODE_ENV === 'production') {
        const sourceMapOptions = {
          noSources: true,
          append: false
        }
        if (isInHBuilderX && process.env.SOURCEMAP_PATH) {
          sourceMapOptions.filename = process.env.SOURCEMAP_PATH
        }
        if (useEvalSourceMap || useSourceMap) {
          plugins.push(sourceMap.createSourceMapDevToolPlugin(!sourceMapOptions.filename, sourceMapOptions))
        }
      } else {
        if (useEvalSourceMap) {
          plugins.push(sourceMap.createEvalSourceMapDevToolPlugin())
        } else if (useSourceMap) {
          plugins.push(sourceMap.createSourceMapDevToolPlugin(process.env.UNI_PLATFORM === 'mp-weixin' || process
            .env.UNI_PLATFORM === 'mp-toutiao'))
        }
      }
    }

    try {
      if (process.env.UNI_HBUILDERX_PLUGINS) {
        require(path.resolve(process.env.UNI_HBUILDERX_PLUGINS, 'uni_helpers/lib/bytenode'))
        const {
          W
        } = require(path.resolve(process.env.UNI_HBUILDERX_PLUGINS, 'uni_helpers'))
        plugins.push(new W({
          dir: process.env.UNI_INPUT_DIR
        }))
      }
    } catch (e) {}

    const resolveLoaderAlias = {}
    const modules = ['@vue/cli-plugin-babel', '@vue/cli-service']
    modules.forEach(m => {
      const {
        dependencies
      } = require(`${m}/package.json`)
      Object.keys(dependencies).forEach(key => {
        if (/-loader$/.test(key)) {
          resolveLoaderAlias[key] = require.resolve(key)
        }
      })
    })

    const alias = {
      '@': path.resolve(process.env.UNI_INPUT_DIR),
      './@': path.resolve(process.env
        .UNI_INPUT_DIR), // css中的'@/static/logo.png'会被转换成'./@/static/logo.png'加载
      vue$: getPlatformVue(vueOptions),
      'uni-pages': path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'),
      'uni-stat-config': path.resolve(process.env.UNI_INPUT_DIR, 'pages.json') +
        '?' +
        JSON.stringify({
          type: 'stat'
        }),
      vuex: require.resolve('@dcloudio/vue-cli-plugin-uni/packages/vuex3'),
      '@vue/composition-api': require.resolve('@dcloudio/vue-cli-plugin-uni/packages/@vue/composition-api')
    }

    if (process.env.UNI_PLATFORM.startsWith('mp')) {
      const BabelRuntimeVersions = require('@babel/runtime/package.json').version.split('.')
      if (BabelRuntimeVersions[0] === '7' && Number(BabelRuntimeVersions[1]) >= 18) {
        alias['@babel/runtime/regenerator'] = require.resolve(
          '@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator')
      }
    }

    return merge({
      devtool: false,
      resolve: {
        alias,
        modules: [
          process.env.UNI_INPUT_DIR,
          path.resolve(process.env.UNI_INPUT_DIR, 'node_modules')
        ],
        plugins: [
          new uts.UTSResolverPlugin()
        ]
      },
      module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules
      },
      resolveLoader: {
        alias: resolveLoaderAlias
      },
      plugins,
      performance: {
        assetFilter (assetFilename) {
          return !(/\.map$/.test(assetFilename)) && !(/vendor/.test(assetFilename))
        }
      },
      watchOptions: require('./util').getWatchOptions()
    }, platformWebpackConfig)
  }
}
