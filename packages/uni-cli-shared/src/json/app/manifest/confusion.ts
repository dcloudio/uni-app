import path from 'path'
export function initConfusion(manifestJson: Record<string, any>) {
  if (!manifestJson.plus.confusion?.resources) {
    return
  }
  const resources = manifestJson.plus.confusion.resources as Record<
    string,
    string
  >
  manifestJson.plus.confusion.resources = Object.keys(resources).reduce(
    (res, name) => {
      const extname = path.extname(name)
      if (extname === '.nvue') {
        res[name.replace('.nvue', '.js')] = resources[name]
      } else if (extname === '.js') {
        // 仅指定目录的js允许加密
        if (
          name.indexOf('hybrid/html') === 0 ||
          name.indexOf('static/') === 0 ||
          name.indexOf('/static/') !== -1 // subpackages, uni_modules 中的 static 目录
        ) {
          res[name] = resources[name]
        }
      } else {
        throw new Error(`原生混淆仅支持 nvue 页面，错误的页面路径：${name}`)
      }
      // TODO 旧编译器会检查要加密的 nvue 页面（包括subnvue）是否被使用？后续有时间再考虑支持吧，意义不太大
      return res
    },
    {} as Record<string, string>
  )
}
