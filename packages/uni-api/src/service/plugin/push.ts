import { isFunction, isPlainObject } from '@vue/shared'
import { getApiCallbacks } from '../../helpers/api/callback'

interface OnPushCidCallback {
  type: 'clientId'
  cid: string
}

interface OnPushLineStateCallback {
  type: 'lineState'
  online: boolean
}

interface OnPushMsgCallback {
  type: 'pushMsg'
  message: unknown
}

let cid: string = ''
/**
 * @private
 * @param args
 */
export function invokePushCallback(
  args: OnPushCidCallback | OnPushLineStateCallback | OnPushMsgCallback
) {
  if (args.type === 'clientId') {
    cid = args.cid
    invokeGetPushCidCallbacks(cid)
  } else if (args.type === 'pushMsg') {
    onPushMessageCallbacks.forEach((callback) => {
      callback({ data: args.message })
    })
  }
}

interface GetPushCidOptions {
  success?: OnPushMessageSuccess
}

const getPushCidCallbacks: ((cid?: string) => void)[] = []

function invokeGetPushCidCallbacks(cid?: string) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid)
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
  getPushCidCallbacks.push((cid?: string) => {
    let res: Record<string, unknown>
    if (cid) {
      res = { errMsg: 'getPushCid:ok', cid }
      hasSuccess && success(res)
    } else {
      res = { errMsg: 'getPushCid:fail' }
      hasFail && fail(res)
    }
    hasComplete && complete(res)
  })
  if (cid) {
    Promise.resolve().then(() => invokeGetPushCidCallbacks(cid))
  }
}

interface OnPushMessageSuccess {
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
