const path = require('path')
const {
  normalizePath,
  getPlatformExts
} = require('@dcloudio/uni-cli-shared')
const { deleteAsset } = require('../shared')

module.exports = function (compilation) {
  // 移除部分含有错误引用的 wxss 文件
  const styleImports = {}
  compilation.getAssets().forEach((asset) => {
    const name = asset.name
    const styleExtname = getPlatformExts().style
    if (name.endsWith(styleExtname)) {
      let origSource = asset.source.source()
      origSource = origSource.trim ? origSource.trim() : ''
      const result = origSource.match(/^@import ["'](.+?)["']$/)
      if (result) {
        const stylePath = normalizePath(path.join(path.dirname(name), result[1]))
        if (compilation.getAsset(stylePath)) {
          styleImports[stylePath] = styleImports[stylePath] || []
          styleImports[stylePath].push(name)
        } else {
          if (styleImports[name]) {
            styleImports[name].forEach(name => deleteAsset(compilation, name))
            delete styleImports[name]
          }
          deleteAsset(compilation, name)
        }
      }
    }
  })
}
