import { getPageIdByVm, getCurrentPageVm } from '@dcloudio/uni-core'
import { operateMap } from '@dcloudio/uni-platform'
import { defineSyncApi } from '../../helpers/api'
import {
  API_CREATE_MAP_CONTEXT,
  API_TYPE_CREATE_MAP_CONTEXT,
  CreateMapContextProtocol,
} from '../../protocols/context/context'

const operateMapCallback = (
  options: { fail?: Function; success?: Function; complete?: Function },
  res: { errMsg: string; [propName: string]: any }
) => {
  const errMsg = res.errMsg || ''
  if (new RegExp('\\:\\s*fail').test(errMsg)) {
    options.fail && options.fail(res)
  } else {
    options.success && options.success(res)
  }
  options.complete && options.complete(res)
}

const operateMapWrap = (
  id: string,
  pageId: number,
  type: string,
  options?: any
) => {
  operateMap(id, pageId, type, options, (res) => {
    options && operateMapCallback(options, res)
  })
}

export class MapContext implements UniApp.MapContext {
  private id: string
  private pageId: number
  constructor(id: string, pageId: number) {
    this.id = id
    this.pageId = pageId
  }
  getCenterLocation(options: any) {
    operateMapWrap(this.id, this.pageId, 'getCenterLocation', options)
  }
  moveToLocation(options: any) {
    operateMapWrap(this.id, this.pageId, 'moveToLocation', options)
  }
  getScale(options: any) {
    operateMapWrap(this.id, this.pageId, 'getScale', options)
  }
  getRegion(options: any) {
    operateMapWrap(this.id, this.pageId, 'getRegion', options)
  }
  includePoints(options: any) {
    operateMapWrap(this.id, this.pageId, 'includePoints', options)
  }
  translateMarker(options: any) {
    operateMapWrap(this.id, this.pageId, 'translateMarker', options)
  }
  $getAppMap() {
    if (__PLATFORM__ === 'app') {
      return plus.maps.getMapById(this.pageId + '-map-' + this.id)
    }
  }
  addCustomLayer(options: any) {
    operateMapWrap(this.id, this.pageId, 'addCustomLayer', options)
  }
  removeCustomLayer(options: any) {
    operateMapWrap(this.id, this.pageId, 'removeCustomLayer', options)
  }
  addGroundOverlay(options: any) {
    operateMapWrap(this.id, this.pageId, 'addGroundOverlay', options)
  }
  removeGroundOverlay(options: any) {
    operateMapWrap(this.id, this.pageId, 'removeGroundOverlay', options)
  }
  updateGroundOverlay(options: any) {
    operateMapWrap(this.id, this.pageId, 'updateGroundOverlay', options)
  }
  initMarkerCluster(options: any) {
    operateMapWrap(this.id, this.pageId, 'initMarkerCluster', options)
  }
  addMarkers(options: any) {
    operateMapWrap(this.id, this.pageId, 'addMarkers', options)
  }
  removeMarkers(options: any) {
    operateMapWrap(this.id, this.pageId, 'removeMarkers', options)
  }
  moveAlong(options: any) {
    operateMapWrap(this.id, this.pageId, 'moveAlong', options)
  }
  setLocMarkerIcon(options: any) {
    operateMapWrap(this.id, this.pageId, 'setLocMarkerIcon', options)
  }
  openMapApp(options: any) {
    operateMapWrap(this.id, this.pageId, 'openMapApp', options)
  }
  on(name: string, callback: (...args: any[]) => void) {
    operateMapWrap(this.id, this.pageId, 'on', { name, callback })
  }
}

export const createMapContext = defineSyncApi<API_TYPE_CREATE_MAP_CONTEXT>(
  API_CREATE_MAP_CONTEXT,
  (id, context) => {
    if (context) {
      return new MapContext(id, getPageIdByVm(context)!)
    }
    return new MapContext(id, getPageIdByVm(getCurrentPageVm()!)!)
  },
  CreateMapContextProtocol
)
