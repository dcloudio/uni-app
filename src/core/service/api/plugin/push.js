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
  Promise.resolve().then(() => {
    if (typeof enabled === 'undefined') {
      enabled = false
      cid = ''
      cidErrMsg = 'unipush is not enabled'
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
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
export const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn)
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
