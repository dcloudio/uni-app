export function invoke (...args) {
  return global.UniServiceJSBridge.invokeCallbackHandler(...args)
}

export function publish (name, ...args) {
  return global.UniServiceJSBridge.emit('api.' + name, ...args)
}
