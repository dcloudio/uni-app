import {
  findRefById,
  invokeVmMethod,
  invokeVmMethodWithoutArgs
} from '../util'

class MapContext {
  constructor (id, ctx) {
    this.id = id
    this.ctx = ctx
  }

  getCenterLocation (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'getCenterLocation', cbs)
  }

  moveToLocation () {
    return invokeVmMethodWithoutArgs(this.ctx, 'moveToLocation')
  }

  translateMarker (args) {
    return invokeVmMethod(this.ctx, 'translateMarker', args, ['animationEnd'])
  }

  includePoints (args) {
    return invokeVmMethod(this.ctx, 'includePoints', args)
  }

  getRegion (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'getRegion', cbs)
  }

  getScale (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'getScale', cbs)
  }
}

export function createMapContext (id, vm) {
  const ref = findRefById(id, vm)
  if (!ref) {
    global.nativeLog('Can not find `' + id + '`', '__WARN')
  }
  return new MapContext(id, vm.$refs[ref])
}
