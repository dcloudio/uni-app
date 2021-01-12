export function pack (args) {
  return args
}

export function unpack (args) {
  return args
}

export function invoke (...args) {
  return UniServiceJSBridge.invokeCallbackHandler(...args)
}

export function remove (args) {
  return UniServiceJSBridge.removeCallbackHandler(args)
}
