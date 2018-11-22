export function publishHandler (event, args, pageId) {
  // h5 平台直接调用UniViewJSBridge
  global.UniViewJSBridge.subscribeHandler(event, args, pageId)
}
