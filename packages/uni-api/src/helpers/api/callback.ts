import { isFunction, isPlainObject } from '@vue/shared'
import { ApiOptions } from '../../protocols/type'

import { tryCatch } from './catch'

let invokeCallbackId = 1

const invokeCallbacks: {
  [id: string]: {
    name: string
    keepAlive: boolean
    callback: Function
  }
} = {}

function createInvokeCallbackName(name: string, callbackId: number) {
  return 'api.' + name + '.' + callbackId
}

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

function getKeepAliveApiCallback(name: string, callback: Function) {
  const onName = 'api.' + name.replace('off', 'on')
  for (const key in invokeCallbacks) {
    const item = invokeCallbacks[key]
    if (item.callback === callback && item.name.indexOf(onName) === 0) {
      delete invokeCallbacks[key]
      return Number(key)
    }
  }
  return -1
}

export function createKeepAliveApiCallback(name: string, callback: Function) {
  if (name.indexOf('off') === 0) {
    return getKeepAliveApiCallback(name, callback)
  }
  const id = invokeCallbackId++
  return addInvokeCallback(
    id,
    createInvokeCallbackName(name, id),
    callback,
    true
  )
}

const API_SUCCSS = 'success'
const API_FAIL = 'fail'
const API_COMPLETE = 'complete'

type CALLBACK_TYPES = typeof API_SUCCSS | typeof API_FAIL | typeof API_COMPLETE

type ApiCallbacks = {
  [key in CALLBACK_TYPES]?: Function
}

function getApiCallbacks(args: Record<string, any>) {
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
  { beforeAll, beforeSuccess }: ApiOptions = {}
) {
  if (!isPlainObject(args)) {
    args = {}
  }
  const { success, fail, complete } = getApiCallbacks(args)

  const hasSuccess = isFunction(success)
  const hasFail = isFunction(fail)
  const hasComplete = isFunction(complete)
  const callbackId = invokeCallbackId++
  addInvokeCallback(
    callbackId,
    createInvokeCallbackName(name, callbackId),
    (res: ApiRes) => {
      res.errMsg = normalizeErrMsg(res.errMsg, name)
      isFunction(beforeAll) && beforeAll(res)
      if (res.errMsg === name + ':ok') {
        isFunction(beforeSuccess) && beforeSuccess(res)
        hasSuccess && success!(res)
      } else {
        hasFail && fail!(res)
      }
      hasComplete && complete!(res)
    }
  )
  return callbackId
}
