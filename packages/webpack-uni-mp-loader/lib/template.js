const path = require('path')

const loaderUtils = require('loader-utils')

const {
  removeExt,
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
    const resourcePath = normalizeNodeModules(removeExt(realResourcePath) + templateExt)
    const wxComponents = getWXComponents(resourcePath.replace(path.extname(resourcePath), ''))

    const params = loaderUtils.parseQuery(this.resourceQuery)
    /* eslint-disable no-mixed-operators */
    const filterModules = parseFilterModules(params && params['filter-modules'])
    Object.assign(vueLoaderOptions.options.compilerOptions, {
      mp: {
        platform: process.env.UNI_PLATFORM
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
