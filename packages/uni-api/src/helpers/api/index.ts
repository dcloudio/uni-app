import { extend, isPlainObject } from '@vue/shared'
import { ApiOptions, ApiProtocols } from '../../protocols/type'
import { API_TYPE_ON_PROTOCOLS, validateProtocols } from '../protocol'
import {
  invokeCallback,
  createAsyncApiCallback,
  createKeepAliveApiCallback,
} from './callback'
import { promisify } from './promise'

export const API_TYPE_ON = 0
export const API_TYPE_TASK = 1
export const API_TYPE_SYNC = 2
export const API_TYPE_ASYNC = 3

type API_TYPES =
  | typeof API_TYPE_ON
  | typeof API_TYPE_TASK
  | typeof API_TYPE_SYNC
  | typeof API_TYPE_ASYNC

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
  return (callback: Function) =>
    fn.apply(null, createKeepAliveApiCallback(name, callback))
}

function wrapperTaskApi(name: string, fn: Function, options?: ApiOptions) {
  return (args: Record<string, any>) =>
    fn.apply(null, [args, createAsyncApiCallback(name, args, options)])
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
      .then((res) => {
        invokeCallback(id, extend(res || {}, { errMsg: name + ':ok' }))
      })
      .catch((err) => {
        invokeCallback(id, { errMsg: name + ':fail' + (err ? ' ' + err : '') })
      })
  }
}

function wrapperApi<T extends Function>(
  fn: Function,
  name?: string,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  return (function (...args: any[]) {
    if (__DEV__) {
      const errMsg = validateProtocols(name!, args, protocol)
      if (errMsg) {
        return errMsg
      }
    }
    return fn.apply(null, formatApiArgs(args, options))
  } as unknown) as T
}

export function defineOnApi<T extends Function>(
  name: string,
  fn: T,
  options?: ApiOptions
) {
  return defineApi(
    API_TYPE_ON,
    name,
    fn,
    __DEV__ ? API_TYPE_ON_PROTOCOLS : undefined,
    options
  ) as T
}

export function defineTaskApi<T extends Function>(
  name: string,
  fn: T,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  return defineApi(
    API_TYPE_TASK,
    name,
    fn,
    __DEV__ ? protocol : undefined,
    options
  ) as T
}

export function defineSyncApi<T extends Function>(
  name: string,
  fn: T,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  return defineApi(
    API_TYPE_SYNC,
    name,
    fn,
    __DEV__ ? protocol : undefined,
    options
  ) as T
}
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
