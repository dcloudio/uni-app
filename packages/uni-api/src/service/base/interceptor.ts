import {
  isArray,
  isFunction,
  isPlainObject,
  isString,
  remove,
} from '@vue/shared'

import {
  HOOKS,
  Interceptor,
  scopedInterceptors,
  globalInterceptors,
  Interceptors,
} from '../../helpers/interceptor'

import { defineSyncApi } from '../../helpers/api'

import {
  API_ADD_INTERCEPTOR,
  API_REMOVE_INTERCEPTOR,
  AddInterceptorProtocol,
  RemoveInterceptorProtocol,
} from '../../protocols/base/interceptor'

function mergeInterceptorHook(
  interceptors: Interceptors,
  interceptor: Interceptor
) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook as HOOKS])) {
      interceptors[hook as HOOKS] = mergeHook(
        interceptors[hook as HOOKS],
        interceptor[hook as HOOKS]
      )
    }
  })
}

function removeInterceptorHook(
  interceptors: Interceptors,
  interceptor: Interceptor
) {
  if (!interceptors || !interceptor) {
    return
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors[name as HOOKS]
    const hook = interceptor[name as HOOKS]
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook)
    }
  })
}

function mergeHook(
  parentVal: Function[] | undefined,
  childVal: Function[] | Function | undefined
) {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : isArray(childVal)
      ? childVal
      : [childVal]
    : parentVal
  return res ? dedupeHooks(res) : res
}

function dedupeHooks(hooks: Function[]) {
  const res: Function[] = []
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i])
    }
  }
  return res
}

export const addInterceptor = defineSyncApi(
  API_ADD_INTERCEPTOR,
  (method: string | Interceptor, interceptor: Interceptor | undefined) => {
    if (isString(method) && isPlainObject(interceptor)) {
      mergeInterceptorHook(
        scopedInterceptors[method] || (scopedInterceptors[method] = {}),
        interceptor
      )
    } else if (isPlainObject(method)) {
      mergeInterceptorHook(globalInterceptors, method as Interceptor)
    }
  },
  AddInterceptorProtocol
)

export const removeInterceptor = defineSyncApi(
  API_REMOVE_INTERCEPTOR,
  (method: string | Interceptor, interceptor: Interceptor | undefined) => {
    if (isString(method)) {
      if (isPlainObject(interceptor)) {
        removeInterceptorHook(scopedInterceptors[method], interceptor)
      } else {
        delete scopedInterceptors[method]
      }
    } else if (isPlainObject(method)) {
      removeInterceptorHook(globalInterceptors, method)
    }
  },
  RemoveInterceptorProtocol
)

export const interceptors = {}
