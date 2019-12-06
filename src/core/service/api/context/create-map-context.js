import {
  invokeMethod,
  getCurrentPageVm
} from '../../platform'

function operateMapPlayer (mapId, pageVm, type, data) {
  invokeMethod('operateMapPlayer', mapId, pageVm, type, data)
}

export class MapContext {
  constructor (id, pageVm) {
    this.id = id
    this.pageVm = pageVm
  }

  getCenterLocation (args) {
    operateMapPlayer(this.id, this.pageVm, 'getCenterLocation', args)
  }

  moveToLocation () {
    operateMapPlayer(this.id, this.pageVm, 'moveToLocation')
  }

  translateMarker (args) {
    operateMapPlayer(this.id, this.pageVm, 'translateMarker', args)
  }

  includePoints (args) {
    operateMapPlayer(this.id, this.pageVm, 'includePoints', args)
  }

  getRegion (args) {
    operateMapPlayer(this.id, this.pageVm, 'getRegion', args)
  }

  getScale (args) {
    operateMapPlayer(this.id, this.pageVm, 'getScale', args)
  }
}

export function createMapContext (id, context) {
  if (context) {
    return new MapContext(id, context)
  }
  return new MapContext(id, getCurrentPageVm('createMapContext'))
}
