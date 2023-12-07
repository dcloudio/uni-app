const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CopyWebpackPluginVersion = Number(require('copy-webpack-plugin/package.json').version.split('.')[0])
const TerserPlugin = require('terser-webpack-plugin')

const {
  getNVueMainEntry,
  nvueJsPreprocessOptions,
  nvueHtmlPreprocessOptions,
  getTemplatePath,
  uts
} = require('@dcloudio/uni-cli-shared')
const fileLoader = require('@dcloudio/uni-cli-shared/lib/file-loader')
const {
  compileI18nJsonStr
} = require('@dcloudio/uni-i18n')
const {
  initI18nOptions
} = require('@dcloudio/uni-cli-shared/lib/i18n')
const WebpackAppPlusNVuePlugin = process.env.UNI_USING_V3
  ? require('../packages/webpack-app-plus-plugin')
  : require('../packages/webpack-app-plus-nvue-plugin')

const WebpackErrorsPlugin = require('@dcloudio/vue-cli-plugin-uni/packages/webpack-errors-plugin')
const WebpackUniMPPlugin = require('@dcloudio/webpack-uni-mp-loader/lib/plugin/index-new')

const onErrors = require('@dcloudio/vue-cli-plugin-uni/util/on-errors')
const onWarnings = require('@dcloudio/vue-cli-plugin-uni/util/on-warnings')

const cssLoaders = require('./css-loader.conf')
const vueLoaderOptions = require('./vue-loader.conf')

const jsPreprocessorLoader = {
  loader: '@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader',
  options: nvueJsPreprocessOptions
}

const htmlPreprocessorLoader = {
  loader: '@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader',
  options: nvueHtmlPreprocessOptions
}

const uniPath = process.env.UNI_USING_V8
  ? '../packages/uni-app-plus-nvue-v8/dist/index.js'
  : '../packages/uni-app-plus-nvue/dist/index.js'

const uniCloudPath = require.resolve('@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js')

const provide = {
  uniCloud: [uniCloudPath, 'default']
}

if (
  process.env.UNI_USING_V3 ||
  process.env.UNI_USING_NATIVE ||
  process.env.UNI_USING_V3_NATIVE
) {
  provide['uni.getCurrentSubNVue'] = [path.resolve(__dirname,
    '../packages/uni-app-plus-nvue/dist/get-current-sub-nvue.js'), 'default']
  provide['uni.requireNativePlugin'] = [path.resolve(__dirname,
    '../packages/uni-app-plus-nvue/dist/require-native-plugin.js'), 'default']
}

if (!process.env.UNI_USING_V3 && !process.env.UNI_USING_V3_NATIVE) {
  if (!process.env.UNI_USING_NATIVE) {
    provide.uni = [path.resolve(__dirname, uniPath), 'default']
  }

  if (process.env.UNI_USING_V8) {
    provide.plus = [path.resolve(__dirname, uniPath), 'weexPlus']
  }
}

if (
  process.env.UNI_PLATFORM === 'app-plus' &&
  process.env.UNI_USING_V8
) {
  provide.__f__ = [require.resolve('@dcloudio/vue-cli-plugin-uni/lib/format-log.js'), 'default']
  provide.crypto = [require.resolve('@dcloudio/vue-cli-plugin-uni/lib/crypto.js'), 'default']
}

const plugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      UNI_APP_ID: JSON.stringify(process.env.UNI_APP_ID),
      UNI_APP_NAME: JSON.stringify(process.env.UNI_APP_NAME),
      UNI_PLATFORM: JSON.stringify(process.env.UNI_PLATFORM),
      VUE_APP_PLATFORM: JSON.stringify(process.env.UNI_PLATFORM),
      UNI_CLOUD_PROVIDER: process.env.UNI_CLOUD_PROVIDER,
      UNI_SECURE_NETWORK_ENABLE: process.env.UNI_SECURE_NETWORK_ENABLE,
      UNI_SECURE_NETWORK_CONFIG: process.env.UNI_SECURE_NETWORK_CONFIG || '[]',
      UNICLOUD_DEBUG: process.env.UNICLOUD_DEBUG,
      RUN_BY_HBUILDERX: process.env.RUN_BY_HBUILDERX,
      UNI_AUTOMATOR_WS_ENDPOINT: JSON.stringify(process.env.UNI_AUTOMATOR_WS_ENDPOINT),
      UNI_STAT_UNI_CLOUD: process.env.UNI_STAT_UNI_CLOUD || '""',
      UNI_STATISTICS_CONFIG: process.env.UNI_STATISTICS_CONFIG || '""',
      UNI_STAT_DEBUG: process.env.UNI_STAT_DEBUG || '""',
      UNI_COMPILER_VERSION: JSON.stringify(process.env.UNI_COMPILER_VERSION),
      VUE_APP_DARK_MODE: JSON.stringify(process.env.VUE_APP_DARK_MODE || false)
    }
  }),
  new webpack.BannerPlugin({
    banner: '"use weex:vue";',
    raw: true,
    exclude: 'Vue'
  }),
  new webpack.ProvidePlugin(provide),
  new WebpackErrorsPlugin({
    onErrors,
    onWarnings
  }),
  new WebpackAppPlusNVuePlugin()
]

