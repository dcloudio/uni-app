import { ComponentPublicInstance } from 'vue'

export function operateVideoPlayer(
  videoId: string,
  vm: ComponentPublicInstance,
  type: string,
  data?: unknown
) {
  const pageId = vm.$root!.$page.id
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
