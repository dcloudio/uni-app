import { ComponentPublicInstance } from 'vue'
import { getRealRoute } from '@dcloudio/uni-core'

declare global {
  interface ImportMeta {
    env: {
      BASE_URL: string
    }
  }
}

export function findElem(vm: ComponentPublicInstance) {
  return vm.$el
}

const SCHEME_RE = /^([a-z-]+:)?\/\//i
const DATA_RE = /^data:.*,.*/

const baseUrl = __IMPORT_META_ENV_BASE_URL__
function addBase(filePath: string) {
  return baseUrl + filePath
}

export function getRealPath(filePath: string) {
  // 相对路径模式对静态资源路径特殊处理
  if (__uniConfig.router.base === './') {
    filePath = filePath.replace(/^\.\/static\//, '/static/')
  }
  if (filePath.indexOf('/') === 0) {
    if (filePath.indexOf('//') === 0) {
      filePath = 'https:' + filePath
    } else {
      return addBase(filePath.substr(1))
    }
  }
  // 网络资源或base64
  if (
    SCHEME_RE.test(filePath) ||
    DATA_RE.test(filePath) ||
    filePath.indexOf('blob:') === 0
  ) {
    return filePath
  }

  const pages = getCurrentPages()
  if (pages.length) {
    return addBase(
      getRealRoute(pages[pages.length - 1].$page.route, filePath).substr(1)
    )
  }

  return filePath
}
