import {
  invokeMethod,
  getCurrentPageVm
} from '../../platform'

function operateMapPlayer (mapId, pageVm, type, data) {
  invokeMethod('operateMapPlayer', mapId, pageVm, type, data)
}

class MapContext {
  constructor (id, pageVm) {
    this.id = id
    this.pageVm = pageVm
  }

  getCenterLocation ({
    success,
    fail,
    complete
  }) {
    operateMapPlayer(this.id, this.pageVm, 'getCenterLocation', {
      success,
      fail,
      complete
    })
  }

  moveToLocation () {
    operateMapPlayer(this.id, this.pageVm, 'moveToLocation')
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
    operateMapPlayer(this.id, this.pageVm, 'translateMarker', {
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
    operateMapPlayer(this.id, this.pageVm, 'includePoints', {
      points,
      padding
    })
  }

  getRegion ({
    success,
    fail,
    complete
  }) {
    operateMapPlayer(this.id, this.pageVm, 'getRegion', {
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
    operateMapPlayer(this.id, this.pageVm, 'getScale', {
      success,
      fail,
      complete
    })
  }
}

export function createMapContext (id, context) {
  if (context) {
    return new MapContext(id, context)
  }
  return new MapContext(id, getCurrentPageVm('createMapContext'))
}
