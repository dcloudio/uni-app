const path = require('path')

const qs = require('querystring')

const {
  md5,
  removeExt,
  getPlatformExts
} = require('@dcloudio/uni-cli-shared')

const {
  cacheTemplate,
  cacheCompilerOptions,
  getPlatformTarget
} = require('./shared')

const templateExt = getPlatformExts().template
module.exports = function (content) {
  if (process.env.UNI_USING_COMPONENTS) {
    return require('./template-new').call(this, content)
  }
  this.cacheable && this.cacheable()

  const realResourcePath = path.relative(process.env.UNI_INPUT_DIR, this.resourcePath)

  if (process.env.UNI_USING_COMPONENTS) {
    // 向 uni-template-compier 传递 emitFile
    const vueLoaderOptions = this.loaders.find(loader => loader.ident)
    if (vueLoaderOptions && vueLoaderOptions.ident === 'vue-loader-options') {
      Object.assign(vueLoaderOptions.options.compilerOptions, {
        resourcePath: removeExt(realResourcePath) + templateExt,
        emitFile: this.emitFile
      })
    } else {
      throw new Error('vue-loader-options parse error')
    }
  } else {
    if (!content.trim()) {
      content = '<view></view>'
    }

    cacheTemplate(realResourcePath, content)

    const query = qs.parse(this.resourceQuery.slice(1))

    const {
      id
    } = query

    const compilerOptions = {
      scopeId: query.scoped ? `data-v-${id}` : null,
      target: getPlatformTarget(),
      md5: md5(content.trim() + process.env.UNI_PLATFORM),
      realResourcePath
    }

    cacheCompilerOptions(realResourcePath, compilerOptions)

    // 向 vue-loader templateLoader 传递 compilerOptions
    const vueLoaderOptions = this.loaders.find(loader => loader.ident)
    if (vueLoaderOptions && vueLoaderOptions.ident === 'vue-loader-options') {
      Object.assign(vueLoaderOptions.options.compilerOptions, compilerOptions)
    } else {
      throw new Error('vue-loader-options parse error')
    }
  }

  return content
}
