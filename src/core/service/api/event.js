import Vue from 'vue'

const getEmitter = (function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter
  }
  let Emitter
  return function getUniEmitter () {
    if (!Emitter) {
      Emitter = new Vue()
    }
    return Emitter
  }
})()

function apply (ctx, method, args) {
  return ctx[method].apply(ctx, args)
}

export function $on () {
  return apply(getEmitter(), '$on', [...arguments])
}
export function $off () {
  return apply(getEmitter(), '$off', [...arguments])
}
export function $once () {
  return apply(getEmitter(), '$once', [...arguments])
}
export function $emit () {
  return apply(getEmitter(), '$emit', [...arguments])
}
