import type { ComponentPublicInstance } from 'vue'
import type { SetPageMetaOptions } from '@dcloudio/uni-api'
import { getPage$BasePage } from '../../framework/page/getCurrentPages'

export function setCurrentPageMeta(
  page: ComponentPublicInstance,
  options: SetPageMetaOptions
) {
  UniServiceJSBridge.invokeViewMethod(
    'setPageMeta',
    options,
    typeof options.pageId !== 'undefined'
      ? options.pageId
      : getPage$BasePage(page).id
  )
}
