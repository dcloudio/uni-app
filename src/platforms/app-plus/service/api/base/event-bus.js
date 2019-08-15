const Emitter = new Vue()

function apply (ctx, method, args) {
  return ctx[method].apply(ctx, args)
}

export function $on () {
  return apply(Emitter, '$on', [...arguments])
}

export function $off () {
  return apply(Emitter, '$off', [...arguments])
}

export function $once () {
  return apply(Emitter, '$once', [...arguments])
}

export function $emit () {
  return apply(Emitter, '$emit', [...arguments])
}
