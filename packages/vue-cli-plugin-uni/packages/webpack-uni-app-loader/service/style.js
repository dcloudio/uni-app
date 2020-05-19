module.exports = function (source, map) {
  /* eslint-disable no-mixed-operators */
  console.warn(
    `App平台 v3 模式暂不支持在 js 文件中引用"${this._module && this._module.rawRequest || this.resourcePath}"`
  )
  this.callback(null, '', map)
}
