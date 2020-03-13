import {
  invokeMethod,
  getCurrentPageVm
} from '../../platform'

import {
  callback
} from 'uni-shared'

function operateMapPlayer (mapId, pageVm, type, data) {
  invokeMethod('operateMapPlayer', mapId, pageVm, type, data)
}

UniServiceJSBridge.subscribe('onMapMethodCallback', ({
  callbackId,
  data
}) => {
  callback.invoke(callbackId, data)
})

const methods = ['getCenterLocation', 'getScale', 'getRegion', 'includePoints', 'translateMarker']

export class MapContext {
  constructor (id, pageVm) {
    this.id = id
    this.pageVm = pageVm
  }

  moveToLocation () {
    operateMapPlayer(this.id, this.pageVm, 'moveToLocation')
  }
}

MapContext.prototype.$getAppMap = function () {
  return plus.maps.getMapById(this.pageVm.$page.id + '-map-' + this.id)
}

methods.forEach(function (method) {
  MapContext.prototype[method] = callback.warp(function (options, callbackId) {
    options.callbackId = callbackId
    operateMapPlayer(this.id, this.pageVm, method, options)
  })
})

export function createMapContext (id, context) {
  if (context) {
    return new MapContext(id, context)
  }
  return new MapContext(id, getCurrentPageVm('createMapContext'))
}
