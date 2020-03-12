const fs = require('fs')
const path = require('path')

const {
  getPlatformScss,
  getPlatformSass,
  nvueCssPreprocessOptions
} = require('@dcloudio/uni-cli-shared')

const {
  sassLoaderVersion
} = require('@dcloudio/uni-cli-shared/lib/scss')

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

// sass 全局变量
const isSass = fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, 'uni.sass'))
const isScss = fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, 'uni.scss'))
let sassData = isSass ? getPlatformSass() : getPlatformScss()

if (isSass) {
  sassData = `@import "@/uni.sass"`
} else if (isScss) {
  sassData = `${sassData}
  @import "@/uni.scss";`
}

const scssLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: false
  }
}

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: false
  }
}

if (sassLoaderVersion < 8) {
  scssLoader.options.data = sassData
  scssLoader.options.outputStyle = 'nested'

  sassLoader.options.data = sassData
  sassLoader.options.outputStyle = 'nested'
  sassLoader.options.indentedSyntax = true
} else {
  scssLoader.options.prependData = sassData
  scssLoader.options.sassOptions = {
    outputStyle: 'nested'
  }

  sassLoader.options.prependData = sassData
  sassLoader.options.sassOptions = {
    outputStyle: 'nested',
    indentedSyntax: true
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
  oneOf: createOneOf(scssLoader)
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
