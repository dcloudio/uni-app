import { isArray, isFunction, isPlainObject } from '@vue/shared'

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
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook as HOOKS])) {
      removeHook(
        interceptors[hook as HOOKS],
        interceptor[hook as HOOKS] as Function
      )
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

function removeHook(hooks: Function[] | undefined, hook: Function) {
  if (!hooks) {
    return
  }
  const index = hooks.indexOf(hook)
  if (index !== -1) {
    hooks.splice(index, 1)
  }
}

export const addInterceptor = defineSyncApi(
  API_ADD_INTERCEPTOR,
  (method: string | Interceptor, interceptor: Interceptor | undefined) => {
    if (typeof method === 'string' && isPlainObject(interceptor)) {
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
    if (typeof method === 'string') {
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
