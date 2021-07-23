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
      reqs: reqs.map((req) => {
        if (req.component) {
          req.component = req.component.$el.nodeId
        }
        return req
      }),
    },
    page.$page.id,
    callback
  )
}
