export function invoke (...args) {
  return global.UniServiceJSBridge.invokeCallbackHandler(...args)
}
