const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const {
  getNVueMainEntry,
  nvueJsPreprocessOptions,
  nvueHtmlPreprocessOptions,
  devtoolModuleFilenameTemplate,
  getTemplatePath
} = require('@dcloudio/uni-cli-shared')

const WebpackAppPlusNVuePlugin = require('../packages/webpack-app-plus-nvue-plugin')
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

const provide = {}

if (process.env.UNI_USING_V3 || process.env.UNI_USING_NATIVE) {
  provide['uni.getCurrentSubNVue'] = [path.resolve(__dirname, '../packages/uni-app-plus-nvue/dist/get-current-sub-nvue.js'), 'default']
  provide['uni.requireNativePlugin'] = [path.resolve(__dirname, '../packages/uni-app-plus-nvue/dist/require-native-plugin.js'), 'default']
}

if (!process.env.UNI_USING_V3) {
  if (!process.env.UNI_USING_NATIVE) {
    provide['uni'] = [path.resolve(__dirname, uniPath), 'default']
  }

  if (process.env.UNI_USING_V8) {
    provide['plus'] = [path.resolve(__dirname, uniPath), 'weexPlus']
  }
}

if (
  process.env.UNI_PLATFORM === 'app-plus' &&
  process.env.UNI_USING_V8
) {
  provide['__f__'] = [require.resolve('@dcloudio/vue-cli-plugin-uni/lib/format-log.js'), 'default']
  provide['crypto'] = [require.resolve('@dcloudio/vue-cli-plugin-uni/lib/crypto.js'), 'default']
}

const plugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'VUE_APP_PLATFORM': JSON.stringify(process.env.UNI_PLATFORM)
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

const excludeModuleReg = /node_modules(?!(\/|\\).*(weex).*)/

const rules = [{
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
  ],
  exclude (modulePath) {
    return excludeModuleReg.test(modulePath) && modulePath.indexOf('@dcloudio') === -1
  }
},
{
  test: /\.nvue(\?[^?]+)?$/,
  use: [{
    loader: path.resolve(__dirname, '../packages/vue-loader'),
    options: vueLoaderOptions
  }],
  exclude: excludeModuleReg
},
{
  test: /\.vue(\?[^?]+)?$/,
  use: [{
    loader: path.resolve(__dirname, '../packages/vue-loader'),
    options: vueLoaderOptions
  }],
  exclude: excludeModuleReg
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
}
].concat(cssLoaders)

if (process.env.UNI_USING_NVUE_COMPILER) {
  rules.unshift({
    resourceQuery: function (query) {
      return query.indexOf('vue&type=template') !== -1 && query.indexOf('mpType=page') !== -1
    },
    use: [{
      loader: '@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template'
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

if (process.env.UNI_USING_NATIVE) {
  plugins.push(new WebpackUniMPPlugin())
  const array = [{
    from: path.resolve(process.env.UNI_INPUT_DIR, 'static'),
    to: 'static'
  }]
  if (process.env.UNI_USING_NVUE_COMPILER) {
    array.push({
      from: path.resolve(getTemplatePath(), 'common'),
      to: process.env.UNI_OUTPUT_DIR
    }, {
      from: path.resolve(
        process.env.UNI_HBUILDERX_PLUGINS,
        'weapp-tools/template/common'
      ),
      to: process.env.UNI_OUTPUT_DIR,
      ignore: [
        '*.js',
        '*.json',
        '__uniapppicker.html',
        '__uniappview.html',
        '__uniappmarker@3x.png',
        '__uniappopenlocation.html',
        '__uniapppicker.html'
      ]
    })
  } else {
    let nativeTemplatePath = path.resolve(process.env.UNI_HBUILDERX_PLUGINS, 'weapp-tools/template/v8-native')
    if (!fs.existsSync(nativeTemplatePath)) { // 兼容旧版本
      nativeTemplatePath = path.resolve(
        process.env.UNI_HBUILDERX_PLUGINS,
        'weapp-tools/template/v8'
      )
    }
    array.push({
      from: nativeTemplatePath,
      to: process.env.UNI_OUTPUT_DIR
    }, {
      from: path.resolve(
        process.env.UNI_HBUILDERX_PLUGINS,
        'weapp-tools/template/common'
      ),
      to: process.env.UNI_OUTPUT_DIR,
      ignore: [
        '*.js',
        '*.json',
        '__uniapppicker.html',
        '__uniappview.html'
      ]
    })
  }
  plugins.push(new CopyWebpackPlugin(array))
}

module.exports = function () {
  return {
    target: 'node', // 激活 vue-loader 的 isServer 逻辑
    mode: process.env.NODE_ENV,
    devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
    watch: process.env.NODE_ENV === 'development',
    entry () {
      return process.UNI_NVUE_ENTRY
    },
    externals: {
      'vue': 'Vue'
    },
    performance: {
      hints: false
    },
    optimization: {
      namedModules: false
    },
    output: {
      path: process.env.UNI_OUTPUT_DIR,
      filename: '[name].js',
      devtoolModuleFilenameTemplate
    },
    resolve: {
      extensions: ['.js', '.nvue', '.vue', '.json'],
      alias: {
        '@': process.env.UNI_INPUT_DIR,
        'uni-pages': path.resolve(process.env.UNI_INPUT_DIR, 'pages.json'),
        '@dcloudio/uni-stat': require.resolve('@dcloudio/uni-stat'),
        'uni-app-style': path.resolve(process.env.UNI_INPUT_DIR, getNVueMainEntry()) + '?' + JSON.stringify({
          type: 'appStyle'
        }),
        'uni-stat-config': path.resolve(process.env.UNI_INPUT_DIR, 'pages.json') +
          '?' +
          JSON.stringify({
            type: 'stat'
          })
      },
      modules: [
        'node_modules',
        path.resolve(process.env.UNI_CLI_CONTEXT, 'node_modules'),
        path.resolve(process.env.UNI_INPUT_DIR, 'node_modules')
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
    node: {
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
