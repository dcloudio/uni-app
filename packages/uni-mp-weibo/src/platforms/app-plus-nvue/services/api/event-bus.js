let getEmitter

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

export default function initEventBus (getGlobalEmitter) {
  getEmitter = getGlobalEmitter
}
