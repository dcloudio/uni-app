import type { ComponentPublicInstance } from 'vue'
import type { SetPageMetaOptions } from '@dcloudio/uni-api'
//#if _X_VAPOR_
import { getPageBody } from '../../../helpers/pageBody'
//#endif

export function setCurrentPageMeta(
  _page: ComponentPublicInstance | null,
  { pageStyle, rootFontSize }: SetPageMetaOptions
) {
  if (pageStyle) {
    //#if _X_VAPOR_
    const pageElm = _page && getPageBody(_page.$)
    if (pageElm) {
      // 原先分属 Page 和 wrapper 的框架样式现位于正文，page-style 只替换业务样式。
      const properties = [
        '--uni-safe-area-inset-top',
        '--uni-safe-area-inset-right',
        '--uni-safe-area-inset-bottom',
        '--uni-safe-area-inset-left',
        '--background-color-content',
        '--uni-dialog-page-index',
        'z-index',
        'overflow-y',
      ].map((name) => [
        name,
        pageElm.style.getPropertyValue(name),
        pageElm.style.getPropertyPriority(name),
      ])
      pageElm.setAttribute('style', pageStyle)
      properties.forEach(([name, value, priority]) => {
        if (value && !pageElm.style.getPropertyValue(name)) {
          pageElm.style.setProperty(name, value, priority)
        }
      })
    }
    //#else
    const pageElm = document.querySelector('uni-page-body') || document.body
    pageElm.setAttribute('style', pageStyle)
    //#endif
  }
  if (
    rootFontSize &&
    document.documentElement.style.fontSize !== rootFontSize
  ) {
    document.documentElement.style.fontSize = rootFontSize
  }
}
