import {
  publish
} from '../bridge'

const callbacks = {}
const WEB_INVOKE_APPSERVICE = 'WEB_INVOKE_APPSERVICE'
// 简单处理 view 层与 service 层的通知系统
/**
 * 消费 view 层通知
 */
export function consumePlusMessage (type, args) {
  // 处理 web-view 组件发送的通知
  if (type === WEB_INVOKE_APPSERVICE) {
    publish(WEB_INVOKE_APPSERVICE, args.data, args.webviewIds)
    return true
  }
  const callback = callbacks[type]
  if (callback) {
    callback(args)
    if (!callback.keepAlive) {
      delete callbacks[type]
    }
    return true
  }
  return false
}
/**
 * 注册 view 层通知 service 层事件处理
 */
export function registerPlusMessage (type, callback, keepAlive = true) {
  if (callbacks[type]) {
    return console.warn(`${type} 已注册:` + (callbacks[type].toString()))
  }
  callback.keepAlive = !!keepAlive
  callbacks[type] = callback
}
