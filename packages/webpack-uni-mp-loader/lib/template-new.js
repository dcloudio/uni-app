const path = require('path')

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
  normalizeNodeModules
} = require('./shared')

const templateExt = getPlatformExts().template

module.exports = function (content) {
  this.cacheable && this.cacheable()

  const vueLoaderOptions = this.loaders[0]
  if (vueLoaderOptions.ident === 'vue-loader-options') {
    const globalUsingComponents = getGlobalUsingComponents()
    const realResourcePath = path.relative(process.env.UNI_INPUT_DIR, this.resourcePath)
    const resourcePath = normalizeNodeModules(removeExt(realResourcePath) + templateExt)
    const wxComponents = getWXComponents(resourcePath.replace(path.extname(resourcePath), ''))
    Object.assign(vueLoaderOptions.options.compilerOptions, {
      mp: {
        platform: process.env.UNI_PLATFORM
      },
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
  return content
}
