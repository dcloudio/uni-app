const path = require('path')

const {
  removeExt,
  normalizePath
} = require('@dcloudio/uni-cli-shared')
const {
  getUsingComponentsCode
} = require('@dcloudio/uni-cli-shared/lib/pages')

module.exports = function(content, map) {
  this.cacheable && this.cacheable()
  const resourcePath = removeExt(
    normalizePath(path.relative(process.env.UNI_INPUT_DIR, this.resourcePath))
  )
  console.log('resourcePath:' + resourcePath)
  return getUsingComponentsCode(resourcePath) + content
}
