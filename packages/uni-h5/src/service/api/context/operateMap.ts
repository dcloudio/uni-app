export function operateMap(
  id: string,
  pageId: number,
  type: string,
  data?: unknown
) {
  UniServiceJSBridge.publishHandler(
    'map.' + id,
    {
      type,
      data,
    },
    pageId
  )
}
