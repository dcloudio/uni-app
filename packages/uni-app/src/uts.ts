import { isPlainObject, hasOwn, extend } from '@vue/shared'
declare const uni: any
let callbackId = 1
let proxy: any
const callbacks: Record<string, Function> = {}
export function normalizeArg(arg: unknown) {
  if (typeof arg === 'function') {
    const id = callbackId++
    callbacks[id] = arg
    return id
  } else if (isPlainObject(arg)) {
    Object.keys(arg).forEach((name) => {
      ;(arg as any)[name] = normalizeArg((arg as any)[name])
    })
  }
  return arg
}

interface ProxyBaseOptions {
  /**
   * 包名
   */
  package: string
  /**
   * 类名
   */
  class: string
  /**
   * 属性名或方法名
   */
  name: string
  /**
   * 是否是伴生对象
   */
  companion?: boolean
}

interface ProxyInstanceOptions extends ProxyBaseOptions {
  id: number
}

/**
 * 实例方法
 */
interface ProxyInstanceMethodOptions extends ProxyInstanceOptions {}

function initUtsInstanceMethod(
  async: boolean,
  opts: ProxyInstanceMethodOptions
) {
  return initProxyFunction(async, opts)
}
interface ProxyClassOptions {
  package: string
  class: string
  props: string[]
  staticProps: string[]
  methods: {
    [name: string]: {
      async?: boolean
    }
  }
  staticMethods: {
    [name: string]: {
      async?: boolean
    }
  }
}

type InvokeInstanceArgs =
  // prop
  | { id: number; name: string }
  // method
  | { id: number; name: string; params: unknown[] }
type InvokeArgs = (ProxyBaseOptions | InvokeInstanceArgs) & {
  params?: unknown[]
}

interface InvokeCallbackReturnRes {
  type: 'return'
  params?: unknown[]
  errMsg?: string
}
interface InvokeCallbackParamsRes {
  type: 'params'
  id: number
  name: string
  params: unknown[]
  keepAlive?: boolean
}

type InvokeSyncCallback = (res: InvokeCallbackParamsRes) => void
type InvokeAsyncCallback = (
  res: InvokeCallbackReturnRes | InvokeCallbackParamsRes
) => void

interface InvokeSyncRes {
  type: 'return'
  errMsg?: string
  params: unknown
}
function getProxy(): {
  invokeSync: (args: InvokeArgs, callback: InvokeSyncCallback) => InvokeSyncRes
  invokeAsync: (args: InvokeArgs, callback: InvokeAsyncCallback) => void
} {
  if (!proxy) {
    proxy = uni.requireNativePlugin('UTS-Proxy') as any
  }
  return proxy
}

function resolveSyncResult(res: InvokeSyncRes) {
  if (res.errMsg) {
    throw new Error(res.errMsg)
  }
  return res.params
}

function invokePropGetter(args: InvokeArgs) {
  return resolveSyncResult(getProxy().invokeSync(args, () => {}))
}

interface InitProxyFunctionOptions {
  /**
   * 包名
   */
  package: string
  /**
   * 类名
   */
  class: string
  /**
   * 属性名或方法名
   */
  name: string
  /**
   * 实例 ID
   */
  id?: number
}

function initProxyFunction(
  async: boolean,
  {
    package: pkg,
    class: cls,
    name: propOrMethod,
    id: instanceId,
  }: InitProxyFunctionOptions
) {
  const invokeCallback = ({
    id,
    name,
    params,
    keepAlive,
  }: InvokeCallbackParamsRes) => {
    const callback = callbacks[id!]
    if (callback) {
      callback(...params)
      if (!keepAlive) {
        delete callbacks[id]
      }
    } else {
      console.error(`${pkg}${cls}.${propOrMethod} ${name} is not found`)
    }
  }
  const baseArgs: InvokeArgs = instanceId
    ? { id: instanceId, name: propOrMethod }
    : {
        package: pkg,
        class: cls,
        name: propOrMethod,
      }
  return (...args: unknown[]) => {
    const invokeArgs = extend({}, baseArgs, {
      params: args.map((arg) => normalizeArg(arg)),
    })
    if (async) {
      return new Promise((resolve, reject) => {
        getProxy().invokeAsync(invokeArgs, (res) => {
          if (res.type !== 'return') {
            invokeCallback(res)
          } else {
            if (res.errMsg) {
              reject(res.errMsg)
            } else {
              resolve(res.params)
            }
          }
        })
      })
    }
    return resolveSyncResult(getProxy().invokeSync(invokeArgs, invokeCallback))
  }
}

function initUtsStaticMethod(async: boolean, opts: ProxyBaseOptions) {
  return initProxyFunction(async, opts)
}
export const initUtsProxyFunction = initUtsStaticMethod
export function initUtsProxyClass({
  package: pkg,
  class: cls,
  methods,
  props,
  staticProps,
  staticMethods,
}: ProxyClassOptions): any {
  const baseOptions = {
    package: pkg,
    class: cls,
  }
  return class ProxyClass {
    constructor(...params: unknown[]) {
      const target: Record<string, Function> = {}
      // 初始化实例 ID
      const instanceId = initProxyFunction(
        false,
        extend({ name: 'constructor', params }, baseOptions)
      ).apply(null, params) as number

      return new Proxy(this, {
        get(_, name) {
          if (!target[name as string]) {
            //实例方法
            if (hasOwn(methods, name)) {
              target[name] = initUtsInstanceMethod(
                !!methods[name].async,
                extend(
                  {
                    id: instanceId,
                    name,
                  },
                  baseOptions
                )
              )
            } else if (hasOwn(staticMethods, name)) {
              // 静态方法
              target[name] = initUtsStaticMethod(
                !!staticMethods[name].async,
                extend({ name, companion: true }, baseOptions)
              )
            } else if (props.includes(name as string)) {
              // 实例属性
              return invokePropGetter({ id: instanceId, name: name as string })
            } else if (staticProps.includes(name as string)) {
              // 静态属性
              return invokePropGetter(
                extend({ name: name as string, companion: true }, baseOptions)
              )
            }
          }
          return target[name as string]
        },
      })
    }
  }
}
