const compiler = require('@dcloudio/uni-template-compiler')

// 非 h5 平台禁用，由uni-template-compiler自行实现
const transformAssetUrls = {
  audio: false,
  video: false,
  source: false,
  img: false,
  image: false,
  use: false
}

if (process.env.UNI_PLATFORM === 'h5') {
  Object.assign(transformAssetUrls, {
    'audio': 'src',
    'video': ['src', 'poster'],
    'source': 'src',
    'img': 'src',
    'use': ['xlink:href', 'href'],
    'image': 'src',
    'cover-image': 'src',
    'v-uni-audio': 'src',
    'v-uni-video': ['src', 'poster'],
    'v-uni-image': 'src',
    'v-uni-cover-image': 'src'
  })
}

const defaultOptions = {
  compiler,
  hotReload: false,
  cacheDirectory: false,
  cacheIdentifier: false,
  transformAssetUrls
}

const defaultCompilerOptions = {
  preserveWhitespace: false
}

module.exports = {
  test: [/\.vue$/, /\.nvue$/],
  loader: require.resolve('@dcloudio/vue-cli-plugin-uni/packages/vue-loader'),
  options (options = {}, compilerOptions = {}) {
    return Object.assign({},
      defaultOptions,
      options, {
        compilerOptions: Object.assign({}, defaultCompilerOptions, compilerOptions)
      })
  },
  compiler
}
