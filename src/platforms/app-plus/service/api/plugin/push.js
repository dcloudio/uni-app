import {
  publish
} from '../../bridge'

let onPushing

let isListening = false

let unsubscribe = false

export function subscribePush (params, callbackId) {
  const clientInfo = plus.push.getClientInfo()
  if (clientInfo) {
    if (!isListening) {
      isListening = true
      plus.push.addEventListener('receive', msg => {
        if (onPushing && !unsubscribe) {
          publish('onPushMessage', {
            messageId: msg.__UUID__,
            data: msg.payload,
            errMsg: 'onPush:ok'
          })
        }
      })
    }
    unsubscribe = false
    clientInfo.errMsg = 'subscribePush:ok'
    return clientInfo
  } else {
    return {
      errMsg: 'subscribePush:fail:请确保当前运行环境已包含 push 模块'
    }
  }
}

export function unsubscribePush (params) {
  unsubscribe = true
  return {
    errMsg: 'unsubscribePush:ok'
  }
}

export function onPush () {
  if (!isListening) {
    return {
      errMsg: 'onPush:fail:请先调用 uni.subscribePush'
    }
  }
  if (plus.push.getClientInfo()) {
    onPushing = true
    return {
      errMsg: 'onPush:ok'
    }
  }
  return {
    errMsg: 'onPush:fail:请确保当前运行环境已包含 push 模块'
  }
}

export function offPush (params) {
  onPushing = false
  return {
    errMsg: 'offPush:ok'
  }
}
