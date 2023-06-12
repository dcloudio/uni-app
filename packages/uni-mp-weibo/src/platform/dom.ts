import { ComponentPublicInstance } from 'vue'
import { getRealRoute } from '@dcloudio/uni-core'
import { addLeadingSlash, DATA_RE, SCHEME_RE } from '@dcloudio/uni-shared'
declare global {
  interface ImportMeta {
    env: {
      BASE_URL: string
    }
  }
}

export function findElem(vm: ComponentPublicInstance) {
  if (__APP_VIEW__) {
    // App 端，传入的是 nodeId
    return (window as any).__$__(vm).$
  }
  return vm.$el
}

// const baseUrl = __IMPORT_META_ENV_BASE_URL__
function addBase(filePath: string) {
  const { base: baseUrl } = __uniConfig.router!
  // filepath可能已经被补充了baseUrl
  if (addLeadingSlash(filePath).indexOf(baseUrl) === 0) {
    return addLeadingSlash(filePath)
  }
  return baseUrl + filePath
}

export function getRealPath(filePath: string) {
  // 相对路径模式对静态资源路径特殊处理
  const { base, assets } = __uniConfig.router!
  if (base === './') {
    if (
      filePath.indexOf('./static/') === 0 ||
      (assets && filePath.indexOf('./' + assets + '/') === 0)
    ) {
      filePath = filePath.slice(1)
    }
  }
  if (filePath.indexOf('/') === 0) {
    if (filePath.indexOf('//') === 0) {
      filePath = 'https:' + filePath
    } else {
      return addBase(filePath.slice(1))
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
      getRealRoute(pages[pages.length - 1].$page.route, filePath).slice(1)
    )
  }

  return filePath
}
