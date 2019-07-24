import api from 'uni-platform/service/api'

export function unpack (args) {
  return args
}

export function invoke (...args) {
  return UniServiceJSBridge.invokeCallbackHandler(...args)
}

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
