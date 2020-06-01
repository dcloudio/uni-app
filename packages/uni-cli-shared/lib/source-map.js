const path = require('path')

const webpack = require('webpack')

const {
  normalizePath,
  isInHBuilderX
} = require('@dcloudio/uni-cli-shared/lib/util')

const isWin = /^win/.test(process.platform)

function genTranspileDepRegex (depPath) {
  return new RegExp(isWin
    ? depPath.replace(/\\/g, '\\\\') // double escape for windows style path
    : depPath)
}
let sourceRoot = false

function getSourceRoot () {
  if (!sourceRoot) {
    if (isInHBuilderX) {
      sourceRoot = normalizePath(process.env.UNI_INPUT_DIR)
    } else {
      sourceRoot = normalizePath(process.env.UNI_CLI_CONTEXT)
    }
  }
  return sourceRoot
}

function moduleFilenameTemplate (info) {
  if (!info.allLoaders && info.resourcePath) {
    const filepath = normalizePath(path.relative(getSourceRoot(), info.absoluteResourcePath))
    if (filepath.indexOf('../') === 0) {
      return
    }
    return `uni-app:///${filepath}`
  }
}
const exclude = [/pages\.json/, /node_modules/, /vue&type=template/, /vue&type=style/]

module.exports = {
  createSourceMapDevToolPlugin (filename = false) {
    const options = {
      test: [/\.js$/],
      exclude,
      moduleFilenameTemplate
    }
    if (filename) {
      options.filename = '../.sourcemap/' + process.env.UNI_PLATFORM + '/[name].js.map'
    }
    return new webpack.SourceMapDevToolPlugin(options)
  },
  createEvalSourceMapDevToolPlugin () {
    return new webpack.EvalSourceMapDevToolPlugin({
      test: genTranspileDepRegex(process.env.UNI_INPUT_DIR),
      exclude,
      moduleFilenameTemplate
    })
  }
}
