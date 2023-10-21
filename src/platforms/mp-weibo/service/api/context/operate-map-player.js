export function operateMapPlayer (mapId, pageVm, type, data) {
  const pageId = pageVm.$page.id
  UniServiceJSBridge.publishHandler(pageId + '-map-' + mapId, {
    mapId,
    type,
    data
  }, pageId)
}
