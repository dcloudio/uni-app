import { extend, isPlainObject } from '@vue/shared'
import { ApiOptions, ApiProtocols } from '../../protocols/type'
import { API_TYPE_ON_PROTOCOLS, validateProtocols } from '../protocol'
import {
  invokeCallback,
  createAsyncApiCallback,
  onKeepAliveApiCallback,
  offKeepAliveApiCallback,
  findInvokeCallbackByName,
  createKeepAliveApiCallback,
  removeKeepAliveApiCallback,
} from './callback'
import { promisify } from './promise'

export const API_TYPE_ON = 0
export const API_TYPE_OFF = 1
export const API_TYPE_TASK = 2
export const API_TYPE_SYNC = 3
export const API_TYPE_ASYNC = 4

type API_TYPES =
  | typeof API_TYPE_ON
  | typeof API_TYPE_OFF
  | typeof API_TYPE_TASK
  | typeof API_TYPE_SYNC
  | typeof API_TYPE_ASYNC

interface AsyncMethodOptionLike {
  success?: (...args: any[]) => void
}

type PromisifySuccessResult<P, R> = P extends {
  success: any
}
  ? void
  : P extends { fail: any }
  ? void
  : P extends { complete: any }
  ? void
  : Promise<R>

type TaskApiLike = (args: any) => any

type AsyncApiLike = (args: any) => Promise<unknown> | void

type AsyncApiOptions<T extends AsyncApiLike> = Parameters<T>[0]

type AsyncApiRes<T extends AsyncMethodOptionLike> = Parameters<
  Exclude<T['success'], undefined>
>[0]

type AsyncApiRequired<T extends AsyncMethodOptionLike> = <P extends T>(
  args: P
) => PromisifySuccessResult<P, AsyncApiRes<T>>

type AsyncApiOptional<T extends AsyncMethodOptionLike> = <P extends T>(
  args?: P
) => PromisifySuccessResult<P, AsyncApiRes<T>>

interface AsyncApiOptionalOptions {
  success?: any
  fail?: any
  complete?: any
}

type AsyncApi<
  T extends AsyncMethodOptionLike
> = AsyncApiOptionalOptions extends T
  ? AsyncApiOptional<T>
  : AsyncApiRequired<T>

function formatApiArgs(args: any[], options?: ApiOptions) {
  const params = args[0]
  if (
    !options ||
    (!isPlainObject(options.formatArgs) && isPlainObject(params))
  ) {
    return args
  }
  const formatArgs = options.formatArgs!
  Object.keys(formatArgs).forEach((name) => {
    formatArgs[name](args[0][name], params)
  })
  return args
}

function wrapperOnApi(name: string, fn: Function) {
  return (callback: Function) => {
    // 是否是首次调用on,如果是首次，需要初始化onMethod监听
    const isFirstInvokeOnApi = !findInvokeCallbackByName(name)
    createKeepAliveApiCallback(name, callback)
    if (isFirstInvokeOnApi) {
      onKeepAliveApiCallback(name)
      fn()
    }
  }
}

function wrapperOffApi(name: string, fn: Function) {
  return (callback: Function) => {
    name = name.replace('off', 'on')
    removeKeepAliveApiCallback(name, callback)
    // 是否还存在监听，若已不存在，则移除onMethod监听
    const hasInvokeOnApi = findInvokeCallbackByName(name)
    if (!hasInvokeOnApi) {
      offKeepAliveApiCallback(name)
      fn()
    }
  }
}

function invokeSuccess(id: number, name: string, res: unknown) {
  return invokeCallback(id, extend(res || {}, { errMsg: name + ':ok' }))
}

function invokeFail(id: number, name: string, err: string) {
  return invokeCallback(id, { errMsg: name + ':fail' + (err ? ' ' + err : '') })
}

function wrapperTaskApi(name: string, fn: Function, options?: ApiOptions) {
  return (args: Record<string, any>) => {
    const id = createAsyncApiCallback(name, args, options)
    return fn(args, {
      resolve: (res: unknown) => invokeSuccess(id, name, res),
      reject: (err: string) => invokeFail(id, name, err),
    })
  }
}

function wrapperSyncApi(fn: Function) {
  return (...args: any[]) => fn.apply(null, args)
}

function wrapperAsyncApi(
  name: string,
  fn: (args: unknown) => Promise<unknown>,
  options?: ApiOptions
) {
  return (args: Record<string, any>) => {
    const id = createAsyncApiCallback(name, args, options)
    fn(args)
      .then((res) => invokeSuccess(id, name, res))
      .catch((err) => invokeFail(id, name, err))
  }
}

function wrapperApi(
  fn: Function,
  name?: string,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  return function (...args: any[]) {
    if (__DEV__) {
      const errMsg = validateProtocols(name!, args, protocol)
      if (errMsg) {
        return errMsg
      }
    }
    return fn.apply(null, formatApiArgs(args, options))
  }
}

export function defineOnApi<T extends Function>(
  name: string,
  fn: () => void,
  options?: ApiOptions
) {
  return (defineApi(
    API_TYPE_ON,
    name,
    fn,
    __DEV__ ? API_TYPE_ON_PROTOCOLS : undefined,
    options
  ) as unknown) as T
}

export function defineOffApi<T extends Function>(
  name: string,
  fn: () => void,
  options?: ApiOptions
) {
  return (defineApi(
    API_TYPE_OFF,
    name,
    fn,
    __DEV__ ? API_TYPE_ON_PROTOCOLS : undefined,
    options
  ) as unknown) as T
}

export function defineTaskApi<T extends TaskApiLike, P = AsyncApiOptions<T>>(
  name: string,
  fn: (
    args: Omit<P, 'success' | 'fail' | 'complete'>,
    res: {
      resolve: (res: AsyncApiRes<P>) => void
      reject: (err?: string) => void
    }
  ) => ReturnType<T>,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  return (promisify(
    defineApi(API_TYPE_TASK, name, fn, __DEV__ ? protocol : undefined, options)
  ) as unknown) as T
}

export function defineSyncApi<T extends Function>(
  name: string,
  fn: T,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  return (defineApi(
    API_TYPE_SYNC,
    name,
    fn,
    __DEV__ ? protocol : undefined,
    options
  ) as unknown) as T
}

export function defineAsyncApi<T extends AsyncApiLike, P = AsyncApiOptions<T>>(
  name: string,
  fn: (
    args: Omit<P, 'success' | 'fail' | 'complete'>
  ) => Promise<AsyncApiRes<P> | void>,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  return promisify(
    defineApi(API_TYPE_ASYNC, name, fn, __DEV__ ? protocol : undefined, options)
  ) as AsyncApi<P>
}

function defineApi(
  type: API_TYPES,
  name: string,
  fn: Function,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  switch (type) {
    case API_TYPE_ON:
      return wrapperApi(wrapperOnApi(name, fn), name, protocol, options)
    case API_TYPE_OFF:
      return wrapperApi(wrapperOffApi(name, fn), name, protocol, options)
    case API_TYPE_TASK:
      return wrapperApi(wrapperTaskApi(name, fn), name, protocol, options)
    case API_TYPE_SYNC:
      return wrapperApi(wrapperSyncApi(fn), name, protocol, options)
    case API_TYPE_ASYNC:
      return wrapperApi(
        wrapperAsyncApi(name, fn as any, options),
        name,
        protocol,
        options
      )
  }
}
