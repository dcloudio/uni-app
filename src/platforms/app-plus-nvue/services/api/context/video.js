import {
  findRefById,
  invokeVmMethod,
  invokeVmMethodWithoutArgs
} from '../util'

class VideoContext {
  constructor (id, ctx) {
    this.id = id
    this.ctx = ctx
  }

  play () {
    return invokeVmMethodWithoutArgs(this.ctx, 'play')
  }

  pause () {
    return invokeVmMethodWithoutArgs(this.ctx, 'pause')
  }

  seek (args) {
    return invokeVmMethod(this.ctx, 'seek', args)
  }

  stop () {
    return invokeVmMethodWithoutArgs(this.ctx, 'stop')
  }

  sendDanmu (args) {
    return invokeVmMethod(this.ctx, 'sendDanmu', args)
  }

  playbackRate (args) {
    return invokeVmMethod(this.ctx, 'playbackRate', args)
  }

  requestFullScreen (args) {
    return invokeVmMethod(this.ctx, 'requestFullScreen', args)
  }

  exitFullScreen () {
    return invokeVmMethodWithoutArgs(this.ctx, 'exitFullScreen')
  }

  showStatusBar () {
    return invokeVmMethodWithoutArgs(this.ctx, 'showStatusBar')
  }

  hideStatusBar () {
    return invokeVmMethodWithoutArgs(this.ctx, 'hideStatusBar')
  }
}

export function createVideoContext (id, vm) {
  const ref = findRefById(id, vm)
  if (!ref) {
    global.nativeLog('Can not find `' + id + '`', '__WARN')
  }
  return new VideoContext(id, vm.$refs[ref])
}
