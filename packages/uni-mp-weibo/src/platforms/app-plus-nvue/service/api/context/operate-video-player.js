import {
  findElmById,
  invokeVmMethod,
  invokeVmMethodWithoutArgs
} from '../util'

const METHODS = {
  play (ctx) {
    return invokeVmMethodWithoutArgs(ctx, 'play')
  },
  pause (ctx) {
    return invokeVmMethodWithoutArgs(ctx, 'pause')
  },
  seek (ctx, args) {
    return invokeVmMethod(ctx, 'seek', args.position)
  },
  stop (ctx) {
    return invokeVmMethodWithoutArgs(ctx, 'stop')
  },
  sendDanmu (ctx, args) {
    return invokeVmMethod(ctx, 'sendDanmu', args)
  },
  playbackRate (ctx, args) {
    return invokeVmMethod(ctx, 'playbackRate', args.rate)
  },
  requestFullScreen (ctx, args) {
    return invokeVmMethod(ctx, 'requestFullScreen', args)
  },
  exitFullScreen (ctx) {
    return invokeVmMethodWithoutArgs(ctx, 'exitFullScreen')
  },
  showStatusBar (ctx) {
    return invokeVmMethodWithoutArgs(ctx, 'showStatusBar')
  },
  hideStatusBar (ctx) {
    return invokeVmMethodWithoutArgs(ctx, 'hideStatusBar')
  }
}

export function operateVideoPlayer (videoId, pageVm, type, data) {
  return METHODS[type](findElmById(videoId, pageVm), data)
}
