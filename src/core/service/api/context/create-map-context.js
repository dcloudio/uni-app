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

const methods = ['getCenterLocation',
  'moveToLocation',
  'getScale',
  'getRegion',
  'includePoints',
  'translateMarker',
  'addCustomLayer',
  'removeCustomLayer',
  'addGroundOverlay',
  'removeGroundOverlay',
  'updateGroundOverlay',
  'initMarkerCluster',
  'addMarkers',
  'removeMarkers',
  'moveAlong',
  'openMapApp']

export class MapContext {
  constructor (id, pageVm) {
    this.id = id
    this.pageVm = pageVm
  }

  on (name, callback) {
    operateMapPlayer(this.id, this.pageVm, 'on', {
      name,
      callback
    })
  }
}

MapContext.prototype.$getAppMap = function () {
  if (__PLATFORM__ === 'app-plus') {
    return plus.maps.getMapById(this.pageVm.$page.id + '-map-' + this.id)
  }
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