if (process.env.NODE_ENV === 'development') {
  plugins.push(require('@dcloudio/uni-cli-shared/lib/source-map').createEvalSourceMapDevToolPlugin())
}

// const excludeModuleReg = /node_modules(?!(\/|\\).*(weex).*)/

const rules = [webpack.version[0] > 4 ? {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
  type: 'asset'
} : {
  test: /\.(png|jpg|gif|ttf|eot|woff|woff2)$/i,
  use: [fileLoader]
}, {
  test: path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'),
  use: [{
    loader: '@dcloudio/webpack-uni-pages-loader'
  }],
  type: 'javascript/auto'
}, {
  test: path.resolve(process.env.UNI_INPUT_DIR, getNVueMainEntry()),
  use: [{
    loader: '@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/main'
  }]
}, {
  test: /\.js$/,
  use: [{
    loader: 'babel-loader',
    options: {
      babelrc: false
    }
  },
  jsPreprocessorLoader
  ]
  // exclude (modulePath) { // nvue js均提供babel，否则还得提供transpileDependencies配置
  //   return excludeModuleReg.test(modulePath) && modulePath.indexOf('@dcloudio') === -1
  // }
},
{
  test: [/\.nvue(\?[^?]+)?$/, /\.vue(\?[^?]+)?$/],
  use: [{
    loader: require.resolve('@dcloudio/vue-cli-plugin-uni/packages/vue-loader'),
    options: vueLoaderOptions
  }]
},
{
  test: /\.pug$/,
  oneOf: [{
    resourceQuery: /vue/,
    use: [{
      loader: 'pug-plain-loader'
    }]
  },
  {
    use: [{
      loader: 'raw-loader'
    }, {
      loader: 'pug-plain-loader'
    }]
  }
  ]
},
{
  resourceQuery: /vue&type=template/,
  use: [htmlPreprocessorLoader]
},
{
  type: 'javascript/auto',
  resourceQuery: /uts-proxy/,
  use: [{
    loader: require.resolve('@dcloudio/uni-cli-shared/lib/uts/uts-loader.js')
  }]
}
].concat(cssLoaders)

if (process.env.UNI_USING_NVUE_COMPILER || process.env.UNI_USING_V3_NATIVE) {
  rules.unshift({
    resourceQuery: function (query) {
      return query.indexOf('vue&type=template') !== -1 && query.indexOf('mpType=page') !== -1
    },
    use: [{
      loader: '@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template'
    }, {
      loader: '@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta'
    }]
  })
}
rules.unshift({
  resourceQuery: function (query) {
    return query.indexOf('vue&type=template') !== -1 && query.indexOf('mpType=page') === -1
  },
  use: [{
    loader: '@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.recycle'
  }]
})

