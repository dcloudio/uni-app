import {
  isFn,
  isPlainObject
} from 'uni-shared'
import {
  getApiCallbacks
} from 'uni-helpers/utils'

let cid
let cidErrMsg

function normalizePushMessage (type, message) {
  try {
    const res = JSON.parse(message)
    if (type === 'receive') {
      if (res.payload) {
        if (res.aps) {
          res.payload.aps = res.aps
        }
        return res.payload
      }
    } else if (type === 'click') {
      delete res.type
      delete res.__UUID__
      delete res.appid
      if (res.aps && res.aps.alert) {
        res.title = res.aps.alert.title
      }
    }
  } catch (e) {}
  return message
}

export function invokePushCallback (
  args
) {
  if (args.type === 'clientId') {
    cid = args.cid
    cidErrMsg = args.errMsg
    invokeGetPushCidCallbacks(cid, args.errMsg)
  } else if (args.type === 'pushMsg') {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: 'receive',
        data: normalizePushMessage('receive', args.message)
      })
    })
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: 'click',
        data: normalizePushMessage('click', args.message)
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

export function getPushCid (args) {
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
  getPushCidCallbacks.push((cid, errMsg) => {
    let res
    if (cid) {
      res = {
        errMsg: 'getPushCid:ok',
        cid
      }
      hasSuccess && success(res)
    } else {
      res = {
        errMsg: 'getPushCid:fail' + (errMsg ? ' ' + errMsg : '')
      }
      hasFail && fail(res)
    }
    hasComplete && complete(res)
  })
  if (typeof cid !== 'undefined') {
    Promise.resolve().then(() => invokeGetPushCidCallbacks(cid, cidErrMsg))
  }
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
