import { ApiOptions, ApiProtocol, ProtocolOptions } from '../../protocols/type'
import {
  createAsyncApiCallback,
  createKeepAliveApiCallback,
  invokeCallback,
} from './callback'
import { promisify } from './promise'

type ApiProtocols = ApiProtocol | ProtocolOptions[]

export const API_TYPE_ON = 0
export const API_TYPE_TASK = 1
export const API_TYPE_SYNC = 2
export const API_TYPE_ASYNC = 3

type API_TYPES =
  | typeof API_TYPE_ON
  | typeof API_TYPE_TASK
  | typeof API_TYPE_SYNC
  | typeof API_TYPE_ASYNC

function validateProtocol(
  _name: string,
  _args: any[],
  _protocol: ApiProtocols
) {
  return true
}

function formatApiArgs(args: any[], options?: ApiOptions) {
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

function wrapperAsyncApi(name: string, fn: Function, options?: ApiOptions) {
  return (args: Record<string, any>) => {
    const callbackId = createAsyncApiCallback(name, args, options)
    const res = fn.apply(null, [args, callbackId])
    if (res) {
      invokeCallback(callbackId, res)
    }
  }
}

function wrapperApi<T extends Function>(
  fn: Function,
  name?: string,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  return (function (...args: any[]) {
    if (!(__DEV__ && protocol && !validateProtocol(name!, args, protocol))) {
      return fn.apply(null, formatApiArgs(args, options))
    }
  } as unknown) as T
}

export function createOnApi<T extends Function>(
  name: string,
  fn: T,
  options?: ApiOptions,
  protocol?: ApiProtocols
) {
  return createApi(API_TYPE_ON, name, fn, protocol, options)
}

export function createTaskApi<T extends Function>(
  name: string,
  fn: T,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  return createApi(API_TYPE_TASK, name, fn, protocol, options)
}

export function createSyncApi<T extends Function>(
  name: string,
  fn: T,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  return createApi(API_TYPE_SYNC, name, fn, protocol, options)
}

export function createAsyncApi<T extends Function>(
  name: string,
  fn: T,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  return promisify(createApi(API_TYPE_ASYNC, name, fn, protocol, options))
}

function createApi<T extends Function>(
  type: API_TYPES,
  name: string,
  fn: T,
  protocol?: ApiProtocols,
  options?: ApiOptions
) {
  switch (type) {
    case API_TYPE_ON:
      return wrapperApi<T>(wrapperOnApi(name, fn), name, protocol, options)
    case API_TYPE_TASK:
      return wrapperApi<T>(wrapperTaskApi(name, fn), name, protocol, options)
    case API_TYPE_SYNC:
      return wrapperApi<T>(wrapperSyncApi(fn), name, protocol, options)
    case API_TYPE_ASYNC:
      return wrapperApi<T>(
        wrapperAsyncApi(name, fn, options),
        name,
        protocol,
        options
      )
  }
}
