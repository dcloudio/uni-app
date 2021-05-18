import { getPageIdByVm, getCurrentPageVm } from '@dcloudio/uni-core'
import { operateMap } from '@dcloudio/uni-platform'
import { defineSyncApi } from '../../helpers/api'
import {
  API_CREATE_MAP_CONTEXT,
  API_TYPE_CREATE_MAP_CONTEXT,
  CreateMapContextProtocol,
} from '../../protocols/context/context'

export class MapContext implements UniApp.MapContext {
  private id: string
  private pageId: number
  constructor(id: string, pageId: number) {
    this.id = id
    this.pageId = pageId
  }
  getCenterLocation(options: any) {
    operateMap(this.id, this.pageId, 'getCenterLocation', options)
  }
  moveToLocation() {
    operateMap(this.id, this.pageId, 'moveToLocation')
  }
  getScale(options: any) {
    operateMap(this.id, this.pageId, 'getScale', options)
  }
  getRegion(options: any) {
    operateMap(this.id, this.pageId, 'getRegion', options)
  }
  includePoints(options: any) {
    operateMap(this.id, this.pageId, 'includePoints', options)
  }
  translateMarker(options: any) {
    operateMap(this.id, this.pageId, 'translateMarker', options)
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
      return new MapContext(id, getPageIdByVm(context)!)
    }
    return new MapContext(id, getPageIdByVm(getCurrentPageVm()!)!)
  },
  CreateMapContextProtocol
)
