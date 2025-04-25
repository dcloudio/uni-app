import {
  API_CREATE_LIVE_PUSHER_CONTEXT,
  type API_TYPE_CREATE_LIVE_PUSHER_CONTEXT,
  CreateLivePusherContextProtocol,
  defineSyncApi,
} from '@dcloudio/uni-api'
import {
  type CallBacks as cb,
  findElmById,
  invokeVmMethod,
  invokeVmMethodWithoutArgs,
} from '../util'
type CallBacks = Partial<cb>
class LivePusherContext implements UniApp.LivePusherContext {
  id: string
  ctx: any

  constructor(id: string, ctx: any) {
    this.id = id
    this.ctx = ctx
  }

  start(option?: CallBacks) {
    return invokeVmMethodWithoutArgs(this.ctx, 'start', option)
  }

  stop(option?: CallBacks) {
    return invokeVmMethodWithoutArgs(this.ctx, 'stop', option)
  }

  pause(option?: CallBacks) {
    return invokeVmMethodWithoutArgs(this.ctx, 'pause', option)
  }

  resume(option?: CallBacks) {
    return invokeVmMethodWithoutArgs(this.ctx, 'resume', option)
  }

  switchCamera(option?: CallBacks) {
    return invokeVmMethodWithoutArgs(this.ctx, 'switchCamera', option)
  }

  snapshot(option?: CallBacks) {
    return invokeVmMethodWithoutArgs(this.ctx, 'snapshot', option)
  }

  toggleTorch(option?: CallBacks) {
    return invokeVmMethodWithoutArgs(this.ctx, 'toggleTorch', option)
  }

  playBGM(option?: CallBacks) {
    return invokeVmMethod(this.ctx, 'playBGM', option)
  }

  stopBGM(option?: CallBacks) {
    return invokeVmMethodWithoutArgs(this.ctx, 'stopBGM', option)
  }

  pauseBGM(option?: CallBacks) {
    return invokeVmMethodWithoutArgs(this.ctx, 'pauseBGM', option)
  }

  resumeBGM(option?: CallBacks) {
    return invokeVmMethodWithoutArgs(this.ctx, 'resumeBGM', option)
  }

  setBGMVolume(option?: CallBacks) {
    return invokeVmMethod(this.ctx, 'setBGMVolume', option)
  }

  startPreview(option?: CallBacks) {
    return invokeVmMethodWithoutArgs(this.ctx, 'startPreview', option)
  }

  stopPreview(args?: CallBacks) {
    return invokeVmMethodWithoutArgs(this.ctx, 'stopPreview', args)
  }

  'setMICVolume': () => {}
}

// TODO
function publishToView(
  livePusherId: string,
  pageId: number,
  type: string,
  data?: unknown
) {
  UniServiceJSBridge.invokeViewMethod(
    'livepusher.' + livePusherId,
    {
      livePusherId,
      type,
      data,
    },
    pageId
  )
}

class LivePusherContextVue {
  private id: string
  private pageId: number
  constructor(id: string, pageId: number) {
    this.id = id
    this.pageId = pageId
  }

  start() {
    publishToView(this.id, this.pageId, 'start')
  }

  stop() {
    publishToView(this.id, this.pageId, 'stop')
  }

  pause() {
    publishToView(this.id, this.pageId, 'pause')
  }

  resume() {
    publishToView(this.id, this.pageId, 'resume')
  }

  switchCamera() {
    publishToView(this.id, this.pageId, 'switchCamera')
  }

  startPreview() {
    publishToView(this.id, this.pageId, 'preview')
  }

  stopPreview() {
    publishToView(this.id, this.pageId, 'stop')
  }

  snapshot() {
    publishToView(this.id, this.pageId, 'snapshot')
  }
}

export const createLivePusherContext =
  defineSyncApi<API_TYPE_CREATE_LIVE_PUSHER_CONTEXT>(
    API_CREATE_LIVE_PUSHER_CONTEXT,
    (id, vm) => {
      if (!vm) {
        return console.warn(
          'uni.createLivePusherContext: 2 arguments required, but only 1 present'
        )
      }
      if (vm.$page.meta.isNVue) {
        const elm = findElmById(id, vm)
        if (!elm) {
          return console.warn('Can not find `' + id + '`')
        }
        return new LivePusherContext(id, elm)
      }
      return new LivePusherContextVue(id, vm.$page.id)
    },
    CreateLivePusherContextProtocol
  )
