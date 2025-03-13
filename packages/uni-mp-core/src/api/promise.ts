import { extend, isFunction } from '@vue/shared'

import { handlePromise } from '@dcloudio/uni-api/src/helpers/api/promise'
import {
  invokeApi,
  wrapperReturnValue,
} from '@dcloudio/uni-api/src/helpers/interceptor'

const SYNC_API_RE =
  /^\$|__f__|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|rpx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/

const SYNC_API_RE_X = /getElementById/

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
  if (__X__ && SYNC_API_RE_X.test(name)) {
    return true
  }
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1
}

export function isCallbackApi(name: string) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush'
}

export function isTaskApi(name: string) {
  return TASK_APIS.indexOf(name) !== -1
}

export function shouldPromise(name: string) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false
  }
  return true
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (
    onfinally?: (() => void) | undefined | null
  ) {
    const promise = this.constructor as PromiseConstructor
    return this.then(
      (value) => promise.resolve(onfinally && onfinally()).then(() => value),
      (reason) =>
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
  return function promiseApi(
    options: Record<string, any> = {},
    ...rest: unknown[]
  ) {
    if (
      isFunction(options.success) ||
      isFunction(options.fail) ||
      isFunction(options.complete)
    ) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest))
    }
    return wrapperReturnValue(
      name,
      handlePromise(
        new Promise((resolve, reject) => {
          invokeApi(
            name,
            api,
            extend({}, options, {
              success: resolve,
              fail: reject,
            }),
            rest
          )
        })
      )
    )
  }
}
