export function operateVideoPlayer(
  videoId: string,
  pageId: number,
  type: string,
  data?: unknown
) {
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
