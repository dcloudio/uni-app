const path = require('path')
const loaderUtils = require('loader-utils')

const isWin = /^win/.test(process.platform)
const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

const AppPath = normalizePath(path.resolve(process.env.UNI_INPUT_DIR, 'App.vue'))
module.exports = function (content, map) {
  this.cacheable && this.cacheable()
  if (this.resourceQuery) {
    const params = loaderUtils.parseQuery(this.resourceQuery)
    if (params.mpType === 'page') {
      return this.callback(null, content, map)
    }
  }
  if (normalizePath(this.resourcePath) === AppPath) {
    return this.callback(null, content, map)
  }
  if (content.indexOf('platform="mp-weixin"') !== -1) {
    return this.callback(null, content, map)
  }
  return this.callback(null, content.replace(/(<style\b[^><]*)>/ig, '$1 scoped>'), map)
}
