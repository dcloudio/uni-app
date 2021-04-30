import { ComponentPublicInstance } from 'vue'

export function operateMap(
  id: string,
  vm: ComponentPublicInstance,
  type: string,
  data?: unknown
) {
  const pageId = vm.$root!.$page.id
  UniServiceJSBridge.publishHandler(
    'map.' + id,
    {
      type,
      data,
    },
    pageId
  )
}
