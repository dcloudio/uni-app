export function operateMap(
  id: string,
  pageId: number,
  type: string,
  data?: unknown,
  operateMapCallback?: (res: any) => void
) {
  UniServiceJSBridge.invokeViewMethod(
    'map.' + id,
    {
      type,
      data,
    },
    pageId,
    operateMapCallback
  )
}
