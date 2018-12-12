import {
  isFn
} from 'uni-shared'

const SYNC_API_RE = /hideKeyboard|upx2px|canIUse|^create|Sync$|Manager$/

const CONTEXT_API_RE = /^create|Manager$/

const TASK_APIS = ['request', 'downloadFile', 'uploadFile', 'connectSocket']

const CALLBACK_API_RE = /^on/

export function isContextApi (name) {
  return CONTEXT_API_RE.test(name)
}
export function isSyncApi (name) {
  return SYNC_API_RE.test(name)
}

export function isCallbackApi (name) {
  return CALLBACK_API_RE.test(name)
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
  if (isSyncApi(name)) {
    return false
  }
  if (isCallbackApi(name)) {
    return false
  }
  return true
}

export function promisify (name, api) {
  if (!shouldPromise(name)) {
    return api
  }
  return function promiseApi (options = {}, ...params) {
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api(options, ...params)
    }
    return handlePromise(new Promise((resolve, reject) => {
      api(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params)
      /* eslint-disable no-extend-native */
      Promise.prototype.finally = function (callback) {
        const promise = this.constructor
        return this.then(
          value => promise.resolve(callback()).then(() => value),
          reason => promise.resolve(callback()).then(() => {
            throw reason
          })
        )
      }
    }))
  }
}
