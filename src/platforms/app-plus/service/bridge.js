export function requireNativePlugin (name) {
  return uni.requireNativePlugin(name)
}

export function unpack (args) {
  return args
}

export function invoke (...args) {
  return UniServiceJSBridge.invokeCallbackHandler(...args)
}

export function publish (...args) {
  return UniServiceJSBridge.publish(...args)
}

export function publishHandler (event, args, pageId) {
  // TODO
}
