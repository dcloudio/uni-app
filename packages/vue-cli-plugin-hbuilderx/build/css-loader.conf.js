const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const {
  getPlatformScss,
  getPlatformSass,
  nvueCssPreprocessOptions
} = require('@dcloudio/uni-cli-shared')

const nvueStyleLoader = {
  loader: '@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style'
}

const preprocessLoader = {
  loader: '@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader',
  options: nvueCssPreprocessOptions
}

const options = {
  sourceMap: false
}
const plugins = [
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
if (webpack.version[0] > 4) {
  options.postcssOptions = {
    plugins
  }
} else {
  options.parser = require('postcss-comment')
  options.plugins = plugins
}
const postcssLoader = {
  loader: 'postcss-loader',
  options
}

// sass 全局变量
const isSass = fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, 'uni.sass'))
const isScss = fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, 'uni.scss'))
let sassData = isSass ? getPlatformSass() : getPlatformScss()

if (process.env.UNI_SASS_IMPLEMENTATION_NAME === 'dart-sass') {
  if (isSass) {
    sassData = '@use "@/uni.sass" as *'
  } else if (isScss) {
    sassData = '@use "@/uni.scss" as *;'
  }
} else {
  if (isSass) {
    sassData = '@import "@/uni.sass"'
  } else if (isScss) {
    sassData = `${sassData}
    @import "@/uni.scss";`
  }
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

scssLoader.options.prependData = sassData
scssLoader.options.sassOptions = {
  outputStyle: 'expanded'
}

sassLoader.options.prependData = sassData
sassLoader.options.sassOptions = {
  outputStyle: 'expanded',
  indentedSyntax: true
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
