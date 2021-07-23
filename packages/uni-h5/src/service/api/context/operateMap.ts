export function operateMap(
  id: string,
  pageId: number,
  type: string,
  data?: unknown
) {
  UniServiceJSBridge.invokeViewMethod(
    'map.' + id,
    {
      type,
      data,
    },
    pageId
  )
}
