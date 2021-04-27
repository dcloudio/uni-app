import { ComponentPublicInstance } from 'vue'
import { getPageIdByVm } from '@dcloudio/uni-core'

export function operateVideoPlayer(
  videoId: string,
  vm: ComponentPublicInstance,
  type: string,
  data?: unknown
) {
  const pageId = getPageIdByVm(vm)!
  UniServiceJSBridge.publishHandler(
    'video.' + videoId,
    {
      videoId,
      type,
      data,
    },
    pageId
  )
}
