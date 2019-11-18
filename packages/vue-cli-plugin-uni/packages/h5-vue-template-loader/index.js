const path = require('path')

const loaderUtils = require('loader-utils')

module.exports = function(content) {
  this.cacheable && this.cacheable()

  const vueLoaderOptions = this.loaders.find(loader => loader.ident === 'vue-loader-options')
  if (vueLoaderOptions) {
    const params = loaderUtils.parseQuery(this.resourceQuery)
    /* eslint-disable no-mixed-operators */
    const filterModules = JSON.parse(params && params['filter-modules'] || '{}')
    Object.assign(vueLoaderOptions.options.compilerOptions, {
      filterModules: Object.keys(filterModules)
    })
  } else {
    throw new Error('vue-loader-options parse error')
  }
  return content
}
