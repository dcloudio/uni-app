const path = require('path')

const isWin = /^win/.test(process.platform)

const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

module.exports = function (content, map) {
  this.cacheable && this.cacheable()
  const resourcePath = normalizePath(this.resourcePath)
  if (
    resourcePath !== normalizePath(path.resolve(process.env.UNI_INPUT_DIR, 'App.vue')) &&
    content.indexOf('platform="mp-weixin"') === -1 // 小程序组件暂不加scoped
  ) {
    return this.callback(null, content.replace(/(<style\b[^><]*)>/ig, '$1 scoped>'), map)
  }
  this.callback(null, content, map)
}
