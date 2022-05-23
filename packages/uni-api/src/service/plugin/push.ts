import { isFunction, isPlainObject } from '@vue/shared'
import { getApiCallbacks } from '../../helpers/api/callback'

interface OnPushCidCallback {
  type: 'clientId'
  cid: string
  errMsg?: string
}

interface OnPushLineStateCallback {
  type: 'lineState'
  online: boolean
}

interface OnPushMsgCallback {
  type: 'pushMsg'
  message: unknown
}

interface OnPushClickCallback {
  type: 'click'
  message: unknown
}

let cid: string | undefined
let cidErrMsg: string | undefined
function normalizePushMessage(type: 'receive' | 'click', message: unknown) {
  try {
    const res = JSON.parse(message as string) as Record<string, any>
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
  } catch (e: any) {}
  return message
}
/**
 * @private
 * @param args
 */
export function invokePushCallback(
  args:
    | OnPushCidCallback
    | OnPushLineStateCallback
    | OnPushMsgCallback
    | OnPushClickCallback
) {
  if (args.type === 'clientId') {
    cid = args.cid
    cidErrMsg = args.errMsg
    invokeGetPushCidCallbacks(cid, args.errMsg)
  } else if (args.type === 'pushMsg') {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: 'receive',
        data: normalizePushMessage('receive', args.message),
      })
    })
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: 'click',
        data: normalizePushMessage('click', args.message),
      })
    })
  }
}

interface GetPushCidOptions {
  success?: OnPushMessageSuccess
}

const getPushCidCallbacks: ((cid?: string, errMsg?: string) => void)[] = []

function invokeGetPushCidCallbacks(cid?: string, errMsg?: string) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid, errMsg)
  })
  getPushCidCallbacks.length = 0
}

export function getPushCid(args: GetPushCidOptions) {
  if (!isPlainObject(args)) {
    args = {}
  }
  const { success, fail, complete } = getApiCallbacks(args)
  const hasSuccess = isFunction(success)
  const hasFail = isFunction(fail)
  const hasComplete = isFunction(complete)
  getPushCidCallbacks.push((cid?: string, errMsg?: string) => {
    let res: Record<string, unknown>
    if (cid) {
      res = { errMsg: 'getPushCid:ok', cid }
      hasSuccess && success(res)
    } else {
      res = { errMsg: 'getPushCid:fail' + (errMsg ? ' ' + errMsg : '') }
      hasFail && fail(res)
    }
    hasComplete && complete(res)
  })
  if (typeof cid !== 'undefined') {
    Promise.resolve().then(() => invokeGetPushCidCallbacks(cid, cidErrMsg))
  }
}

interface OnPushMessageSuccess {
  type: 'click' | 'receive'
  data: unknown
}

type OnPushMessageCallback = (result: OnPushMessageSuccess) => void
const onPushMessageCallbacks: OnPushMessageCallback[] = []
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
export const onPushMessage: (fn: OnPushMessageCallback) => void = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn)
  }
}

export const offPushMessage: (fn?: OnPushMessageCallback) => void = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0
  } else {
    const index = onPushMessageCallbacks.indexOf(fn)
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1)
    }
  }
}