if (process.env.UNI_USING_V3_NATIVE) {
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

if (process.env.UNI_USING_NATIVE || process.env.UNI_USING_V3_NATIVE) {
  plugins.push(new WebpackUniMPPlugin())
  const assetsDir = 'static'
  const hybridDir = 'hybrid/html'
  const patterns = [{
    from: path.resolve(process.env.UNI_INPUT_DIR, assetsDir),
    to: assetsDir
  }]
  // 自动化测试时，不启用androidPrivacy.json
  if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
    const fileName = 'androidPrivacy.json'
    const context = path.resolve(process.env.UNI_INPUT_DIR)
    if (fs.existsSync(path.join(context, fileName))) {
      patterns.push({
        from: fileName,
        context,
        to: fileName,
        transform (content) {
          const options = initI18nOptions(
            process.env.UNI_PLATFORM,
            process.env.UNI_INPUT_DIR,
            false,
            true
          )
          if (!options) {
            return content
          }
          return compileI18nJsonStr(content.toString(), options)
        }
      })
    }
  }
  const hybridHtmlPath = path.resolve(process.env.UNI_INPUT_DIR, hybridDir)
  if (fs.existsSync(hybridHtmlPath)) {
    patterns.push({
      from: hybridHtmlPath,
      to: hybridDir
    })
  }

  global.uniModules.forEach(module => {
    const modules = 'uni_modules/'
    const assets = modules + module + '/' + assetsDir
    const assetsPath = path.resolve(process.env.UNI_INPUT_DIR, assets)
    if (fs.existsSync(assetsPath)) {
      patterns.push({
        from: assetsPath,
        to: assets
      })
    }
    const hybridHtml = modules + module + '/' + hybridDir
    const hybridHtmlPath = path.resolve(process.env.UNI_INPUT_DIR, hybridHtml)
    if (fs.existsSync(hybridHtmlPath)) {
      patterns.push({
        from: hybridHtmlPath,
        to: hybridHtml
      })
    }
  })

  if (process.env.UNI_USING_NVUE_COMPILER) {
    patterns.push({
      from: path.resolve(getTemplatePath(), 'common'),
      to: process.env.UNI_OUTPUT_DIR
    })
  } else if (process.env.UNI_USING_V3_NATIVE) {
    patterns.push({
      from: path.resolve(getTemplatePath(), 'weex'),
      to: process.env.UNI_OUTPUT_DIR
    })
  } else {
    let nativeTemplatePath = path.resolve(process.env.UNI_HBUILDERX_PLUGINS, 'weapp-tools/template/v8-native')
    if (!fs.existsSync(nativeTemplatePath)) { // 兼容旧版本
      nativeTemplatePath = path.resolve(
        process.env.UNI_HBUILDERX_PLUGINS,
        'weapp-tools/template/v8'
      )
    }
    patterns.push({
      from: nativeTemplatePath,
      to: process.env.UNI_OUTPUT_DIR
    }, {
      from: path.resolve(
        process.env.UNI_HBUILDERX_PLUGINS,
        'weapp-tools/template/common'
      ),
      to: process.env.UNI_OUTPUT_DIR,
      globOptions: {
        ignore: [
          '*.js',
          '*.json',
          '__uniapppicker.html',
          '__uniappview.html'
        ]
      }
    })
  }
  plugins.push(new CopyWebpackPlugin(CopyWebpackPluginVersion > 5 ? {
    patterns
  } : patterns))
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

rules.push({
  test: /\.ts$/,
  use: [{
    loader: require.resolve('babel-loader', {
      paths: [require.resolve('@vue/cli-plugin-babel')]
    })
  }, {
    loader: require.resolve('ts-loader', {
      paths: [require.resolve('@vue/cli-plugin-babel')]
    }),
    options: Object.assign({
      transpileOnly: false,
      appendTsSuffixTo: ['\\.nvue$', '\\.vue$'],
      happyPackMode: false
    }, require('@dcloudio/vue-cli-plugin-uni/lib/util').getTsLoadOptions())
  }, jsPreprocessorLoader]
})

module.exports = function () {
  return {
    target: 'node', // 激活 vue-loader 的 isServer 逻辑
    mode: process.env.NODE_ENV,
    devtool: false,
    watch: process.env.NODE_ENV === 'development',
    entry () {
      return process.UNI_NVUE_ENTRY
    },
    externals: {
      vue: 'Vue'
    },
    performance: {
      hints: false
    },
    optimization: Object.assign({
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              ascii_only: true
            }
          }
        })
      ]
    }, webpack.version[0] > 4 ? {} : {
      namedModules: false
    }),
    output: {
      path: process.env.UNI_OUTPUT_DIR,
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.nvue', '.vue', '.json'],
      alias: {
        '@/pages.json': path.resolve(process.env.UNI_INPUT_DIR, 'pages.json') + '?' + JSON.stringify({
          type: 'origin-pages-json'
        }),
        '@': process.env.UNI_INPUT_DIR,
        'uni-polyfill': require.resolve('@dcloudio/uni-cli-shared/lib/uni-polyfill.js'),
        'uni-pages': path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'),
        'uni-app-style': path.resolve(process.env.UNI_INPUT_DIR, getNVueMainEntry()) + '?' + JSON.stringify({
          type: 'appStyle'
        }),
        'uni-stat-config': path.resolve(process.env.UNI_INPUT_DIR, 'pages.json') +
          '?' +
          JSON.stringify({
            type: 'stat'
          }),
        '@vue/composition-api': require.resolve('@dcloudio/vue-cli-plugin-uni/packages/@vue/composition-api')
      },
      modules: [
        'node_modules',
        path.resolve(process.env.UNI_CLI_CONTEXT, 'node_modules'),
        path.resolve(process.env.UNI_INPUT_DIR, 'node_modules')
      ],
      plugins: [
        new uts.UTSResolverPlugin()
      ]
    },
    resolveLoader: {
      alias: {
        'babel-loader': require.resolve('babel-loader', {
          paths: [require.resolve('@vue/cli-plugin-babel')]
        })
      }
    },
    module: {
      rules
    },
    plugins,
    stats: {
      reasons: true,
      errorDetails: true
    },
    node: webpack.version[0] > 4 ? false : {
      global: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
      setImmediate: false,
      clearImmediate: false,
      assert: false,
      buffer: false,
      child_process: false,
      cluster: false,
      console: false,
      constants: false,
      crypto: false,
      dgram: false,
      dns: false,
      domain: false,
      events: false,
      fs: false,
      http: false,
      https: false,
      module: false,
      net: false,
      os: false,
      path: false,
      process: false,
      punycode: false,
      querystring: false,
      readline: false,
      repl: false,
      stream: false,
      string_decoder: false,
      sys: false,
      timers: false,
      tls: false,
      tty: false,
      url: false,
      util: false,
      vm: false,
      zlib: false
    }
  }
}
