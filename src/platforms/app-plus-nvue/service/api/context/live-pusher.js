import {
  findRefById,
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
  const ref = findRefById(id, vm)
  if (!ref) {
    global.nativeLog('Can not find `' + id + '`', '__WARN')
  }
  return new LivePusherContext(id, vm.$refs[ref])
}
