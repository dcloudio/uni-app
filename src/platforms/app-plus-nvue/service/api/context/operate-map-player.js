import {
  findElmById,
  invokeVmMethod,
  invokeVmMethodWithoutArgs
} from '../util'

const METHODS = {
  getCenterLocation (ctx, cbs) {
    return invokeVmMethodWithoutArgs(ctx, 'getCenterLocation', cbs)
  },
  moveToLocation (ctx, args) {
    return invokeVmMethod(ctx, 'moveToLocation', args)
  },
  translateMarker (ctx, args) {
    return invokeVmMethod(ctx, 'translateMarker', args, ['animationEnd'])
  },
  includePoints (ctx, args) {
    return invokeVmMethod(ctx, 'includePoints', args)
  },
  getRegion (ctx, cbs) {
    return invokeVmMethodWithoutArgs(ctx, 'getRegion', cbs)
  },
  getScale (ctx, cbs) {
    return invokeVmMethodWithoutArgs(ctx, 'getScale', cbs)
  },
  addCustomLayer (ctx, args) {
    return invokeVmMethod(ctx, 'addCustomLayer', args)
  },
  removeCustomLayer (ctx, args) {
    return invokeVmMethod(ctx, 'removeCustomLayer', args)
  },
  addGroundOverlay (ctx, args) {
    return invokeVmMethod(ctx, 'addGroundOverlay', args)
  },
  removeGroundOverlay (ctx, args) {
    return invokeVmMethod(ctx, 'removeGroundOverlay', args)
  },
  updateGroundOverlay (ctx, args) {
    return invokeVmMethod(ctx, 'updateGroundOverlay', args)
  },
  initMarkerCluster (ctx, args) {
    return invokeVmMethod(ctx, 'initMarkerCluster', args)
  },
  addMarkers (ctx, args) {
    return invokeVmMethod(ctx, 'addMarkers', args)
  },
  removeMarkers (ctx, args) {
    return invokeVmMethod(ctx, 'removeMarkers', args)
  },
  moveAlong (ctx, args) {
    return invokeVmMethod(ctx, 'moveAlong', args)
  },
  openMapApp (ctx, args) {
    return invokeVmMethod(ctx, 'openMapApp', args)
  },
  on (ctx, args) {
    return ctx.on(args.name, args.callback)
  }
}

export function operateMapPlayer (mapId, pageVm, type, data) {
  return METHODS[type](findElmById(mapId, pageVm), data)
}
