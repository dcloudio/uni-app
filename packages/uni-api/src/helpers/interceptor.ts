import { isArray, isFunction, isPromise } from '@vue/shared'

const HOOK_INVOKE = 'invoke'
const HOOK_SUCCESS = 'success'
const HOOK_FAIL = 'fail'
const HOOK_COMPLETE = 'complete'
const HOOK_RETURN_VALUE = 'returnValue'

export type HOOKS =
  | typeof HOOK_INVOKE
  | typeof HOOK_SUCCESS
  | typeof HOOK_FAIL
  | typeof HOOK_COMPLETE
  | typeof HOOK_RETURN_VALUE

export type Interceptor = { [P in HOOKS]?: Function }

export type Interceptors = { [P in HOOKS]?: Function[] }

export const globalInterceptors: Interceptors = {}
export const scopedInterceptors: { [key: string]: Interceptors } = {}

function wrapperHook(hook: Function, params?: Record<string, any>) {
  return function (data: unknown) {
    const result = hook(data, params);
    // 只有当结果为undefined或null时才返回data，保留false值
    return result === undefined || result === null ? data : result;
  }
}

function queue(
  hooks: Function[],
  data: unknown,
  params?: Record<string, any>
): Promise<any> {
  let promise: any = false
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i]
    if (promise) {
      const wrappedHook = wrapperHook(hook, params);
      promise = promise.then((data) => {
        const res = wrappedHook(data);
        if (isPromise(res)) {
          return res.then((res) => {
            if (res === false) {
              return { then() {}, catch() {} } as Promise<undefined>;
            }
            return res;
          });
        }
        if (res === false) {
          return { then() {}, catch() {} } as Promise<undefined>;
        }
        return res;
      });
    } else {
      const res = hook(data, params)
      if (isPromise(res)) {
        // 修改这里：处理异步返回 false 的情况
        promise = res.then((res) => {
          if (res === false) {
            return { then() {}, catch() {} } as Promise<undefined>;
          }
          return res;
        });
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
  ;[HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors[name as HOOKS]
    if (!isArray(hooks)) {
      return
    }
    const oldCallback = options[name]
    options[name] = function callbackInterceptor(res: unknown) {
      queue(hooks, res, options).then((res: unknown) => {
        return (isFunction(oldCallback) && oldCallback(res)) || res
      })
    }
  })
  return options
}

export function wrapperReturnValue(method: string, returnValue: unknown) {
  const returnValueHooks: Function[] = []
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
      interceptor[hook] = (
        globalInterceptors[hook as HOOKS] as Function[]
      ).slice()
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
  params: unknown[]
) {
  const interceptor = getApiInterceptorHooks(method)
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue(interceptor.invoke, options)
      return res.then((options) => {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api(
          wrapperOptions(getApiInterceptorHooks(method), options),
          ...params
        )
      })
    } else {
      return api(wrapperOptions(interceptor, options), ...params)
    }
  }
  return api(options, ...params)
}
