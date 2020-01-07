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
  content = content + getUsingComponentsCode(resourcePath)
  // TODO 自动导入 vue 组件(h5,小程序,app[vue,nvue])
  // 1. 需要 template-loader 解析出所有自定义组件()
  // 2. 根据自定义组件信息生成引用代码
  // 3. node-modules中的组件不提供自动导入
  return content
}
