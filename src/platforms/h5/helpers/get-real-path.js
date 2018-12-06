import getRealRoute from 'uni-helpers/get-real-route'

const HTTP_RE = /^(http|https|file):\/\//
const BASE64_IMAGE_RE = /^data:[a-z-]+\/[a-z-]+;base64,/

function addBase (filePath) {
  if (__uniConfig.router.base) {
    return __uniConfig.router.base + filePath
  }
  return filePath
}

export default function getRealPath (filePath) {
  if (filePath.indexOf('/') === 0) {
    return addBase(filePath.substr(1))
  }
  // 网络资源或base64
  if (HTTP_RE.test(filePath) || BASE64_IMAGE_RE.test(filePath) || filePath.indexOf('blob:') === 0) {
    return filePath
  }

  const pages = getCurrentPages()
  if (pages.length) {
    return addBase(getRealRoute(pages[pages.length - 1].$page.route, filePath).substr(1))
  }

  return filePath
}
