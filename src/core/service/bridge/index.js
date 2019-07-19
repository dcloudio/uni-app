import Vue from 'vue'

import initOn from './on'
import initSubscribe from './subscribe'

const Emitter = new Vue()

export const on = Emitter.$on.bind(Emitter)
export const off = Emitter.$off.bind(Emitter)
export const once = Emitter.$once.bind(Emitter)
export const emit = Emitter.$emit.bind(Emitter)

export {
  invokeCallbackHandler
}
  from 'uni-helpers/api'

export function subscribe (event, callback) {
  return on('view.' + event, callback)
}

export function unsubscribe (event, callback) {
  return off('view.' + event, callback)
}

export function subscribeHandler (event, args, pageId) {
  return emit('view.' + event, args, pageId)
}

export {
  publishHandler
}
  from 'uni-platform/service/bridge'

initOn(on, {
  getApp,
  getCurrentPages
})

initSubscribe(subscribe)
