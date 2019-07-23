import {
  findElmById,
  invokeVmMethod,
  invokeVmMethodWithoutArgs
} from '../util'

class MapContext {
  constructor(id, ctx) {
    this.id = id
    this.ctx = ctx
  }

  getCenterLocation(cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'getCenterLocation', cbs)
  }

  moveToLocation() {
    return invokeVmMethodWithoutArgs(this.ctx, 'moveToLocation')
  }

  translateMarker(args) {
    return invokeVmMethod(this.ctx, 'translateMarker', args, ['animationEnd'])
  }

  includePoints(args) {
    return invokeVmMethod(this.ctx, 'includePoints', args)
  }

  getRegion(cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'getRegion', cbs)
  }

  getScale(cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'getScale', cbs)
  }
}

export function createMapContext(id, vm) {
  if (!vm) {
    global.nativeLog('uni.createMapContext 必须传入第二个参数，即当前 vm 对象(this)', '__WARN')
  }
  const elm = findElmById(id, vm)
  if (!elm) {
    global.nativeLog('Can not find `' + id + '`', '__WARN')
  }
  return new MapContext(id, elm)
}
