import {
  isFn,
  isPlainObject
} from 'uni-shared'
import {
  getApiCallbacks
} from 'uni-helpers/utils'

let cid
let cidErrMsg
let enabled
let offline

function normalizePushMessage (message) {
  try {
    return JSON.parse(message)
  } catch (e) {}
  return message
}

export function invokePushCallback (
  args
) {
  if (args.type === 'enabled') {
    enabled = true
    if (__PLATFORM__ === 'app-plus') {
      offline = args.offline
    }
  } else if (args.type === 'clientId') {
    cid = args.cid
    cidErrMsg = args.errMsg
    invokeGetPushCidCallbacks(cid, args.errMsg)
  } else if (args.type === 'pushMsg') {
    const message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    }
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i]
      callback(message)
      // 该消息已被阻止
      if (message.stopped) {
        break
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      })
    })
  }
}

const getPushCidCallbacks = []

function invokeGetPushCidCallbacks (cid, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid, errMsg)
  })
  getPushCidCallbacks.length = 0
}

export function getPushClientId (args) {
  if (!isPlainObject(args)) {
    args = {}
  }
  const {
    success,
    fail,
    complete
  } = getApiCallbacks(args)
  const hasSuccess = isFn(success)
  const hasFail = isFn(fail)
  const hasComplete = isFn(complete)

  // App 端且启用离线时，使用 getClientInfoAsync 来调用
  if (__PLATFORM__ === 'app-plus' && offline) {
    plus.push.getClientInfoAsync(
      (info) => {
        const res = {
          errMsg: 'getPushClientId:ok',
          cid: info.clientid
        }
        hasSuccess && success(res)
        hasComplete && complete(res)
      },
      (res) => {
        res = {
          errMsg: 'getPushClientId:fail ' + (res.code + ': ' + res.message)
        }
        hasFail && fail(res)
        hasComplete && complete(res)
      }
    )
    return
  }

  Promise.resolve().then(() => {
    if (typeof enabled === 'undefined') {
      enabled = false
      cid = ''
      cidErrMsg = 'uniPush is not enabled'
    }
    getPushCidCallbacks.push((cid, errMsg) => {
      let res
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid
        }
        hasSuccess && success(res)
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        }
        hasFail && fail(res)
      }
      hasComplete && complete(res)
    })
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg)
    }
  })
}

const onPushMessageCallbacks = []
let listening = false
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
export const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn)
  }
  // 不能程序启动时就监听，因为离线事件，仅触发一次，框架监听后，无法转发给还没开始监听的开发者
  if (__PLATFORM__ === 'app-plus' && !listening) {
    listening = true
    plus.push.addEventListener('click', (result) => {
      invokePushCallback({
        type: 'click',
        message: result
      })
    })
    plus.push.addEventListener('receive', (result) => {
      invokePushCallback({
        type: 'pushMsg',
        message: result
      })
    })
  }
}

export const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0
  } else {
    const index = onPushMessageCallbacks.indexOf(fn)
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1)
    }
  }
}
