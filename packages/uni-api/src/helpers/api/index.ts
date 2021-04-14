import {
  extend,
  hasOwn,
  isString,
  isFunction,
  isPlainObject,
} from '@vue/shared'
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

function formatApiArgs<T extends ApiLike>(
  args: any[],
  options?: ApiOptions<T>
) {
  const params = args[0]
  if (
    !options ||
    (!isPlainObject(options.formatArgs) && isPlainObject(params))
  ) {
    return args
  }
  const formatArgs = options.formatArgs!
  Object.keys(formatArgs).forEach((name) => {
    const formatterOrDefaultValue = formatArgs[name]!
    if (isFunction(formatterOrDefaultValue)) {
      formatterOrDefaultValue(args[0][name], params)
    } else {
      // defaultValue
      if (!hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue
      }
    }
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

function wrapperTaskApi<T extends ApiLike>(
  name: string,
  fn: Function,
  options?: ApiOptions<T>
) {
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

function wrapperAsyncApi<T extends ApiLike>(
  name: string,
  fn: Function,
  options?: ApiOptions<T>
) {
  return wrapperTaskApi(name, fn, options)
}

function wrapperApi<T extends ApiLike>(
  fn: Function,
  name?: string,
  protocol?: ApiProtocols<T>,
  options?: ApiOptions<T>
) {
  return function (...args: any[]) {
    if (__DEV__) {
      validateProtocols(name!, args, protocol)
    }
    if (options && options.beforeInvoke) {
      const errMsg = options.beforeInvoke(args)
      if (isString(errMsg)) {
        return errMsg
      }
    }
    return fn.apply(null, formatApiArgs<T>(args, options))
  }
}

export function defineOnApi<T extends ApiLike>(
  name: string,
  fn: () => void,
  options?: ApiOptions<T>
) {
  return (wrapperApi(
    wrapperOnApi(name, fn),
    name,
    __DEV__ ? API_TYPE_ON_PROTOCOLS : undefined,
    options
  ) as unknown) as T
}

export function defineOffApi<T extends ApiLike>(
  name: string,
  fn: () => void,
  options?: ApiOptions<T>
) {
  return (wrapperApi(
    wrapperOffApi(name, fn),
    name,
    __DEV__ ? API_TYPE_ON_PROTOCOLS : undefined,
    options
  ) as unknown) as T
}

export function defineTaskApi<T extends TaskApiLike, P = AsyncApiOptions<T>>(
  name: string,
  fn: (
    args: Omit<P, 'success' | 'fail' | 'complete'>,
    res: {
      resolve: (res?: AsyncApiRes<P>) => void
      reject: (err?: string) => void
    }
  ) => ReturnType<T>,
  protocol?: ApiProtocols<T>,
  options?: ApiOptions<T>
) {
  return (promisify(
    wrapperApi(
      wrapperTaskApi(name, fn),
      name,
      __DEV__ ? protocol : undefined,
      options
    )
  ) as unknown) as T
}

export function defineSyncApi<T extends ApiLike>(
  name: string,
  fn: T,
  protocol?: ApiProtocols<T>,
  options?: ApiOptions<T>
) {
  return (wrapperApi<T>(
    wrapperSyncApi(fn),
    name,
    __DEV__ ? protocol : undefined,
    options
  ) as unknown) as T
}

export function defineAsyncApi<T extends AsyncApiLike, P = AsyncApiOptions<T>>(
  name: string,
  fn: (
    args: Omit<P, 'success' | 'fail' | 'complete'>,
    res: {
      resolve: (res?: AsyncApiRes<P>) => void
      reject: (err?: string) => void
    }
  ) => void,
  protocol?: ApiProtocols<T>,
  options?: ApiOptions<T>
) {
  return promisify(
    wrapperApi(
      wrapperAsyncApi(name, fn as any, options),
      name,
      __DEV__ ? protocol : undefined,
      options
    )
  ) as AsyncApi<P>
}
