const {
  // jsPreprocessOptions,
  nvueCssPreprocessOptions
  // htmlPreprocessOptions
} = require('@dcloudio/uni-cli-shared')

const nvueStyleLoader = {
  loader: '@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style'
}

const preprocessLoader = {
  loader: '@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader',
  options: nvueCssPreprocessOptions
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: false,
    parser: require('postcss-comment'),
    plugins: [
      require('postcss-import'),
      require('@dcloudio/vue-cli-plugin-uni/packages/postcss')
    ]
  }
}

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: false,
    data: ''
  }
}

const lessLoader = {
  loader: 'less-loader',
  options: {
    sourceMap: false
  }
}

const stylusLoader = {
  loader: 'stylus-loader',
  options: {
    sourceMap: false,
    preferPathResolver: 'webpack'
  }
}

function createOneOf (preLoader) {
  const use = [
    nvueStyleLoader,
    preprocessLoader
  ]
  use.push(postcssLoader)
  if (preLoader) {
    use.push(preLoader)
  }
  use.push(preprocessLoader)

  return [{
    resourceQuery: /\?vue/,
    use
  },
  {
    use
  }
  ]
}

module.exports = [{
  test: /\.css$/,
  oneOf: createOneOf()
}, {
  test: /\.scss$/,
  oneOf: createOneOf(sassLoader)
}, {
  test: /\.sass$/,
  oneOf: createOneOf(sassLoader)
}, {
  test: /\.less$/,
  oneOf: createOneOf(lessLoader)
}, {
  test: /\.styl(us)?$/,
  oneOf: createOneOf(stylusLoader)
}]
