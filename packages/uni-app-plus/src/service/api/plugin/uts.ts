import {
  isPlainObject,
  hasOwn,
  extend,
  capitalize,
  isString,
} from '@vue/shared'
declare const uni: any
declare const plus: any
let callbackId = 1
let proxy: any
const callbacks: Record<string, Function> = {}

export function normalizeArg(arg: unknown) {
  if (typeof arg === 'function') {
    // 查找该函数是否已缓存
    const oldId = Object.keys(callbacks).find((id) => callbacks[id] === arg)
    const id = oldId ? parseInt(oldId) : callbackId++
    callbacks[id] = arg
    return id
  } else if (isPlainObject(arg)) {
    Object.keys(arg).forEach((name) => {
      ;(arg as any)[name] = normalizeArg((arg as any)[name])
    })
  }
  return arg
}

function initUTSInstanceMethod(
  async: boolean,
  opts: ProxyFunctionOptions,
  instanceId: number,
  proxy: unknown
) {
  return initProxyFunction(async, opts, instanceId, proxy)
}

interface Parameter {
  name: string
  type: string
}

interface ModuleOptions {
  moduleName: string
  moduleType: 'built-in' | ''
}

interface ProxyFunctionReturnOptions {
  type: 'interface'
  options: string
}
interface ProxyFunctionOptions extends ModuleOptions {
  /**
   * 是否是入口类
   */
  main?: boolean
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
   * 方法名 指定的方法名（用于 IndexSwift 静态方法，自动补充前缀 s_）
   */
  method?: string
  /**
   * 是否伴生对象
   */
  companion?: boolean
  /**
   * 方法参数列表
   */
  params: Parameter[]
  /**
   * 返回值类型
   */
  return?: ProxyFunctionReturnOptions
  /**
   * 运行时提示的错误信息
   */
  errMsg?: string
}

interface ProxyInterfaceOptions extends ModuleOptions {
  instanceId: number
  package: string
  class: string
  props: string[]
  methods: {
    [name: string]: {
      async?: boolean
      params: Parameter[]
      return?: ProxyFunctionReturnOptions
    }
  }
  /**
   * 运行时提示的错误信息
   */
  errMsg?: string
}

interface ProxyClassOptions extends ModuleOptions {
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
      return?: ProxyFunctionReturnOptions
    }
  }
  staticMethods: {
    [name: string]: {
      async?: boolean
      params: Parameter[]
      return?: ProxyFunctionReturnOptions
    }
  }
  /**
   * 运行时提示的错误信息
   */
  errMsg?: string
}

interface InvokeInstanceArgs extends ModuleOptions {
  id: number
  name: string
  params?: unknown[]
  method?: Parameter[]
  /**
   * 运行时提示的错误信息
   */
  errMsg?: string
}
interface InvokeStaticArgs extends ModuleOptions {
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
  /**
   * 运行时提示的错误信息
   */
  errMsg?: string
}

type InvokeArgs = InvokeInstanceArgs | InvokeStaticArgs

