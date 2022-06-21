import { defineAsyncApi } from '../../helpers/api'

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
function normalizePushMessage(message: unknown) {
  try {
    return JSON.parse(message as string) as Record<string, any>
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
        data: normalizePushMessage(args.message),
      })
    })
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message),
      })
    })
  }
}

const getPushCidCallbacks: ((cid?: string, errMsg?: string) => void)[] = []

function invokeGetPushCidCallbacks(cid?: string, errMsg?: string) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid, errMsg)
  })
  getPushCidCallbacks.length = 0
}

const API_GET_PUSH_CLIENT_ID = 'getPushClientId'
export const getPushClientId = defineAsyncApi(
  API_GET_PUSH_CLIENT_ID,
  (_, { resolve, reject }) => {
    getPushCidCallbacks.push((cid?: string, errMsg?: string) => {
      if (cid) {
        resolve({ cid })
      } else {
        reject(errMsg)
      }
    })
    if (typeof cid !== 'undefined') {
      Promise.resolve().then(() => invokeGetPushCidCallbacks(cid, cidErrMsg))
    }
  }
)

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
