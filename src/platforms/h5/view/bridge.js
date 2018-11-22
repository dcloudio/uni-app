export function publishHandler (event, args, pageId) {
  // h5 平台直接调用UniServiceJSBridge
  global.UniServiceJSBridge.subscribeHandler(event, args, pageId)
}
