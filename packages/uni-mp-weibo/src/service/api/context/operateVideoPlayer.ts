export function operateVideoPlayer(
  videoId: string,
  pageId: number,
  type: string,
  data?: unknown
) {
  UniServiceJSBridge.invokeViewMethod(
    'video.' + videoId,
    {
      videoId,
      type,
      data,
    },
    pageId
  )
}
