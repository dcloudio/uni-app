export function invoke (...args) {
  return UniServiceJSBridge.invoke(...args)
}

export function publish (...args) {
  return UniServiceJSBridge.publish(...args)
}

export function publishHandler (event, args, pageId) {
  // TODO
}
