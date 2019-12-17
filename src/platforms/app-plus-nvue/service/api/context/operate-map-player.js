import {
  findElmById,
  invokeVmMethod,
  invokeVmMethodWithoutArgs
} from '../util'

const METHODS = {
  getCenterLocation (ctx, cbs) {
    return invokeVmMethodWithoutArgs(ctx, 'getCenterLocation', cbs)
  },
  moveToLocation (ctx) {
    return invokeVmMethodWithoutArgs(ctx, 'moveToLocation')
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
  }
}

export function operateMapPlayer (mapId, pageVm, type, data) {
  return METHODS[type](findElmById(mapId, pageVm), data)
}
