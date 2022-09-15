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

function initUtsInstanceMethod(async: boolean, opts: ProxyFunctionOptions) {
  return initProxyFunction(async, opts)
}

interface Parameter {
  name: string
  type: string
}
interface ProxyFunctionOptions {
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
   * 是否伴生对象
   */
  companion?: boolean
  /**
   * 方法参数列表
   */
  params: Parameter[]
}

interface ProxyClassOptions {
  package: string
  class: string
  constructor: {
    params: Parameter[]
  }
  props: string[]
  staticProps: string[]
  methods: {
    [name: string]: {
      async?: boolean
      params: Parameter[]
    }
  }
  staticMethods: {
    [name: string]: {
      async?: boolean
      params: Parameter[]
    }
  }
}

interface InvokeInstanceArgs {
  id: number
  name: string
  params?: unknown[]
  method?: Parameter[]
}
interface InvokeStaticArgs {
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
   * 执行方法时的真实参数列表
   */
  params?: unknown[]
  /**
   * 方法定义的参数列表
   */
  method?: Parameter[]
  /**
   * 是否是伴生对象
   */
  companion?: boolean
}

type InvokeArgs = InvokeInstanceArgs | InvokeStaticArgs

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
interface InvokeSyncRes {
  type: 'return'
  errMsg?: string
  params: unknown
}
type InvokeSyncCallback = (res: InvokeCallbackParamsRes) => void
type InvokeAsyncCallback = (
  res: InvokeCallbackReturnRes | InvokeCallbackParamsRes
) => void
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

function initProxyFunction(
  async: boolean,
  {
    package: pkg,
    class: cls,
    name: propOrMethod,
    companion,
    params: methodParams,
  }: ProxyFunctionOptions,
  instanceId?: number
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
    ? { id: instanceId, name: propOrMethod, method: methodParams }
    : {
        package: pkg,
        class: cls,
        name: propOrMethod,
        companion,
        method: methodParams,
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

function initUtsStaticMethod(async: boolean, opts: ProxyFunctionOptions) {
  return initProxyFunction(async, opts)
}
export const initUtsProxyFunction = initUtsStaticMethod

export function initUtsProxyClass({
  package: pkg,
  class: cls,
  constructor: { params: constructorParams },
  methods,
  props,
  staticProps,
  staticMethods,
}: ProxyClassOptions): any {
  const baseOptions = {
    package: pkg,
    class: cls,
  }
  const ProxyClass = class UtsClass {
    constructor(...params: unknown[]) {
      const target: Record<string, Function> = {}
      // 初始化实例 ID
      const instanceId = initProxyFunction(
        false,
        extend({ name: 'constructor', params: constructorParams }, baseOptions)
      ).apply(null, params) as number

      return new Proxy(this, {
        get(_, name) {
          if (!target[name as string]) {
            //实例方法
            if (hasOwn(methods, name)) {
              const { async, params } = methods[name]
              target[name] = initUtsInstanceMethod(
                !!async,
                extend(
                  {
                    id: instanceId,
                    name,
                    params,
                  },
                  baseOptions
                )
              )
            } else if (props.includes(name as string)) {
              // 实例属性
              return invokePropGetter({ id: instanceId, name: name as string })
            }
          }
          return target[name as string]
        },
      })
    }
  }
  const staticMethodCache: Record<string, Function> = {}
  return new Proxy(ProxyClass, {
    get(target, name, receiver) {
      if (hasOwn(staticMethods, name)) {
        if (!staticMethodCache[name as string]) {
          const { async, params } = staticMethods[name]
          // 静态方法
          staticMethodCache[name] = initUtsStaticMethod(
            !!async,
            extend({ name, companion: true, params }, baseOptions)
          )
        }
        return staticMethodCache[name]
      }
      if (staticProps.includes(name as string)) {
        // 静态属性
        return invokePropGetter(
          extend({ name: name as string, companion: true }, baseOptions)
        )
      }
      return Reflect.get(target, name, receiver)
    },
  })
}
