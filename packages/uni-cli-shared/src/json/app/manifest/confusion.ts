import path from 'path'
import { normalizePath } from '../../../utils'
import { EXTNAME_JS_RE } from '../../../constants'

function isJsFile(filename: string) {
  return EXTNAME_JS_RE.test(filename)
}

function isStaticJsFile(filename: string) {
  return (
    filename.indexOf('hybrid/html') === 0 ||
    filename.indexOf('static/') === 0 ||
    filename.indexOf('/static/') !== -1
  ) // subpackages, uni_modules 中的 static 目录
}

const dynamicConfusionJsFiles: string[] = []

export function isConfusionFile(filename: string) {
  return dynamicConfusionJsFiles.includes(normalizePath(filename))
}

export function hasConfusionFile() {
  return !!dynamicConfusionJsFiles.length
}

export function initConfusion(manifestJson: Record<string, any>) {
  dynamicConfusionJsFiles.length = 0
  if (!manifestJson.plus.confusion?.resources) {
    return
  }
  const resources = manifestJson.plus.confusion.resources as Record<
    string,
    string
  >
  manifestJson.plus.confusion.resources = Object.keys(resources).reduce<
    Record<string, string>
  >((res, name) => {
    const extname = path.extname(name)
    if (extname === '.nvue') {
      res[name.replace('.nvue', '.js')] = resources[name]
    } else if (isJsFile(name)) {
      // 静态 js 加密
      if (isStaticJsFile(name)) {
        res[name] = resources[name]
      } else {
        // 非静态 js 将被合并进 app-confusion.js
        dynamicConfusionJsFiles.push(name)
      }
    } else {
      throw new Error(`原生混淆仅支持 nvue 页面，错误的页面路径：${name}`)
    }
    // TODO 旧编译器会检查要加密的 nvue 页面（包括subnvue）是否被使用？后续有时间再考虑支持吧，意义不太大
    return res
  }, {})
  if (dynamicConfusionJsFiles.length) {
    manifestJson.plus.confusion.resources['app-confusion.js'] = {}
  }
}
