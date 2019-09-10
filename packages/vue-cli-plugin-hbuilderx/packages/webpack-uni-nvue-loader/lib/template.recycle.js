const loaderUtils = require('loader-utils')
module.exports = function(content) {
  this.cacheable && this.cacheable()

  const vueLoaderOptions = this.loaders[0]
  if (vueLoaderOptions.ident === 'vue-loader-options') {
    const params = loaderUtils.parseQuery(this.resourceQuery)
    if (params.recyclable) {
      Object.assign(vueLoaderOptions.options.compilerOptions, {
        recyclable: true
      })
    }
  } else {
    throw new Error('vue-loader-options parse error')
  }

  return content
}
