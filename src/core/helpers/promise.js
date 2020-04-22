import {
  isFn
} from 'uni-shared'

import {
  invokeApi,
  wrapperReturnValue
} from './interceptor'

const SYNC_API_RE =
  /^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/

const CONTEXT_API_RE = /^create|Manager$/

// Context例外情况
const CONTEXT_API_RE_EXC = ['createBLEConnection']

const TASK_APIS = ['request', 'downloadFile', 'uploadFile', 'connectSocket']

// 同步例外情况
const ASYNC_API = ['createBLEConnection']

const CALLBACK_API_RE = /^on|^off/

export function isContextApi (name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1
}
export function isSyncApi (name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1
}

export function isCallbackApi (name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush'
}

export function isTaskApi (name) {
  return TASK_APIS.indexOf(name) !== -1
}

function handlePromise (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

export function shouldPromise (name) {
  if (
    isContextApi(name) ||
    isSyncApi(name) ||
    isCallbackApi(name)
  ) {
    return false
  }
  return true
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
}

export function promisify (name, api) {
  if (!shouldPromise(name)) {
    return api
  }
  return function promiseApi (options = {}, ...params) {
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, ...params))
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params)
    })))
  }
}
