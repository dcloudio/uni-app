import getRealRoute from 'uni-helpers/get-real-route'

const SCHEME_RE = /^([a-z-]+:)?\/\//i
const DATA_RE = /^data:.*,.*/

function addBase (filePath) {
  const base = __uniConfig.router.base
  if (!base) {
    return filePath
  }
  if (base !== '/') {
    // 部分地址已经带了base(如被webpack处理过的资源自动带了publicPath)
    if (('/' + filePath).indexOf(base) === 0) {
      return '/' + filePath
    }
  }
  return base + filePath
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

  const pages = getCurrentPages()
  if (pages.length) {
    return addBase(getRealRoute(pages[pages.length - 1].$page.route, filePath).substr(1))
  }

  return filePath
}
