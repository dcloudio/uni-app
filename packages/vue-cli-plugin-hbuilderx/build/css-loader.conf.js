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
      require('postcss-import')({
        resolve (id, basedir, importOptions) {
          if (id.startsWith('~@/')) {
            return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
          } else if (id.startsWith('@/')) {
            return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
          } else if (id.startsWith('/') && !id.startsWith('//')) {
            return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
          }
          return id
        }
      }),
      require('@dcloudio/vue-cli-plugin-uni/packages/postcss')
    ]
  }
}

// sass 全局变量
const isSass = fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, 'uni.sass'))
const isScss = fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, 'uni.scss'))
let sassData = isSass ? getPlatformSass() : getPlatformScss()

if (isSass) {
  sassData = '@import "@/uni.sass"'
} else if (isScss) {
  sassData = `${sassData}
  @import "@/uni.scss";`
}

const scssLoader = {
  loader: '@dcloudio/vue-cli-plugin-uni/packages/sass-loader',
  options: {
    nvue: true,
    sourceMap: false
  }
}

const sassLoader = {
  loader: '@dcloudio/vue-cli-plugin-uni/packages/sass-loader',
  options: {
    nvue: true,
    sourceMap: false
  }
}

if (sassLoaderVersion < 8) {
  scssLoader.options.data = sassData
  scssLoader.options.outputStyle = 'expanded'

  sassLoader.options.data = sassData
  sassLoader.options.outputStyle = 'expanded'
  sassLoader.options.indentedSyntax = true
} else {
  const name = sassLoaderVersion >= 9 ? 'additionalData' : 'prependData'
  scssLoader.options[name] = sassData
  scssLoader.options.sassOptions = {
    outputStyle: 'expanded'
  }

  sassLoader.options[name] = sassData
  sassLoader.options.sassOptions = {
    outputStyle: 'expanded',
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
