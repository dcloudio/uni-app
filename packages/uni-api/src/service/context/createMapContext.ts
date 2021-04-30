import { ComponentPublicInstance } from 'vue'
import { getCurrentPageVm } from '@dcloudio/uni-core'
import { operateMap } from '@dcloudio/uni-platform'
import { defineSyncApi } from '../../helpers/api'
import {
  API_CREATE_MAP_CONTEXT,
  API_TYPE_CREATE_MAP_CONTEXT,
  CreateMapContextProtocol,
} from '../../protocols/context/context'

class MapContext implements UniApp.MapContext {
  private id: string
  private vm: ComponentPublicInstance
  constructor(id: string, vm: ComponentPublicInstance) {
    this.id = id
    this.vm = vm
  }
  getCenterLocation(options: any) {
    operateMap(this.id, this.vm, 'getCenterLocation', options)
  }
  moveToLocation() {
    operateMap(this.id, this.vm, 'moveToLocation')
  }
  getScale(options: any) {
    operateMap(this.id, this.vm, 'getScale', options)
  }
  getRegion(options: any) {
    operateMap(this.id, this.vm, 'getRegion', options)
  }
  includePoints(options: any) {
    operateMap(this.id, this.vm, 'includePoints', options)
  }
  translateMarker(options: any) {
    operateMap(this.id, this.vm, 'translateMarker', options)
  }
  addCustomLayer() {}
  removeCustomLayer() {}
  addGroundOverlay() {}
  removeGroundOverlay() {}
  updateGroundOverlay() {}
  initMarkerCluster() {}
  addMarkers() {}
  removeMarkers() {}
  moveAlong() {}
  openMapAp() {}
  $getAppMap() {}
}

export const createMapContext = <API_TYPE_CREATE_MAP_CONTEXT>defineSyncApi(
  API_CREATE_MAP_CONTEXT,
  (id, context) => {
    if (context) {
      return new MapContext(id, context)
    }
    return new MapContext(id, getCurrentPageVm()!)
  },
  CreateMapContextProtocol
)
