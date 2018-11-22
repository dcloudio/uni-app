function operateMapPlayer (mapId, pageId, type, data) {
  UniServiceJSBridge.publishHandler(pageId + '-map-' + mapId, {
    mapId,
    type,
    data
  }, pageId)
}

class MapContext {
  constructor (id, pageId) {
    this.id = id
    this.pageId = pageId
  }

  getCenterLocation ({
    success,
    fail,
    complete
  }) {
    operateMapPlayer(this.id, this.pageId, 'getCenterLocation', {
      success,
      fail,
      complete
    })
  }
  moveToLocation () {
    operateMapPlayer(this.id, this.pageId, 'moveToLocation')
  }
  translateMarker ({
    markerId,
    destination,
    autoRotate,
    rotate,
    duration,
    animationEnd,
    fail
  }) {
    operateMapPlayer(this.id, this.pageId, 'translateMarker', {
      markerId,
      destination,
      autoRotate,
      rotate,
      duration,
      animationEnd,
      fail
    })
  }
  includePoints ({
    points,
    padding
  }) {
    operateMapPlayer(this.id, this.pageId, 'includePoints', {
      points,
      padding
    })
  }
  getRegion ({
    success,
    fail,
    complete
  }) {
    operateMapPlayer(this.id, this.pageId, 'getRegion', {
      success,
      fail,
      complete
    })
  }
  getScale ({
    success,
    fail,
    complete
  }) {
    operateMapPlayer(this.id, this.pageId, 'getScale', {
      success,
      fail,
      complete
    })
  }
}

export function createMapContext (id, context) {
  if (context) {
    return new MapContext(id, context.$page.id)
  }
  const app = getApp()
  if (app.$route && app.$route.params.__id__) {
    return new MapContext(id, app.$route.params.__id__)
  } else {
    UniServiceJSBridge.emit('onError', 'createMapContext:fail')
  }
}
