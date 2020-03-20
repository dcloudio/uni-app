const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const RuleSet = require('webpack/lib/RuleSet')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const merge = require('webpack-merge')

const {
  getPartialIdentifier
} = require('./util')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

function resolveModule (dir) {
  return path.resolve(__dirname, '../../..', dir)
}

module.exports = function configureWebpack (platformOptions, manifestPlatformOptions, vueOptions, api) {
  const {
    runByHBuilderX, // 使用 HBuilderX 运行
    isInHBuilderX, // 在 HBuilderX 的插件中
    hasModule,
    getPlatformVue,
    jsPreprocessOptions,
    htmlPreprocessOptions
  } = require('@dcloudio/uni-cli-shared')

  const {
    getCopyWebpackPluginOptions
  } = require('./copy-webpack-options')

  function createMatcher (fakeFile) {
    return (rule, i) => {
      const clone = Object.assign({}, rule)
      delete clone.include
      const normalized = RuleSet.normalizeRule(clone, {}, '')
      return (
        !rule.enforce &&
        normalized.resource &&
        normalized.resource(fakeFile)
      )
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

  const userTsConfigJson = path.resolve(process.env.UNI_INPUT_DIR, 'tsconfig.json')
  const defaultTsConfigJson = path.resolve(process.env.UNI_CLI_CONTEXT, 'tsconfig.json')

  const tsConfigJsonFile = fs.existsSync(userTsConfigJson) ? userTsConfigJson : defaultTsConfigJson

  const tsLoaderOptions = {
    context: process.env.UNI_INPUT_DIR,
    configFile: tsConfigJsonFile,
    transpileOnly: false,
    compilerOptions: {
      baseUrl: process.env.UNI_INPUT_DIR,
      typeRoots: [resolveModule('@dcloudio/types'), resolveModule('@types')],
      types: [
        'uni-app',
        'webpack-env'
      ],
      paths: {
        '@/*': [
          path.join(process.env.UNI_INPUT_DIR, '*')
        ],
        'vue': [
          resolveModule('vue')
        ],
        'vuex': [
          resolveModule('vuex')
        ],
        'vue-class-component': [
          resolveModule('vue-class-component')
        ],
        'vue-property-decorator': [
          resolveModule('vue-property-decorator')
        ],
        'tslib': [
          resolveModule('tslib')
        ],
        'mpvue-page-factory': [
          resolveModule('@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory')
        ]
      }
    },
    errorFormatter (error, colors) {
      const messageColor = error.severity === 'warning' ? colors.bold.yellow : colors.bold.red
      const filePath = path.relative(process.env.UNI_INPUT_DIR, error.file).replace('.vue.ts', '.vue')
      if (error.code === 2307 && error.content.includes('.vue')) {
        error.content = error.content.replace('Cannot find module ', '') +
          ` script 节点必须使用 lang="ts",文档参考地址:https://uniapp.dcloud.io/frame?id=vue-ts`
      }
      return messageColor(
        `[tsl] ERROR at ${filePath}:${error.line}
  TS${error.code}:${error.content}`
      )
    }
  }

  function updateTsLoader (rawRules, fakeFile, loader) {
    const matchRule = rawRules.find(createMatcher(fakeFile))
    if (matchRule && matchRule.use) {
      if (runByHBuilderX) {
        matchRule.use.forEach(matchUse => {
          if (matchUse.loader === 'ts-loader') {
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
      if (pluginIndex !== -1) { // 移除fork-ts-checker-webpack-plugin
        rawPlugins.splice(pluginIndex, 1)
      }
    }
  }
  const babelLoaderRe = /^babel-loader|(\/|\\)babel-loader/
  const cacheLoaderRe = /^cache-loader|(\/|\\)cache-loader/
  return function (webpackConfig) {
    // disable js cache-loader
    const rawRules = webpackConfig.module.rules
    for (let i = rawRules.length - 1; i >= 0; i--) {
      const uses = rawRules[i].use
      if (Array.isArray(uses)) {
        if (uses.find(use => babelLoaderRe.test(use.loader))) {
          const index = uses.findIndex(use => cacheLoaderRe.test(use.loader))
          if (process.env.UNI_USING_CACHE) {
            Object.assign(uses[index].options, api.genCacheConfig(
              'babel-loader/' + process.env.UNI_PLATFORM,
              getPartialIdentifier()
            ))
          } else {
            uses.splice(index, 1)
          }
        }
      }
    }

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
    // 如果在 HBuilderX 中
    removeForkTsCheckerWebpackPlugin(webpackConfig.plugins)

    let platformWebpackConfig = platformOptions.webpackConfig
    if (typeof platformWebpackConfig === 'function') {
      platformWebpackConfig = platformWebpackConfig(webpackConfig, vueOptions, api)
    }
    // 移除 node_modules 目录，避免受路径上的 node_modules 影响
    webpackConfig.resolve.modules = webpackConfig.resolve.modules.filter(module => module !==
      'node_modules')

    const plugins = [
      new CopyWebpackPlugin(getCopyWebpackPluginOptions(manifestPlatformOptions))
    ]

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

    return merge({
      resolve: {
        alias: {
          '@': path.resolve(process.env.UNI_INPUT_DIR),
          './@': path.resolve(process.env.UNI_INPUT_DIR), // css中的'@/static/logo.png'会被转换成'./@/static/logo.png'加载
          'vue$': getPlatformVue(vueOptions),
          'uni-pages': path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'),
          '@dcloudio/uni-stat': require.resolve('@dcloudio/uni-stat'),
          'uni-stat-config': path.resolve(process.env.UNI_INPUT_DIR, 'pages.json') +
            '?' +
            JSON.stringify({
              type: 'stat'
            })
        },
        modules: [
          process.env.UNI_INPUT_DIR,
          path.resolve(process.env.UNI_INPUT_DIR, 'node_modules')
        ]
      },
      module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rules
      },
      plugins,
      performance: {
        assetFilter (assetFilename) {
          return !(/\.map$/.test(assetFilename)) && !(/vendor/.test(assetFilename))
        }
      }
    }, platformWebpackConfig)
  }
}
