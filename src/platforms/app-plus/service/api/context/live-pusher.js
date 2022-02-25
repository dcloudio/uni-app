import {
  callback
} from 'uni-shared'

function operateLivePusher (livePusherId, pageVm, type, data) {
  const pageId = pageVm.$page.id
  UniServiceJSBridge.publishHandler(pageId + '-live-pusher-' + livePusherId, {
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

const methods = ['preview',
  'start',
  'stop',
  'pause',
  'resume',
  'switchCamera',
  'snapshot']

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
    operateLivePusher(this.id, this.pageVm, method, options)
  })
})

export function createLivePusherContext (id, context) {
  return new LivePusherContext(id, context)
}
