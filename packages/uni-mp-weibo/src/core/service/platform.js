import api from 'uni-invoke-api'

/**
 * 执行内部平台方法
 */
export function invokeMethod (name, ...args) {
  return api[name].apply(null, args)
}
/**
 * 监听 service 层内部平台方法回调，与 publish 对应
 * @param {Object} name
 * @param {Object} callback
 */
export function onMethod (name, callback) {
  return UniServiceJSBridge.on('api.' + name, callback)
}

export function getCurrentPageVm (method) {
  const pages = getCurrentPages()
  const len = pages.length
  if (!len) {
    UniServiceJSBridge.emit('onError', `${method}:fail`)
  }
  const page = pages[len - 1]
  return page.$vm
}

export function getCurrentPageId () {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  return page && page.$page.id
}
