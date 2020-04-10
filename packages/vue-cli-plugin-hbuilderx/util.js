const path = require('path')

const {
  normalizePath,
  isInHBuilderX
} = require('@dcloudio/uni-cli-shared/lib/util')

let sourceRoot = false

function devtoolModuleFilenameTemplate (info) {
  if (!sourceRoot) {
    if (isInHBuilderX) {
      sourceRoot = normalizePath(process.env.UNI_INPUT_DIR)
    } else {
      sourceRoot = normalizePath(process.env.UNI_CLI_CONTEXT)
    }
  }
  let filePath = false
  const absoluteResourcePath = normalizePath(info.absoluteResourcePath)
  if (
    absoluteResourcePath.indexOf(sourceRoot) !== -1 &&
    (
      absoluteResourcePath.endsWith('.js') ||
      absoluteResourcePath.endsWith('.ts')
    )
  ) {
    filePath = normalizePath(path.relative(sourceRoot, absoluteResourcePath))
    if (
      filePath.indexOf('node_modules/@dcloudio') === 0 ||
      filePath.indexOf('node_modules/vue-loader') === 0 ||
      filePath.indexOf('node_modules/webpack') === 0
    ) {
      filePath = false
    }
  } else if (
    !info.moduleId &&
    (
      absoluteResourcePath.endsWith('.vue') ||
      absoluteResourcePath.endsWith('.nvue')
    )
  ) {
    if (
      absoluteResourcePath.indexOf('src') !== 0 &&
      absoluteResourcePath.indexOf('node-modules') !== 0
    ) {
      filePath = normalizePath(path.relative(sourceRoot, absoluteResourcePath))
    } else {
      filePath = absoluteResourcePath
    }
  }
  if (
    filePath &&
    filePath !== 'main.js' &&
    filePath !== 'main.ts' &&
    filePath !== 'src/main.js' &&
    filePath !== 'src/main.ts'
  ) {
    return `uni-app:///${filePath}`
  }
}

module.exports = {
  devtoolModuleFilenameTemplate
}
