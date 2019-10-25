import getRealRoute from 'uni-helpers/get-real-route'

const SCHEME_RE = /^([a-z-]+:)?\/\//i
const DATA_RE = /^data:.*,.*/

// 处理 Android 平台解压与非解压模式下获取的路径不一致的情况
function handleLocalPath (filePath) {
  return plus.io.convertLocalFileSystemURL(filePath)
    .replace(/^\/?apps\//, '/android_asset/apps/')
    .replace(/\/$/, '')
}

let wwwPath

function addBase (filePath) {
  if (!wwwPath) { // 需要时，初始化一次，外部直接初始化，需要等 plusready
    wwwPath = 'file://' + handleLocalPath('_www') + '/'
  }
  return wwwPath + filePath
}

export default function getRealPath (filePath) {
  if (filePath.indexOf('/') === 0) {
    if (filePath.indexOf('//') === 0) {
      filePath = 'https:' + filePath
    } else {
      return addBase(filePath.substr(1))
    }
  }
  // 网络资源或base64
  if (SCHEME_RE.test(filePath) || DATA_RE.test(filePath) || filePath.indexOf('blob:') === 0) {
    return filePath
  }

  // _do=>_doc,_documents,_downloads
  if (filePath.indexOf('_www') === 0 || filePath.indexOf('_do') === 0) {
    return 'file://' + handleLocalPath(filePath)
  }

  const pages = getCurrentPages()
  if (pages.length) {
    return addBase(getRealRoute(pages[pages.length - 1].$page.route, filePath).substr(1))
  }

  return filePath
}
