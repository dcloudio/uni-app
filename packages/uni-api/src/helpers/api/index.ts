import {
  extend,
  hasOwn,
  isFunction,
  isPlainObject,
  isString,
} from '@vue/shared'

import { validateProtocols } from '../protocol'
import {
  createAsyncApiCallback,
  createKeepAliveApiCallback,
  findInvokeCallbackByName,
  invokeCallback,
  offKeepAliveApiCallback,
  onKeepAliveApiCallback,
  removeKeepAliveApiCallback,
} from './callback'
import type { CALLBACK_TYPES } from './callback'
import { promisify } from './promise'

function formatApiArgs<T extends ApiLike>(
  args: any[],
  options?: ApiOptions<T>
) {
  const params = args[0]
  if (
    !options ||
    !options.formatArgs ||
    (!isPlainObject(options.formatArgs) && isPlainObject(params))
  ) {
    return
  }
  const formatArgs = options.formatArgs!
  const keys = Object.keys(formatArgs)
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i]
    const formatterOrDefaultValue = formatArgs[name]!
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params)
      if (isString(errMsg)) {
        return errMsg
      }
    } else {
      // defaultValue
      if (!hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue
      }
    }
  }
}

function invokeSuccess(id: number, name: string, res: unknown) {
  const result: { errSubject?: string; errMsg: string } = {
    errMsg: name + ':ok',
  }

  if (__X__) {
    result.errSubject = name
  }

  return invokeCallback(id, extend((res || {}) as Object, result))
}

function invokeFail(
  id: number,
  name: string,
  errMsg?: string,
  errRes: any = {}
) {
  const apiErrMsg = name + ':fail' + (errMsg ? ' ' + errMsg : '')

  if (!__X__) {
    delete errRes.errCode
  }

  let res = extend({ errMsg: apiErrMsg }, errRes)

  if (__X__) {
    if (typeof UniError !== 'undefined') {
      res =
        typeof errRes.errCode !== 'undefined'
          ? new UniError(name, errRes.errCode, apiErrMsg)
          : new UniError(apiErrMsg, errRes)
    }
  }

  return invokeCallback(id, res)
}

function beforeInvokeApi<T extends ApiLike>(
  name: string,
  args: any[],
  protocol?: ApiProtocols<T>,
  options?: ApiOptions<T>
) {
  if (__DEV__) {
    validateProtocols(name!, args, protocol)
  }
  if (options && options.beforeInvoke) {
    const errMsg = options.beforeInvoke(args)
    if (isString(errMsg)) {
      return errMsg
    }
  }
  const errMsg = formatApiArgs<T>(args, options)
  if (errMsg) {
    return errMsg
  }
}

function checkCallback(callback: Function) {
  if (!isFunction(callback)) {
    throw new Error(
      'Invalid args: type check failed for args "callback". Expected Function'
    )
  }
}
function wrapperOnApi<T extends ApiLike>(
  name: string,
  fn: Function,
  options?: ApiOptions<T>
) {
  return (callback: Function) => {
    checkCallback(callback)
    const errMsg = beforeInvokeApi(name, [callback], undefined, options)
    if (errMsg) {
      throw new Error(errMsg)
    }
    // 是否是首次调用on,如果是首次，需要初始化onMethod监听
    const isFirstInvokeOnApi = !findInvokeCallbackByName(name)
    createKeepAliveApiCallback(name, callback)
    if (isFirstInvokeOnApi) {
      onKeepAliveApiCallback(name)
      fn()
    }
  }
}

