const path = require('path')
const loaderUtils = require('loader-utils')

const isWin = /^win/.test(process.platform)
const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

const AppPath = normalizePath(path.resolve(process.env.UNI_INPUT_DIR, 'App.vue'))
module.exports = function(content) {
  this.cacheable && this.cacheable()

  if (this.resourceQuery) {
    const params = loaderUtils.parseQuery(this.resourceQuery)
    if (params.mpType === 'page') {
      return content
    }
  }
  if (normalizePath(this.resourcePath) === AppPath) {
    return content
  }
  if (content.indexOf('platform="mp-weixin"') !== -1) {
    return content
  }
  return content.replace(/(<style\b[^><]*)>/ig, '$1 scoped>')
}
