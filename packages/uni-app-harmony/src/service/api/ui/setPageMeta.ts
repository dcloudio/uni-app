import type { SetPageMetaOptions } from '@dcloudio/uni-api'
import type { ComponentPublicInstance } from 'vue'
import { getPageIdByVm } from '@dcloudio/uni-core'

export function setCurrentPageMeta(
  page: ComponentPublicInstance,
  options: SetPageMetaOptions
) {
  const pageId = getPageIdByVm(page)!
  UniServiceJSBridge.invokeViewMethod('setPageMeta', options, pageId)
}
