import { ComponentPublicInstance } from 'vue'
import { SetPageMetaOptions } from '@dcloudio/uni-api'

export function setCurrentPageMeta(
  page: ComponentPublicInstance,
  options: SetPageMetaOptions
) {
  UniServiceJSBridge.invokeViewMethod('setPageMeta', options, page.$page.id)
}
