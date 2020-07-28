import { isFunction } from '@vue/shared'

import { invokeApi, wrapperReturnValue } from './interceptor'

const SYNC_API_RE = /^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/

const CONTEXT_API_RE = /^create|Manager$/

// Context例外情况
const CONTEXT_API_RE_EXC = ['createBLEConnection']

const TASK_APIS = ['request', 'downloadFile', 'uploadFile', 'connectSocket']

// 同步例外情况
const ASYNC_API = ['createBLEConnection']

const CALLBACK_API_RE = /^on|^off/

export function isContextApi(name: string) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1
}
export function isSyncApi(name: string) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1
}

export function isCallbackApi(name: string) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush'
}

export function isTaskApi(name: string) {
  return TASK_APIS.indexOf(name) !== -1
}

function handlePromise(promise: Promise<any>) {
  if (!__UNI_PROMISE_API__) {
    return promise
  }
  return promise
    .then(data => {
      return [null, data]
    })
    .catch(err => [err])
}

export function shouldPromise(name: string) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false
  }
  return true
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(
    onfinally?: (() => void) | undefined | null
  ) {
    const promise = this.constructor as PromiseConstructor
    return this.then(
      value => promise.resolve(onfinally && onfinally()).then(() => value),
      reason =>
        promise.resolve(onfinally && onfinally()).then(() => {
          throw reason
        })
    )
  }
}

export function promisify(name: string, api: unknown) {
  if (!shouldPromise(name)) {
    return api
  }
  if (!isFunction(api)) {
    return api
  }
  return function promiseApi(options: Record<string, any> = {}, ...params: []) {
    if (
      isFunction(options.success) ||
      isFunction(options.fail) ||
      isFunction(options.complete)
    ) {
      return wrapperReturnValue(name, invokeApi(name, api, options, ...params))
    }
    return wrapperReturnValue(
      name,
      handlePromise(
        new Promise((resolve, reject) => {
          invokeApi(
            name,
            api,
            Object.assign({}, options, {
              success: resolve,
              fail: reject
            }),
            ...params
          )
        })
      )
    )
  }
}
