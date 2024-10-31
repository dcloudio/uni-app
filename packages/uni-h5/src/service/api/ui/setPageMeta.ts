import type { ComponentPublicInstance } from 'vue'
import type { SetPageMetaOptions } from '@dcloudio/uni-api'

export function setCurrentPageMeta(
  page: ComponentPublicInstance | null,
  options: SetPageMetaOptions
) {
  const { pageStyle, rootFontSize } = options
  // h5端 page-meta.vue组件触发时setPageMeta时, 需要将pageStyle和rootFontSize存储到page.$page.meta
  if (__PLATFORM__ === 'h5' && page) {
    if (hasKey(options, 'pageStyle')) {
      page.$page.meta.pageStyle = pageStyle
    }
    if (hasKey(options, 'rootFontSize')) {
      page.$page.meta.rootFontSize = rootFontSize
    }
  }

  if (hasKey(options, 'pageStyle')) {
    setPageStyle(pageStyle)
  }
  if (hasKey(options, 'rootFontSize')) {
    setRootFontSize(rootFontSize)
  }
}

const setPageStyle = (pageStyle: string | undefined | null) => {
  const pageElm = document.querySelector('uni-page-body') || document.body
  if (__PLATFORM__ === 'h5' && pageElm === document.body) {
    console.warn('uni-page-body 获取失败')
  }

  if (pageStyle) {
    pageElm.setAttribute('style', pageStyle)
  } else {
    pageElm.removeAttribute('style')
  }
}

const setRootFontSize = (rootFontSize: string | undefined | null) => {
  if (document.documentElement.style.fontSize === rootFontSize) {
    return
  }
  if (rootFontSize) {
    document.documentElement.style.fontSize = rootFontSize
    document.documentElement.setAttribute('root-font-size', 'true')
  } else {
    document.documentElement.style.removeProperty('font-size')
    document.documentElement.removeAttribute('root-font-size')
  }
}

function hasKey<T extends object, K extends keyof T>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return obj.hasOwnProperty(key)
}