interface InvokeCallbackReturnRes {
  type: 'return'
  params?: unknown[]
  errMsg?: string
  errStackTrace?: string
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
  errStackTrace?: string
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

function resolveSyncResult(
  res: InvokeSyncRes,
  returnOptions?: ProxyFunctionReturnOptions,
  instanceId?: number,
  proxy?: unknown
) {
  // devtools 环境是字符串？
  if (isString(res)) {
    res = JSON.parse(res)
  }
  if (__DEV__) {
    console.log(
      'uts.invokeSync.result',
      res,
      returnOptions,
      instanceId,
      typeof proxy
    )
  }
  if (res.errMsg) {
    throw new Error(res.errMsg)
  }
  if (returnOptions) {
    if (returnOptions.type === 'interface' && typeof res.params === 'number') {
      if (res.params === instanceId && proxy) {
        return proxy
      }
      if (interfaceDefines[returnOptions.options]) {
        const ProxyClass = initUTSProxyClass(
          extend(
            { instanceId: res.params },
            interfaceDefines[returnOptions.options]
          )
        )
        return new ProxyClass()
      }
    }
  }
  return res.params
}

function invokePropGetter(args: InvokeArgs) {
  if (args.errMsg) {
    throw new Error(args.errMsg)
  }
  delete args.errMsg
  if (__DEV__) {
    console.log('uts.invokePropGetter.args', args)
  }
  return resolveSyncResult(getProxy().invokeSync(args, () => {}))
}

function initProxyFunction(
  async: boolean,
  {
    moduleName,
    moduleType,
    package: pkg,
    class: cls,
    name: propOrMethod,
    method,
    companion,
    params: methodParams,
    return: returnOptions,
    errMsg,
  }: ProxyFunctionOptions,
  instanceId: number,
  proxy?: unknown
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
    ? {
        moduleName,
        moduleType,
        id: instanceId,
        name: propOrMethod,
        method: methodParams,
      }
    : {
        moduleName,
        moduleType,
        package: pkg,
        class: cls,
        name: method || propOrMethod,
        companion,
        method: methodParams,
      }
  return (...args: unknown[]) => {
    if (errMsg) {
      throw new Error(errMsg)
    }
    const invokeArgs = extend({}, baseArgs, {
      params: args.map((arg) => normalizeArg(arg)),
    })
    if (async) {
      return new Promise((resolve, reject) => {
        if (__DEV__) {
          console.log('uts.invokeAsync.args', invokeArgs)
        }
        getProxy().invokeAsync(invokeArgs, (res) => {
          if (__DEV__) {
            console.log('uts.invokeAsync.result', res)
          }
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
    if (__DEV__) {
      console.log('uts.invokeSync.args', invokeArgs)
    }
    return resolveSyncResult(
      getProxy().invokeSync(invokeArgs, invokeCallback),
      returnOptions,
      instanceId,
      proxy
    )
  }
}

function initUTSStaticMethod(async: boolean, opts: ProxyFunctionOptions) {
  if (opts.main && !opts.method) {
    if (typeof plus !== 'undefined' && plus.os.name === 'iOS') {
      opts.method = 's_' + opts.name
    }
  }
  return initProxyFunction(async, opts, 0)
}

export const initUTSProxyFunction = initUTSStaticMethod

function parseClassMethodName(name: string, methods: Record<string, unknown>) {
  if (hasOwn(methods, name + 'ByJs')) {
    return name + 'ByJs'
  }
  return name
}

function isUndefined(value: unknown): boolean {
  return typeof value === 'undefined'
}

function isProxyInterfaceOptions(
  options: unknown
): options is ProxyInterfaceOptions {
  return !isUndefined((options as any).instanceId)
}

export function initUTSProxyClass(
  options: ProxyClassOptions | ProxyInterfaceOptions
): any {
  const {
    moduleName,
    moduleType,
    package: pkg,
    class: cls,
    methods,
    props,
    errMsg,
  } = options

  const baseOptions = {
    moduleName,
    moduleType,
    package: pkg,
    class: cls,
    errMsg,
  }

  let instanceId: number | undefined
  let constructorParams: Parameter[] = []
  let staticMethods: ProxyClassOptions['staticMethods'] = {}
  let staticProps: ProxyClassOptions['staticProps'] = []

  if (isProxyInterfaceOptions(options)) {
    instanceId = options.instanceId
  } else {
    constructorParams = options.constructor.params
    staticMethods = options.staticMethods
    staticProps = options.staticProps
  }

  // iOS 需要为 ByJs 的 class 构造函数（如果包含JSONObject或UTSCallback类型）补充最后一个参数
  if (typeof plus !== 'undefined' && plus.os.name === 'iOS') {
    if (
      constructorParams.find(
        (p) => p.type === 'UTSCallback' || p.type.indexOf('JSONObject') > 0
      )
    ) {
      constructorParams.push({ name: '_byJs', type: 'boolean' })
    }
  }
  const ProxyClass = class UTSClass {
    constructor(...params: unknown[]) {
      if (errMsg) {
        throw new Error(errMsg)
      }
      const target: Record<string, Function> = {}
      // 初始化实例 ID
      if (isUndefined(instanceId)) {
        // 未指定instanceId
        instanceId = initProxyFunction(
          false,
          extend(
            { name: 'constructor', params: constructorParams },
            baseOptions
          ),
          0
        ).apply(null, params) as number
      }
      if (!instanceId) {
        throw new Error(`new ${cls} is failed`)
      }
      const proxy = new Proxy(this, {
        get(_, name) {
          if (!target[name as string]) {
            //实例方法
            name = parseClassMethodName(name as string, methods)
            if (hasOwn(methods, name)) {
              const { async, params, return: returnOptions } = methods[name]
              target[name] = initUTSInstanceMethod(
                !!async,
                extend(
                  {
                    name,
                    params,
                    return: returnOptions,
                  },
                  baseOptions
                ),
                instanceId!,
                proxy
              )
            } else if (props.includes(name as string)) {
              // 实例属性
              return invokePropGetter({
                moduleName,
                moduleType,
                id: instanceId!,
                name: name as string,
                errMsg,
              })
            }
          }
          return target[name as string]
        },
      })
      return proxy
    }
  }
  const staticMethodCache: Record<string, Function> = {}
  return new Proxy(ProxyClass, {
    get(target, name, receiver) {
      name = parseClassMethodName(name as string, staticMethods)
      if (hasOwn(staticMethods, name)) {
        if (!staticMethodCache[name as string]) {
          const { async, params, return: returnOptions } = staticMethods[name]
          // 静态方法
          staticMethodCache[name] = initUTSStaticMethod(
            !!async,
            extend(
              { name, companion: true, params, return: returnOptions },
              baseOptions
            )
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

export function initUTSPackageName(name: string, is_uni_modules: boolean) {
  if (typeof plus !== 'undefined' && plus.os.name === 'Android') {
    return 'uts.sdk.' + (is_uni_modules ? 'modules.' : '') + name
  }
  return ''
}

export function initUTSIndexClassName(
  moduleName: string,
  is_uni_modules: boolean
) {
  if (typeof plus === 'undefined') {
    return ''
  }
  return initUTSClassName(
    moduleName,
    plus.os.name === 'iOS' ? 'IndexSwift' : 'IndexKt',
    is_uni_modules
  )
}

export function initUTSClassName(
  moduleName: string,
  className: string,
  is_uni_modules: boolean
) {
  if (typeof plus === 'undefined') {
    return ''
  }
  if (plus.os.name === 'Android') {
    return className
  }
  if (plus.os.name === 'iOS') {
    return (
      'UTSSDK' +
      (is_uni_modules ? 'Modules' : '') +
      capitalize(moduleName) +
      capitalize(className)
    )
  }
  return ''
}

const interfaceDefines: Record<string, ProxyClassOptions> = {}
export function registerUTSInterface(name: string, define: ProxyClassOptions) {
  interfaceDefines[name] = define
}

const pluginDefines: Record<string, Record<string, unknown>> = {}
export function registerUTSPlugin(
  name: string,
  define: Record<string, unknown>
) {
  pluginDefines[name] = define
}

export function requireUTSPlugin(name: string) {
  const define = pluginDefines[name]
  if (!define) {
    console.error(`${name} is not found`)
  }
  return define
}
