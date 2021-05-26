import { extend, isPlainObject, isFunction } from '@vue/shared'

import { API_SUCCESS, API_FAIL, API_COMPLETE } from './callback'

const callbacks = [API_SUCCESS, API_FAIL, API_COMPLETE]

function hasCallback(args: unknown) {
  if (
    isPlainObject(args) &&
    callbacks.find((cb) => isFunction((args as Record<string, any>)[cb]))
  ) {
    return true
  }
  return false
}

export function handlePromise(promise: Promise<unknown>) {
  if (__UNI_FEATURE_PROMISE__) {
    return promise
      .then((data) => {
        return [null, data]
      })
      .catch((err) => [err])
  }
  return promise
}

export function promisify(fn: Function) {
  return (args = {}) => {
    if (hasCallback(args)) {
      return fn(args)
    }
    return handlePromise(
      new Promise((resolve, reject) => {
        fn(extend(args, { success: resolve, fail: reject }))
      })
    )
  }
}
