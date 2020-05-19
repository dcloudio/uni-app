const loaderUtils = require('loader-utils')

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
    const params = loaderUtils.parseQuery(this.resourceQuery)
    /* eslint-disable no-mixed-operators */
    const filterModules = parseFilterModules(params && params['filter-modules'])
    Object.assign(vueLoaderOptions.options.compilerOptions, {
      filterModules: Object.keys(filterModules)
    })
  } else {
    throw new Error('vue-loader-options parse error')
  }
  this.callback(null, content, map)
}
