/**
 * 触发 service 层，与 onMethod 对应
 */
export function publish (name, res) {
  return UniServiceJSBridge.emit('api.' + name, res)
}

export function publishHandler (event, args, pageId) {
  // h5 平台直接调用UniViewJSBridge
  global.UniViewJSBridge.subscribeHandler(event, args, pageId)
}
