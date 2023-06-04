import { extend, isPlainObject, isFunction } from '@vue/shared'
import { invokeApi, wrapperReturnValue } from '../interceptor'

import { API_SUCCESS, API_FAIL, API_COMPLETE } from './callback'

function hasCallback(args: unknown) {
  if (
    isPlainObject(args) &&
    [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) =>
      isFunction((args as Record<string, any>)[cb])
    )
  ) {
    return true
  }
  return false
}

export function handlePromise(promise: Promise<unknown>) {
  // if (__UNI_FEATURE_PROMISE__) {
  //   return promise
  //     .then((data) => {
  //       return [null, data]
  //     })
  //     .catch((err) => [err])
  // }
  return promise
}

export function promisify(name: string, fn: Function) {
  return (args = {}, ...rest: unknown[]) => {
    try {
      // @ts-ignore
      if (__PLATFORM__ === 'mp-weibo' && window.weibo && window.weibo[name]) {
        // @ts-ignore
        window.currentWeiboApiName = name
        // @ts-ignore
        const value = window.weibo[name](args)
        if (name !== 'switchTab') {
          return value
        }
      }
    } catch (e) {}
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest))
    }
    return wrapperReturnValue(
      name,
      handlePromise(
        new Promise((resolve, reject) => {
          invokeApi(
            name,
            fn,
            extend(args, { success: resolve, fail: reject }),
            rest
          )
        })
      )
    )
  }
}
