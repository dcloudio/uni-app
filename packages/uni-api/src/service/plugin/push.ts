import { defineAsyncApi } from '../../helpers/api'

interface OnPushEnabledCallback {
  type: 'enabled'
  offline: boolean
}

interface OnPushClientIdCallback {
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
let enabled: boolean | undefined
let offline: boolean | undefined

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
    | OnPushEnabledCallback
    | OnPushClientIdCallback
    | OnPushLineStateCallback
    | OnPushMsgCallback
    | OnPushClickCallback
) {
  if (args.type === 'enabled') {
    enabled = true
    if (__PLATFORM__ === 'app') {
      offline = args.offline
    }
  } else if (args.type === 'clientId') {
    cid = args.cid
    cidErrMsg = args.errMsg
    invokeGetPushCidCallbacks(cid, args.errMsg)
  } else if (args.type === 'pushMsg') {
    const message: OnPushMessageSuccess = {
      type: 'receive',
      data: normalizePushMessage(args.message),
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
    // App 端且启用离线时，使用 getClientInfoAsync 来调用
    if (__PLATFORM__ === 'app' && offline) {
      plus.push.getClientInfoAsync(
        (info) => {
          resolve({ cid: info.clientid })
        },
        (res) => {
          reject(res.code + ': ' + res.message)
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
      getPushCidCallbacks.push((cid?: string, errMsg?: string) => {
        if (cid) {
          resolve({ cid })
        } else {
          reject(errMsg)
        }
      })
      if (typeof cid !== 'undefined') {
        invokeGetPushCidCallbacks(cid, cidErrMsg)
      }
    })
  }
)

interface OnPushMessageSuccess {
  type: 'click' | 'receive'
  data: unknown
  stopped?: boolean
}

type OnPushMessageCallback = (result: OnPushMessageSuccess) => void
const onPushMessageCallbacks: OnPushMessageCallback[] = []
let listening = false
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
export const onPushMessage: (fn: OnPushMessageCallback) => void = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn)
  }
  // 不能程序启动时就监听，因为离线事件，仅触发一次，框架监听后，无法转发给还没开始监听的开发者
  if (__PLATFORM__ === 'app' && !listening) {
    listening = true
    plus.push.addEventListener('click', (result) => {
      invokePushCallback({
        type: 'click',
        message: result,
      })
    })
    plus.push.addEventListener('receive', (result) => {
      invokePushCallback({
        type: 'pushMsg',
        message: result,
      })
    })
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
