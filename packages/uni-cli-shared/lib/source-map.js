const path = require('path')

const webpack = require('webpack')

const {
  normalizePath,
  pathToRegexp,
  isInHBuilderX
} = require('@dcloudio/uni-cli-shared/lib/util')

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
  if (
    info.resourcePath &&
    (
      !info.allLoaders ||
      info.query.includes('type=script&lang=ts') ||
      info.resourcePath.endsWith('.ts')
    )
  ) {
    const filepath = normalizePath(path.relative(getSourceRoot(), info.absoluteResourcePath))
    if (filepath.indexOf('../') === 0) {
      return
    }
    return `uni-app:///${filepath}`
  }
}
const exclude = [/pages\.json/, /node_modules/, /vue&type=template/, /vue&type=style/]

module.exports = {
  createSourceMapDevToolPlugin (filename = false, args) {
    const options = {
      test: [/\.js$/],
      exclude,
      moduleFilenameTemplate,
      ...args
    }
    if (filename) {
      options.filename = '../.sourcemap/' + process.env.UNI_PLATFORM + '/[file].map'
    }
    return new webpack.SourceMapDevToolPlugin(options)
  },
  createEvalSourceMapDevToolPlugin () {
    return new webpack.EvalSourceMapDevToolPlugin({
      test: pathToRegexp(process.env.UNI_INPUT_DIR, { start: true }),
      exclude,
      moduleFilenameTemplate
    })
  }
}
