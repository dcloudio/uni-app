import { isArray, isFunction, isPromise } from '@vue/shared'

export enum HOOKS {
  INVOKE = 'invoke',
  SUCCESS = 'success',
  FAIL = 'fail',
  COMPLETE = 'complete',
  RETURN_VALUE = 'returnValue',
}

export type Interceptor = { [P in HOOKS]?: Function }

export type Interceptors = { [P in HOOKS]?: Function[] }

export const globalInterceptors: Interceptors = {}
export const scopedInterceptors: { [key: string]: Interceptors } = {}

function wrapperHook(hook: Function) {
  return function (data: unknown) {
    return hook(data) || data
  }
}

function queue(hooks: Function[], data: unknown): Promise<any> {
  let promise: any = false
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i]
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook))
    } else {
      const res = hook(data)
      if (isPromise(res)) {
        promise = Promise.resolve(res)
      }
      if (res === false) {
        return {
          then() {},
          catch() {},
        } as Promise<undefined>
      }
    }
  }
  return (
    promise || {
      then(callback: Function) {
        return callback(data)
      },
      catch() {},
    }
  )
}

function wrapperOptions(
  interceptors: Interceptors,
  options: Record<string, any> = {}
) {
  ;[HOOKS.SUCCESS, HOOKS.FAIL, HOOKS.COMPLETE].forEach((name) => {
    const hooks = interceptors[name]
    if (!isArray(hooks)) {
      return
    }
    const oldCallback = options[name]
    options[name] = function callbackInterceptor(res: unknown) {
      queue(hooks, res).then((res: unknown) => {
        return (isFunction(oldCallback) && oldCallback(res)) || res
      })
    }
  })
  return options
}

export function wrapperReturnValue(method: string, returnValue: unknown) {
  const returnValueHooks = []
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue)
  }
  const interceptor = scopedInterceptors[method]
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue)
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue
  })
  return returnValue
}

function getApiInterceptorHooks(method: string) {
  const interceptor = Object.create(null)
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== 'returnValue') {
      interceptor[hook] = (globalInterceptors[
        hook as HOOKS
      ] as Function[]).slice()
    }
  })
  const scopedInterceptor = scopedInterceptors[method]
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(
          scopedInterceptor[hook as HOOKS]
        )
      }
    })
  }
  return interceptor
}

export function invokeApi(
  method: string,
  api: Function,
  options: object,
  ...params: []
) {
  const interceptor = getApiInterceptorHooks(method)
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue(interceptor.invoke, options)
      return res.then((options) => {
        return api(wrapperOptions(interceptor, options), ...params)
      })
    } else {
      return api(wrapperOptions(interceptor, options), ...params)
    }
  }
  return api(options, ...params)
}
