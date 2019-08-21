const path = require('path')
const loaderUtils = require('loader-utils')

const {
    parse
} = require(require.resolve('@vue/component-compiler-utils', {
    paths: [require.resolve('vue-loader')]
})) // 确保使用的与 vue-loader 一致

const {
    getPlatformFilterTag
} = require('@dcloudio/uni-cli-shared/lib/platform')

const FILTER_TAG = getPlatformFilterTag()

module.exports = function(source) {
    if (!FILTER_TAG) {
        return source
    }

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

    if (!descriptor.template) {
        return source
    }

    const modules = new Set()

    descriptor.customBlocks.filter(block => {
        if (block.type === FILTER_TAG && block.attrs.module) {
            modules.add(block.attrs.module)
        }
    })

    if (modules.size) {
        descriptor.template.attrs['filter-modules'] = [...modules]
    }
    // delete customBlocks
    descriptor.customBlocks.length = 0

    return source
}
