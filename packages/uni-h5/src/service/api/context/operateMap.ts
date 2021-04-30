import { ComponentPublicInstance } from 'vue'
import { getPageIdByVm } from '@dcloudio/uni-core'

export function operateMap(
  id: string,
  vm: ComponentPublicInstance,
  type: string,
  data?: unknown
) {
  const pageId = getPageIdByVm(vm)!
  UniServiceJSBridge.publishHandler(
    'map.' + id,
    {
      type,
      data,
    },
    pageId
  )
}
