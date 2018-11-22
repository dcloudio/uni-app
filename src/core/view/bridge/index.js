import Vue from 'vue'

import initSubscribe from './subscribe'

const Emitter = new Vue()

export const on = Emitter.$on.bind(Emitter)
export const off = Emitter.$off.bind(Emitter)
export const once = Emitter.$once.bind(Emitter)
export const emit = Emitter.$emit.bind(Emitter)

export function subscribe (event, callback) {
  return on('service.' + event, callback)
}

export function unsubscribe (event, callback) {
  return off('service.' + event, callback)
}

export function subscribeHandler (event, args, pageId) {
  emit('service.' + event, args, pageId)
}

export {
  publishHandler
}
  from 'uni-platform/view/bridge'

initSubscribe(subscribe)