function wrapperOffApi<T extends ApiLike>(
  name: string,
  fn: Function,
  options?: ApiOptions<T>
) {
  return (callback: Function) => {
    checkCallback(callback)
    const errMsg = beforeInvokeApi(name, [callback], undefined, options)
    if (errMsg) {
      throw new Error(errMsg)
    }
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

function parseErrMsg(errMsg?: string | Error) {
  if (!errMsg || isString(errMsg)) {
    return errMsg
  }
  if (errMsg.stack) {
    console.error(errMsg.message + '\n' + errMsg.stack)
    return errMsg.message
  }
  return errMsg as unknown as string
}

function wrapperTaskApi<T extends ApiLike>(
  name: string,
  fn: Function,
  protocol?: ApiProtocols<T>,
  options?: ApiOptions<T>
) {
  return (args: Record<string, any>) => {
    const id = createAsyncApiCallback(name, args, options)
    const errMsg = beforeInvokeApi(name, [args], protocol, options)
    if (errMsg) {
      return invokeFail(id, name, errMsg)
    }
    return fn(args, {
      resolve: (res: unknown) => invokeSuccess(id, name, res),
      reject: (errMsg?: string | Error, errRes?: any) =>
        invokeFail(id, name, parseErrMsg(errMsg), errRes),
    })
  }
}

function wrapperSyncApi<T extends ApiLike>(
  name: string,
  fn: Function,
  protocol?: ApiProtocols<T>,
  options?: ApiOptions<T>
) {
  return (...args: any[]) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options)
    if (errMsg) {
      throw new Error(errMsg)
    }
    return fn.apply(null, args)
  }
}

function wrapperAsyncApi<T extends ApiLike>(
  name: string,
  fn: Function,
  protocol?: ApiProtocols<T>,
  options?: ApiOptions<T>
) {
  return wrapperTaskApi(name, fn, protocol, options)
}

export function defineOnApi<T extends ApiLike>(
  name: string,
  fn: () => void,
  options?: ApiOptions<T>
) {
  return wrapperOnApi(name, fn, options) as unknown as T
}

export function defineOffApi<T extends ApiLike>(
  name: string,
  fn: () => void,
  options?: ApiOptions<T>
) {
  return wrapperOffApi(name, fn, options) as unknown as T
}

export function defineTaskApi<
  T extends TaskApiLike,
  P extends AsyncMethodOptionLike = AsyncApiOptions<T>
>(
  name: string,
  fn: (
    args: Omit<P, CALLBACK_TYPES>,
    res: {
      resolve: (res?: AsyncApiRes<P> | void) => void
      reject: <R extends object>(err?: string, errRes?: R & object) => void
    }
  ) => ReturnType<T>,
  protocol?: ApiProtocols<T>,
  options?: ApiOptions<T>
) {
  return promisify(
    name,
    wrapperTaskApi(name, fn, __DEV__ ? protocol : undefined, options)
  ) as unknown as T
}

export function defineSyncApi<T extends ApiLike>(
  name: string,
  fn: T,
  protocol?: ApiProtocols<T>,
  options?: ApiOptions<T>
) {
  return wrapperSyncApi(
    name,
    fn,
    __DEV__ ? protocol : undefined,
    options
  ) as unknown as T
}

export type DefineAsyncApiFn<
  T extends AsyncApiLike,
  P extends AsyncMethodOptionLike = AsyncApiOptions<T>
> = (
  args: P extends undefined ? undefined : Omit<P, CALLBACK_TYPES>,
  res: {
    resolve: (res: AsyncApiRes<P> | void) => void
    reject: (errMsg?: string, errRes?: any) => void
  }
) => void

export function defineAsyncApi<
  T extends AsyncApiLike,
  P extends AsyncMethodOptionLike = AsyncApiOptions<T>
>(
  name: string,
  fn: DefineAsyncApiFn<T>,
  protocol?: ApiProtocols<T>,
  options?: ApiOptions<T>
) {
  return promisify(
    name,
    wrapperAsyncApi(name, fn as any, __DEV__ ? protocol : undefined, options)
  ) as AsyncApi<P>
}

function createUnsupportedMsg(name: string) {
  return `method 'uni.${name}' not supported`
}

export function createUnsupportedSyncApi(name: string) {
  return (): any => {
    console.error(createUnsupportedMsg(name))
  }
}

export const createUnsupportedOnApi = createUnsupportedSyncApi
export const createUnsupportedOffApi = createUnsupportedSyncApi
export const createUnsupportedTaskApi = createUnsupportedSyncApi

export function createUnsupportedAsyncApi(name: string) {
  return (_args: unknown, { reject }: { reject: (err?: string) => void }) => {
    return reject(createUnsupportedMsg(name))
  }
}
