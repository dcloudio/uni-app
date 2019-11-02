export function operateCanvasContext (canvasId, pageVm, type, data) {
  const pageId = pageVm.$page.id
  UniServiceJSBridge.publishHandler(pageId + '-canvas-' + canvasId, {
    canvasId,
    type,
    data
  }, pageId)
}
