import type { ComponentPublicInstance } from 'vue'
import type { SetPageMetaOptions } from '@dcloudio/uni-api'

export function setCurrentPageMeta(
  page: ComponentPublicInstance,
  options: SetPageMetaOptions
) {
  UniServiceJSBridge.invokeViewMethod('setPageMeta', options, page.$page.id)
}
