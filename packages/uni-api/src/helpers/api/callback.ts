import { isFunction, isPlainObject } from '@vue/shared'

import { tryCatch } from './catch'

let invokeCallbackId = 1

const invokeCallbacks: {
  [id: string]: {
    name: string
    keepAlive: boolean
    callback: Function
  }
} = {}

function addInvokeCallback(
  id: number,
  name: string,
  callback: Function,
  keepAlive: boolean = false
) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback,
  }
  return id
}

// onNativeEventReceive((event,data)=>{}) 需要两个参数，目前写死最多两个参数
export function invokeCallback(id: number, res: unknown, extras?: unknown) {
  if (typeof id === 'number') {
    const opts = invokeCallbacks[id]
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id]
      }
      return opts.callback(res, extras)
    }
  }
  return res
}

export function findInvokeCallbackByName(name: string) {
  for (const key in invokeCallbacks) {
    if (invokeCallbacks[key].name === name) {
      return true
    }
  }
  return false
}

export function removeKeepAliveApiCallback(name: string, callback: Function) {
  for (const key in invokeCallbacks) {
    const item = invokeCallbacks[key]
    if (item.callback === callback && item.name === name) {
      delete invokeCallbacks[key]
    }
  }
}

export function offKeepAliveApiCallback(name: string) {
  UniServiceJSBridge.off('api.' + name)
}

export function onKeepAliveApiCallback(name: string) {
  UniServiceJSBridge.on('api.' + name, (res: unknown) => {
    for (const key in invokeCallbacks) {
      const opts = invokeCallbacks[key]
      if (opts.name === name) {
        opts.callback(res)
      }
    }
  })
}

export function createKeepAliveApiCallback(name: string, callback: Function) {
  return addInvokeCallback(invokeCallbackId++, name, callback, true)
}

export const API_SUCCESS = 'success'
export const API_FAIL = 'fail'
export const API_COMPLETE = 'complete'

export type CALLBACK_TYPES =
  | typeof API_SUCCESS
  | typeof API_FAIL
  | typeof API_COMPLETE

type ApiCallbacks = {
  [key in CALLBACK_TYPES]?: Function
}

export function getApiCallbacks(args: Record<string, any>) {
  const apiCallbacks: ApiCallbacks = {}
  for (const name in args) {
    const fn = args[name]
    if (isFunction(fn)) {
      apiCallbacks[name as CALLBACK_TYPES] = tryCatch(fn)
      delete args[name]
    }
  }
  return apiCallbacks
}

interface ApiRes {
  errMsg: string
}

export function normalizeErrMsg(errMsg: string, name: string) {
  if (!errMsg || errMsg.indexOf(':fail') === -1) {
    return name + ':ok'
  }
  return name + errMsg.substring(errMsg.indexOf(':fail'))
}

export function createAsyncApiCallback(
  name: string,
  args: Record<string, any> = {},
  { beforeAll, beforeSuccess }: ApiOptions<any> = {}
) {
  if (!isPlainObject(args)) {
    args = {}
  }
  const { success, fail, complete } = getApiCallbacks(args)

  const hasSuccess = isFunction(success)
  const hasFail = isFunction(fail)
  const hasComplete = isFunction(complete)
  const callbackId = invokeCallbackId++
  addInvokeCallback(callbackId, name, (res: ApiRes) => {
    res = res || {}
    res.errMsg = normalizeErrMsg(res.errMsg, name)
    isFunction(beforeAll) && beforeAll(res)
    if (res.errMsg === name + ':ok') {
      isFunction(beforeSuccess) && beforeSuccess(res, args)
      hasSuccess && success(res)
    } else {
      hasFail && fail(res)
    }
    hasComplete && complete(res)
  })
  return callbackId
}
