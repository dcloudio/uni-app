import type { ComponentPublicInstance } from 'vue'
import type { SetPageMetaOptions } from '@dcloudio/uni-api'

export function setCurrentPageMeta(
  page: ComponentPublicInstance | null,
  { pageStyle, rootFontSize }: SetPageMetaOptions
) {
  // h5端 page-meta.vue组件触发时，
  // 仅仅将pageStyle，rootFontSize设置到$page.meta里面
  // 页面切换onPageShow逻辑会更新pageStyle，rootFontSize
  if (__PLATFORM__ === 'h5' && page) {
    if (pageStyle) {
      page.$page.meta.pageStyle = pageStyle
    }
    if (rootFontSize) {
      page.$page.meta.rootFontSize = rootFontSize
    }
    return
  }
  const pageElm = document.querySelector('uni-page-body') || document.body
  if (__PLATFORM__ === 'h5' && pageElm === document.body) {
    console.warn('uni-page-body 获取失败')
  }

  if (pageStyle) {
    pageElm.setAttribute('style', pageStyle)
  } else {
    pageElm.removeAttribute('style')
  }

  if (document.documentElement.style.fontSize === rootFontSize) {
    return
  }
  if (!rootFontSize) {
    document.documentElement.style.removeProperty('font-size')
  } else {
    document.documentElement.style.fontSize = rootFontSize
  }
}
