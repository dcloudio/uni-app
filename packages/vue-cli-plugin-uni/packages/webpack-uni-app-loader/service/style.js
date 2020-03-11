module.exports = function(source, map) {
  console.warn(
    `App平台 v3 模式暂不支持在 js 文件中引用"${this._module && this._module.rawRequest || this.resourcePath}"`
  )
  return ''
}
