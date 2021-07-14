import { ComponentPublicInstance } from 'vue'
import { SelectorQueryRequest, SelectorQueryNodeInfo } from '@dcloudio/uni-api'

export function requestComponentInfo(
  page: ComponentPublicInstance,
  reqs: Array<SelectorQueryRequest>,
  callback: (result: Array<SelectorQueryNodeInfo | null>) => void
) {
  UniServiceJSBridge.invokeViewMethod(
    'requestComponentInfo',
    {
      reqs,
    },
    callback,
    page.$page.id
  )
}
