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

const methods = ['getCenterLocation', 'translateMarker', 'getScale', 'getRegion']

export class MapContext {
  constructor (id, pageVm) {
    this.id = id
    this.pageVm = pageVm
  }

  moveToLocation () {
    operateMapPlayer(this.id, this.pageVm, 'moveToLocation')
  }

  includePoints (args) {
    operateMapPlayer(this.id, this.pageVm, 'includePoints', args)
  }
}

MapContext.prototype.$getAppMap = function() {
  return plus.maps.getMapById(this.pageVm.$page.id + '-map-' + this.id);
}

methods.forEach(function (method) {
  MapContext.prototype[method] = callback.warp(function (options, callbackId) {
    operateMapPlayer(this.id, this.pageVm, method, {
      options,
      callbackId
    })
  })
})

export function createMapContext (id, context) {
  if (context) {
    return new MapContext(id, context)
  }
  return new MapContext(id, getCurrentPageVm('createMapContext'))
}
