import type { ComponentPublicInstance } from 'vue'
import type { SetPageMetaOptions } from '@dcloudio/uni-api'

export function setCurrentPageMeta(
  _page: ComponentPublicInstance | null,
  { pageStyle, rootFontSize }: SetPageMetaOptions
) {
  if (pageStyle) {
    const pageElm = document.querySelector('uni-page-body') || document.body
    pageElm.setAttribute('style', pageStyle)
  }
  if (
    rootFontSize &&
    document.documentElement.style.fontSize !== rootFontSize
  ) {
    document.documentElement.style.fontSize = rootFontSize
  }
}
