const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const {
  pathToRegexp
} = require('@dcloudio/uni-cli-shared/lib/util')

module.exports = function initOptions (options) {
  const {
    getPlatformScss,
    getPlatformSass
  } = require('@dcloudio/uni-cli-shared')

  if (!options.transpileDependencies) {
    options.transpileDependencies = []
  }

  // 增加 src/node_modules 解析
  options.transpileDependencies.push(pathToRegexp(path.resolve(process.env.UNI_INPUT_DIR, 'node_modules'), {
    start: true
  }))
  options.transpileDependencies.push('@dcloudio/uni-' + process.env.UNI_PLATFORM)
  options.transpileDependencies.push('@dcloudio/uni-i18n')
  options.transpileDependencies.push('@dcloudio/uni-stat')
  options.transpileDependencies.push('@dcloudio/uni-push')
  options.transpileDependencies.push('@dcloudio/vue-cli-plugin-uni/packages/uni-app')
  options.transpileDependencies.push('@dcloudio/vue-cli-plugin-uni/packages/uni-cloud')
  options.transpileDependencies.push('@dcloudio/vue-cli-plugin-uni/packages/uni-stat')
  options.transpileDependencies.push('@dcloudio/vue-cli-plugin-uni/packages/uni-push')

  if (process.env.UNI_PLATFORM !== 'mp-weixin') { // mp runtime
    options.transpileDependencies.push('@dcloudio/uni-mp-weixin')
  }

  if (process.env.UNI_PLATFORM === 'h5') { // h5 dev 用到了这两个，需要 babel
    options.transpileDependencies.push('ansi-regex')
    options.transpileDependencies.push('strip-ansi')
  }

  if (!options.css) {
    options.css = {}
  }

  if (process.env.UNI_PLATFORM === 'h5' || process.env.UNI_USING_V3) {
    options.css.extract = false
  } else {
    options.css.extract = true
  }

  if (!options.css.loaderOptions) {
    options.css.loaderOptions = {}
  }
  if (!options.css.loaderOptions.postcss) {
    options.css.loaderOptions.postcss = {}
  }
  if (!options.css.loaderOptions.sass) {
    options.css.loaderOptions.sass = {}
  }

  if (webpack.version[0] > 4) {
    if (!options.css.loaderOptions.postcss.postcssOptions) {
      options.css.loaderOptions.postcss.postcssOptions = {}
    }
  } else {
    if (!options.css.loaderOptions.postcss.config) {
      options.css.loaderOptions.postcss.config = {}
    }
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

  if (!options.css.loaderOptions.sass.sassOptions) {
    options.css.loaderOptions.sass.sassOptions = {}
  }
  // 指定 outputStyle, 否则 production 模式下会被默认成 compressed
  const outputStyle = options.css.loaderOptions.sass.sassOptions.outputStyle
  if (!outputStyle || outputStyle === 'compressed') {
    options.css.loaderOptions.sass.sassOptions.outputStyle = 'expanded'
  }
  options.css.loaderOptions.sass.prependData = sassData
  const userPostcssConfigPath = path.resolve(process.env.UNI_INPUT_DIR, 'postcss.config.js')
  const configPath = fs.existsSync(userPostcssConfigPath) ? userPostcssConfigPath : path.resolve(process.env
    .UNI_CLI_CONTEXT, 'postcss.config.js')
  if (webpack.version[0] > 4) {
    options.css.loaderOptions.postcss.postcssOptions.config = configPath
  } else {
    options.css.loaderOptions.postcss.config.path = configPath
  }
}
