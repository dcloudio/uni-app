import { getCurrentPage, getRealRoute } from '@dcloudio/uni-core'
import {
  DATA_RE,
  SCHEME_RE,
  addLeadingSlash,
  cacheStringFunction,
} from '@dcloudio/uni-shared'

export function getRealPath(filepath: string) {
  // 无协议的情况补全 https
  if (filepath.indexOf('//') === 0) {
    return 'https:' + filepath
  }

  // 网络资源或base64
  if (SCHEME_RE.test(filepath) || DATA_RE.test(filepath)) {
    return filepath
  }

  if (isSystemURL(filepath)) {
    // 鸿蒙平台特性
    return 'file:/' + normalizeLocalPath(filepath)
  }
  // TODO view 层暂时使用当前 dirname，service 层暂时转换为 resource
  const wwwPath = __APP_VIEW__
    ? location.href.substring(0, location.href.lastIndexOf('/'))
    : normalizeLocalPath('_www').replace(
        /.+?\/apps\//,
        'resource://rawfile/apps/'
      )
  // 绝对路径转换为本地文件系统路径
  if (filepath.indexOf('/') === 0) {
    // 平台绝对路径
    if (filepath.startsWith('/data/storage/')) {
      // 鸿蒙平台特性
      return 'file://' + filepath
    }
    return wwwPath + filepath
  }

  // 相对资源
  if (filepath.indexOf('../') === 0 || filepath.indexOf('./') === 0) {
    // app-view
    if (typeof __id__ === 'string') {
      // app-view
      return wwwPath + getRealRoute(addLeadingSlash(__id__), filepath)
    } else {
      const page = getCurrentPage()
      if (page) {
        return wwwPath + getRealRoute(addLeadingSlash(page.route!), filepath)
      }
    }
  }

  return filepath
}

const normalizeLocalPath = cacheStringFunction((filepath: string) => {
  return plus.io.convertLocalFileSystemURL(filepath).replace(/\/$/, '')
})

function isSystemURL(filepath: string) {
  if (
    filepath.indexOf('_www') === 0 ||
    filepath.indexOf('_doc') === 0 ||
    filepath.indexOf('_documents') === 0 ||
    filepath.indexOf('_downloads') === 0
  ) {
    return true
  }
  return false
}
