const fs = require('fs')
const path = require('path')

const {
  sassLoaderVersion
} = require('@dcloudio/uni-cli-shared/lib/scss')

const isWin = /^win/.test(process.platform)

function genTranspileDepRegex (depPath) {
  return new RegExp(isWin
    ? depPath.replace(/\\/g, '\\\\') // double escape for windows style path
    : depPath)
}

module.exports = function initOptions (options) {
  const {
    getPlatformScss,
    getPlatformSass
  } = require('@dcloudio/uni-cli-shared')

  if (!options.transpileDependencies) {
    options.transpileDependencies = []
  }

  // 增加 src/node_modules 解析
  options.transpileDependencies.push(genTranspileDepRegex(path.resolve(process.env.UNI_INPUT_DIR, 'node_modules')))
  options.transpileDependencies.push('@dcloudio/uni-' + process.env.UNI_PLATFORM)
  options.transpileDependencies.push('@dcloudio/uni-stat')

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

  if (!options.css.loaderOptions.postcss.config) {
    options.css.loaderOptions.postcss.config = {}
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

  if (!options.css.loaderOptions.sass.sassOptions) {
    options.css.loaderOptions.sass.sassOptions = {}
  }
  // 指定 outputStyle, 否则 production 模式下会被默认成 compressed
  const outputStyle = options.css.loaderOptions.sass.sassOptions.outputStyle
  if (!outputStyle || outputStyle === 'compressed') {
    options.css.loaderOptions.sass.sassOptions.outputStyle = 'expanded'
  }

  if (sassLoaderVersion < 8) {
    options.css.loaderOptions.sass.data = sassData
  } else {
    options.css.loaderOptions.sass.prependData = sassData
  }

  let userPostcssConfigPath = path.resolve(process.env.UNI_INPUT_DIR, 'postcss.config.js')
  if (fs.existsSync(userPostcssConfigPath)) {
    options.css.loaderOptions.postcss.config.path = userPostcssConfigPath
  } else {
    options.css.loaderOptions.postcss.config.path = path.resolve(process.env.UNI_CLI_CONTEXT, 'postcss.config.js')
  }
}
