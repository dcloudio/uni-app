import { ComponentPublicInstance } from 'vue'

export function operateVideoPlayer(
  videoId: string,
  vm: ComponentPublicInstance,
  type: string,
  data?: unknown
) {
  const pageId = vm.$page.id
  UniServiceJSBridge.publishHandler(
    pageId + '-video-' + videoId,
    {
      videoId,
      type,
      data,
    },
    pageId
  )
}
