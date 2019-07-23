import {
  findElmById,
  invokeVmMethod,
  invokeVmMethodWithoutArgs
} from '../util'

class LivePusherContext {
  constructor (id, ctx) {
    this.id = id
    this.ctx = ctx
  }

  start (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'start', cbs)
  }

  stop (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'stop', cbs)
  }

  pause (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'pause', cbs)
  }

  resume (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'resume', cbs)
  }

  switchCamera (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'switchCamera', cbs)
  }

  snapshot (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'snapshot', cbs)
  }

  toggleTorch (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'toggleTorch', cbs)
  }

  playBGM (args) {
    return invokeVmMethod(this.ctx, 'playBGM', args)
  }

  stopBGM (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'stopBGM', cbs)
  }

  pauseBGM (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'pauseBGM', cbs)
  }

  resumeBGM (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'resumeBGM', cbs)
  }

  setBGMVolume (cbs) {
    return invokeVmMethod(this.ctx, 'setBGMVolume', cbs)
  }

  startPreview (cbs) {
    return invokeVmMethodWithoutArgs(this.ctx, 'startPreview', cbs)
  }

  stopPreview (args) {
    return invokeVmMethodWithoutArgs(this.ctx, 'stopPreview', args)
  }
}

export function createLivePusherContext (id, vm) {
  if (!vm) {
    global.nativeLog('uni.createLivePusherContext 必须传入第二个参数，即当前 vm 对象(this)', '__WARN')
  }
  const elm = findElmById(id, vm)
  if (!elm) {
    global.nativeLog('Can not find `' + id + '`', '__WARN')
  }
  return new LivePusherContext(id, elm)
}
