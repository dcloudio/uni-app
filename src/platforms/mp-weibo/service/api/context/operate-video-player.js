export function operateVideoPlayer (videoId, pageVm, type, data) {
  const pageId = pageVm.$page.id
  UniServiceJSBridge.publishHandler(pageId + '-video-' + videoId, {
    videoId,
    type,
    data
  }, pageId)
}
