const path = require('path')

const loaderUtils = require('loader-utils')

const {
  removeExt,
  normalizePath,
  getPlatformExts,
  getShadowTemplate
} = require('@dcloudio/uni-cli-shared')

const {
  getJsonFile,
  getWXComponents,
  updateSpecialMethods,
  getGlobalUsingComponents,
  updateGenericComponents, // resolve
  updateComponentGenerics, // define
  updateUsingGlobalComponents
} = require('@dcloudio/uni-cli-shared/lib/cache')

const {
  isBuiltInComponentPath
} = require('@dcloudio/uni-cli-shared/lib/pages')

const {
  getPlatformFilterTag
} = require('@dcloudio/uni-cli-shared/lib/platform')

const {
  normalizeNodeModules
} = require('./shared')

const templateExt = getPlatformExts().template
const filterTagName = getPlatformFilterTag() || ''

function parseFilterModules (filterModules) {
  if (filterModules) {
    return JSON.parse(Buffer.from(filterModules, 'base64').toString('utf8'))
  }
  return {}
}

module.exports = function (content, map) {
  this.cacheable && this.cacheable()

  const vueLoaderOptions = this.loaders.find(loader => loader.ident === 'vue-loader-options')
  if (vueLoaderOptions) {
    const globalUsingComponents = getGlobalUsingComponents()
    const realResourcePath = path.relative(process.env.UNI_INPUT_DIR, this.resourcePath)
    let resourcePath = normalizeNodeModules(removeExt(realResourcePath) + templateExt)

    if ( // windows 上 page-meta, navigation-bar 可能在不同盘上
      /^win/.test(process.platform) &&
      path.isAbsolute(resourcePath) &&
      isBuiltInComponentPath(resourcePath)
    ) {
      resourcePath = normalizePath(path.relative(process.env.UNI_CLI_CONTEXT, resourcePath))
    }

    const wxComponents = getWXComponents(resourcePath.replace(path.extname(resourcePath), ''))

    const params = loaderUtils.parseQuery(this.resourceQuery)
    /* eslint-disable no-mixed-operators */
    const filterModules = parseFilterModules(params && params['filter-modules'])
    Object.assign(vueLoaderOptions.options.compilerOptions, {
      mp: {
        platform: process.env.UNI_PLATFORM,
        scopedSlotsCompiler: process.env.SCOPED_SLOTS_COMPILER
      },
      filterModules,
      filterTagName,
      resourcePath,
      emitFile: this.emitFile,
      wxComponents,
      getJsonFile,
      getShadowTemplate,
      updateSpecialMethods,
      globalUsingComponents,
      updateGenericComponents,
      updateComponentGenerics,
      updateUsingGlobalComponents
    })
  } else {
    throw new Error('vue-loader-options parse error')
  }
  this.callback(null, content, map)
}
