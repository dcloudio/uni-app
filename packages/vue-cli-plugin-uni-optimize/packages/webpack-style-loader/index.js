const isWin = /^win/.test(process.platform)

const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

const src = require('@dcloudio/uni-h5/path').src

module.exports = function (content) {
  this.cacheable && this.cacheable()
  const resourcePath = normalizePath(this.resourcePath)
  const sourcePath = normalizePath(src)
  if (resourcePath.indexOf(sourcePath) === 0) {
    return ''
  }
  return content
}
