const path = require('path')
const loaderUtils = require('loader-utils')

const {
  parse
} = require(require.resolve('@vue/component-compiler-utils', {
  paths: [require.resolve('vue-loader')]
})) // 确保使用的与 vue-loader 一致

const {
  getPlatformFilterTag,
  normalizeNodeModules
} = require('@dcloudio/uni-cli-shared/lib/platform')

const FILTER_TAG = getPlatformFilterTag()

module.exports = function(source) {

  const loaderContext = this

  const {
    sourceMap,
    rootContext,
    resourcePath
  } = loaderContext

  const options = loaderUtils.getOptions(loaderContext) || {}

  const filename = path.basename(resourcePath)
  const context = rootContext || process.cwd()
  const sourceRoot = path.dirname(path.relative(context, resourcePath))
  // 使用 @vue/component-compiler-utils 来处理，共用 cache
  const descriptor = parse({
    source,
    compiler: options.compiler,
    filename,
    sourceRoot,
    needMap: sourceMap
  })

  if (!descriptor.template || !FILTER_TAG) {
    // delete customBlocks
    descriptor.customBlocks.length = 0
    return source
  }

  const modules = Object.create(null)

  descriptor.customBlocks = descriptor.customBlocks.filter(block => {
    if (block.type === FILTER_TAG && block.attrs.module) {
      modules[block.attrs.module] = block
      return true
    }
  })

  if (Object.keys(modules)) {
    const filterModules = JSON.parse(JSON.stringify(modules))
    Object.keys(filterModules).forEach(name => {
      const filterModule = filterModules[name]
      if (filterModule.attrs.src) {
        filterModule.attrs.src = normalizeNodeModules(filterModule.attrs.src)
      }
    })
    descriptor.template.attrs['filter-modules'] = JSON.stringify(filterModules)
  }

  return source
}
