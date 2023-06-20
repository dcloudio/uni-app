import {
  createLivePusherContext as createNVueLivePusherContext
} from 'uni-platforms/app-plus-nvue/service/api/context/live-pusher'
import {
  callback
} from 'uni-shared'

function operateLivePusher (livePusherId, pageVm, type, data) {
  const pageId = pageVm.$page.id
  UniServiceJSBridge.publishHandler(pageId + '-livepusher-' + livePusherId, {
    livePusherId,
    type,
    data
  }, pageId)
}

UniServiceJSBridge.subscribe('onLivePusherMethodCallback', ({
  callbackId,
  data
}) => {
  callback.invoke(callbackId, data)
})

const methods = [
  'start',
  'stop',
  'pause',
  'resume',
  'switchCamera',
  'startPreview',
  'stopPreview',
  'snapshot'
]

const methodMapping = {
  startPreview: 'preview',
  stopPreview: 'stop'
}

export class LivePusherContext {
  constructor (id, pageVm) {
    this.id = id
    this.pageVm = pageVm
  }

  on (name, callback) {
    operateLivePusher(this.id, this.pageVm, 'on', {
      name,
      callback
    })
  }
}

methods.forEach(function (method) {
  LivePusherContext.prototype[method] = callback.warp(function (options, callbackId) {
    options.callbackId = callbackId
    const methodName = methodMapping[method] ? methodMapping[method] : method
    operateLivePusher(this.id, this.pageVm, methodName, options)
  })
})

export function createLivePusherContext (id, context) {
  if (context.$page.meta.isNVue) {
    return createNVueLivePusherContext(id, context)
  }
  return new LivePusherContext(id, context)
}
