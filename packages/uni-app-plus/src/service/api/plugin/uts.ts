// 生成的 uts.js 需要同步到 vue2 src/platforms/app-plus/service/api/plugin
import {
  capitalize,
  extend,
  hasOwn,
  isArray,
  isPlainObject,
  isString,
} from '@vue/shared'
declare const uni: any
declare const plus: any
let callbackId = 1
let proxy: any

const keepAliveCallbacks: Record<string, Function> = {}

function isUniElement(obj: any) {
  return obj && typeof obj.getNodeId === 'function' && obj.pageId
}

function isComponentPublicInstance(instance: any) {
  return instance && instance.$ && instance.$.proxy === instance
}

function parseElement(obj: any) {
  if (isUniElement(obj)) {
    return obj
  }
}

function parseComponentPublicInstance(obj: any) {
  if (isComponentPublicInstance(obj)) {
    return obj.$el
  }
}

// 序列化 UniElement | ComponentPublicInstance
function serialize(el: any, type: 'UniElement' | 'ComponentPublicInstance') {
  let nodeId = ''
  let pageId = ''
  // 非 x 可能不存在 getNodeId 方法？
  if (el && el.getNodeId) {
    pageId = el.pageId
    nodeId = el.getNodeId()
  }
  return { pageId, nodeId, __type__: type }
}

function toRaw(observed?: unknown): unknown {
  const raw = observed && (observed as any).__v_raw
  return raw ? toRaw(raw) : observed
}

export function normalizeArg(
  arg: unknown,
  callbacks: Record<string, Function>,
  keepAlive: boolean,
  context: {
    depth: number
    nested: boolean
  }
) {
  arg = toRaw(arg)
  if (typeof arg === 'function') {
    let id: number
    if (keepAlive) {
      // 仅keepAlive时，需要查找缓存，非keepAlive时，直接创建，避免函数被复用时，回调函数被误删
      const oldId = Object.keys(callbacks).find((id) => callbacks[id] === arg)
      id = oldId ? parseInt(oldId) : callbackId++
      callbacks[id] = arg
    } else {
      id = callbackId++
      callbacks[id] = arg
    }
    return id
  } else if (isArray(arg)) {
    context.depth++
    return arg.map((item) => normalizeArg(item, callbacks, keepAlive, context))
    // 为啥还要额外判断了isUniElement?，isPlainObject不是包含isUniElement的逻辑吗？为了避免出bug，保留此逻辑
  } else if (isPlainObject(arg) || isUniElement(arg)) {
    const uniElement = parseElement(arg)
    const componentPublicInstanceUniElement = !uniElement
      ? parseComponentPublicInstance(arg)
      : undefined
    const el = uniElement || componentPublicInstanceUniElement
    if (el) {
      if (context.depth > 0) {
        context.nested = true
      }
      return serialize(
        el,
        uniElement ? 'UniElement' : 'ComponentPublicInstance'
      )
    } else {
      // 必须复制，否则会污染原始对象，比如：
      // const obj = {
      //   a: 1,
      //   b: () => {}
      // }
      // const newObj = normalizeArg(obj, {}, false)
      // newObj.a = 2 // 这会污染原始对象 obj
      const newArg = {}
      Object.keys(arg as object).forEach((name) => {
        context.depth++
        newArg[name] = normalizeArg(
          (arg as any)[name],
          callbacks,
          keepAlive,
          context
        )
      })
      return newArg
    }
  }
  return arg
}

function initUTSInstanceMethod(
  async: boolean,
  opts: ProxyFunctionOptions,
  instanceId: number,
  proxy: unknown
) {
  return initProxyFunction('method', async, opts, instanceId, proxy)
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
   * 回调是否持久保留
   */
  keepAlive: boolean
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
  setters: Record<string, Parameter>
  staticSetters: Record<string, Parameter>
  methods: {
    [name: string]: {
      async?: boolean
      keepAlive: boolean
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
  setters: Record<string, Parameter>
  staticSetters: Record<string, Parameter>
  methods: {
    [name: string]: {
      async?: boolean
      keepAlive: boolean
      params: Parameter[]
      return?: ProxyFunctionReturnOptions
    }
  }
  staticMethods: {
    [name: string]: {
      async?: boolean
      keepAlive: boolean
      params: Parameter[]
      return?: ProxyFunctionReturnOptions
    }
  }
  /**
   * 运行时提示的错误信息
   */
  errMsg?: string
}

type InvokeType = 'getter' | 'setter' | 'method' | 'constructor'

interface InvokeInstanceArgs extends ModuleOptions {
  id: number
  /**
   * 属性名或方法名
   */
  name: string
  /**
   * 属性|方法
   */
  type: InvokeType
  /**
   * 回调是否持久保留
   */
  keepAlive: boolean
  /**
   * 参数中是否包含嵌套序列化对象
   */
  nested: boolean
  /**
   * 执行方法时的真实参数列表
   */
  params?: unknown[]
  /**
   * 方法定义的参数列表
   */
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
   * 属性|方法
   */
  type: InvokeType
  /**
   * 回调是否持久保留
   */
  keepAlive: boolean
  /**
   * 参数中是否包含嵌套序列化对象
   */
  nested: boolean
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
  // 异步 API return 的返回值
  type: 'return'
  params?: unknown[]
  errMsg?: string
  errStackTrace?: string
}
interface InvokeCallbackParamsRes {
  // 异步 API callback 的返回值
  type: 'params'
  id: number
  name: string
  params: unknown[]
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
    if (__X__) {
      // iOS
      proxy = {
        invokeSync(args: InvokeArgs, callback: InvokeSyncCallback) {
          // @ts-expect-error
          return nativeChannel.invokeSync('APP-SERVICE', args, callback)
        },
        invokeAsync(args: InvokeArgs, callback: InvokeAsyncCallback) {
          // if (
          //   // 硬编码
          //   args.moduleName === 'uni-ad' &&
          //   ['showByJs', 'loadByJs'].includes(args.name)
          // ) {
          //   // @ts-expect-error
          //   const res: InvokeSyncRes = nativeChannel.invokeSync(
          //     'APP-SERVICE',
          //     args,
          //     callback
          //   )
          //   callback(
          //     extend(res, {
          //       params: [res.params],
          //     })
          //   )
          //   return res
          // }
          // @ts-expect-error
          return nativeChannel.invokeAsync('APP-SERVICE', args, callback)
        },
      }
    } else {
      proxy = uni.requireNativePlugin('UTS-Proxy') as any
    }
  }
  return proxy
}

function resolveSyncResult(
  args: InvokeArgs,
  res: InvokeSyncRes,
  returnOptions?: ProxyFunctionReturnOptions,
  instanceId?: number,
  proxy?: unknown
) {
  if (__DEV__) {
    console.log(
      'uts.invokeSync.result',
      JSON.stringify([res, returnOptions, instanceId, typeof proxy])
    )
  }
  if (!res) {
    throw new Error(
      '返回值为：' +
        JSON.stringify(res) +
        '；请求参数为：' +
        JSON.stringify(args)
    )
  }
  // devtools 环境是字符串？
  if (isString(res)) {
    try {
      res = JSON.parse(res)
    } catch (e) {
      throw new Error(`JSON.parse(${res}): ` + e)
    }
  }
  if (res.errMsg) {
    throw new Error(res.errMsg)
  }
  if (returnOptions) {
    if (returnOptions.type === 'interface' && typeof res.params === 'number') {
      // 返回了 0
      if (!res.params) {
        return null
      }
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
  return resolveSyncResult(
    args,
    getProxy().invokeSync(args, () => {})
  )
}

function initProxyFunction(
  type: InvokeType,
  async: boolean,
  {
    moduleName,
    moduleType,
    package: pkg,
    class: cls,
    name: methodName,
    method,
    companion,
    keepAlive,
    params: methodParams,
    return: returnOptions,
    errMsg,
  }: ProxyFunctionOptions,
  instanceId: number,
  proxy?: unknown
) {
  if (!keepAlive) {
    keepAlive =
      methodName.indexOf('on') === 0 &&
      methodParams.length === 1 &&
      methodParams[0].type === 'UTSCallback'
  }
  const baseArgs: InvokeArgs = instanceId
    ? {
        moduleName,
        moduleType,
        id: instanceId,
        type,
        name: methodName,
        method: methodParams,
        nested: false,
        keepAlive,
      }
    : {
        moduleName,
        moduleType,
        package: pkg,
        class: cls,
        name: method || methodName,
        type,
        companion,
        method: methodParams,
        nested: false,
        keepAlive,
      }
  return (...args: unknown[]) => {
    if (errMsg) {
      throw new Error(errMsg)
    }
    // TODO 隐患：部分callback可能不会被删除，比如传入了success、fail、complete，但是仅触发了success、complete，那么fail就不会被删除
    // 需要有个机制来知道整个函数已经结束了，需要清理所有相关callbacks
    const callbacks = keepAlive ? keepAliveCallbacks : {}
    const invokeCallback = ({ id, name, params }: InvokeCallbackParamsRes) => {
      const callback = callbacks[id!]
      if (callback) {
        callback(...params)
        if (!keepAlive) {
          delete callbacks[id]
        }
      } else {
        console.error(
          `uts插件[${moduleName}] ${pkg}${cls}.${methodName.replace(
            'ByJs',
            ''
          )} ${name}回调函数已释放，不能再次执行，参考文档：https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#keepalive`
        )
      }
    }
    const context = {
      depth: 0,
      nested: false,
    }
    const invokeArgs = extend({}, baseArgs, {
      params: args.map((arg) =>
        normalizeArg(arg, callbacks, keepAlive, context)
      ),
    })

    invokeArgs.nested = context.nested

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
      invokeArgs,
      getProxy().invokeSync(invokeArgs, invokeCallback),
      returnOptions,
      instanceId,
      proxy
    )
  }
}

function initUTSStaticMethod(async: boolean, opts: ProxyFunctionOptions) {
  if (opts.main && !opts.method) {
    if (isUTSiOS()) {
      opts.method = 's_' + opts.name
    }
  }
  return initProxyFunction('method', async, opts, 0)
}

export const initUTSProxyFunction = initUTSStaticMethod

function parseClassMethodName(
  name: string | symbol,
  methods: Record<string, unknown>
) {
  if (typeof name === 'string' && hasOwn(methods, name + 'ByJs')) {
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

function parseClassPropertySetter(name: string) {
  return '__$set' + capitalize(name)
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
    setters,
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
  let staticSetters: ProxyClassOptions['staticSetters'] = {}

  let isProxyInterface = false
  if (isProxyInterfaceOptions(options)) {
    isProxyInterface = true
    instanceId = options.instanceId
  } else {
    constructorParams = options.constructor.params
    staticMethods = options.staticMethods
    staticProps = options.staticProps
    staticSetters = options.staticSetters
  }

  // iOS 需要为 ByJs 的 class 构造函数（如果包含JSONObject或UTSCallback类型）补充最后一个参数
  if (isUTSiOS()) {
    if (
      constructorParams.find(
        (p) => p.type === 'UTSCallback' || p.type.indexOf('JSONObject') > 0
      )
    ) {
      constructorParams.push({ name: '_byJs', type: 'boolean' })
    }
  }
  const ProxyClass = class UTSClass {
    __instanceId: number = 0
    constructor(...params: unknown[]) {
      if (errMsg) {
        throw new Error(errMsg)
      }
      const target: Record<string, Function> = {}
      // 初始化实例 ID
      if (!isProxyInterface) {
        // 初始化未指定时，每次都要创建instanceId
        this.__instanceId = initProxyFunction(
          'constructor',
          false,
          extend(
            {
              name: 'constructor',
              keepAlive: false,
              params: constructorParams,
            },
            baseOptions
          ),
          0
        ).apply(null, params) as number
      } else if (typeof instanceId === 'number') {
        this.__instanceId = instanceId
      }
      if (!this.__instanceId) {
        throw new Error(`new ${cls} is failed`)
      }
      const instance = this
      const proxy = new Proxy(instance, {
        get(_, name) {
          // 重要：禁止响应式
          if (name === '__v_skip') {
            return true
          }
          if (!target[name as string]) {
            //实例方法
            name = parseClassMethodName(name, methods)
            if (hasOwn(methods, name)) {
              const {
                async,
                keepAlive,
                params,
                return: returnOptions,
              } = methods[name]
              target[name] = initUTSInstanceMethod(
                !!async,
                extend(
                  {
                    name,
                    keepAlive,
                    params,
                    return: returnOptions,
                  },
                  baseOptions
                ),
                instance.__instanceId,
                proxy
              )
            } else if (props.includes(name as string)) {
              // 实例属性
              return invokePropGetter({
                moduleName,
                moduleType,
                id: instance.__instanceId,
                type: 'getter',
                keepAlive: false,
                nested: false,
                name: name as string,
                errMsg,
              })
            }
          }
          return target[name as string]
        },
        set(_, name, newValue) {
          if (props.includes(name as string)) {
            const setter = parseClassPropertySetter(name as string)
            if (!target[setter]) {
              const param = setters[name as string]
              if (param) {
                target[setter] = initProxyFunction(
                  'setter',
                  false,
                  extend(
                    {
                      name: name as string,
                      keepAlive: false,
                      params: [param],
                    },
                    baseOptions
                  ),
                  instance.__instanceId,
                  proxy
                )
              }
            }
            target[parseClassPropertySetter(name as string)](newValue)
            return true
          }
          return false
        },
      })
      return proxy
    }
  }
  const staticPropSetterCache: Record<string, Function> = {}
  const staticMethodCache: Record<string, Function> = {}
  return new Proxy(ProxyClass, {
    get(target, name, receiver) {
      name = parseClassMethodName(name, staticMethods)
      if (hasOwn(staticMethods, name)) {
        if (!staticMethodCache[name as string]) {
          const {
            async,
            keepAlive,
            params,
            return: returnOptions,
          } = staticMethods[name]
          // 静态方法
          staticMethodCache[name] = initUTSStaticMethod(
            !!async,
            extend(
              {
                name,
                companion: true,
                keepAlive,
                params,
                return: returnOptions,
              },
              baseOptions
            )
          )
        }
        return staticMethodCache[name]
      }
      if (staticProps.includes(name as string)) {
        return invokePropGetter(
          extend(
            {
              name: name as string,
              companion: true,
              type: 'getter',
            },
            baseOptions
          ) as InvokeStaticArgs
        )
      }
      return Reflect.get(target, name, receiver)
    },
    set(_, name, newValue) {
      if (staticProps.includes(name as string)) {
        // 静态属性
        const setter = parseClassPropertySetter(name as string)
        if (!staticPropSetterCache[setter]) {
          const param = staticSetters[name as string]
          if (param) {
            staticPropSetterCache[setter] = initProxyFunction(
              'setter',
              false,
              extend(
                {
                  name: name as string,
                  keepAlive: false,
                  params: [param],
                },
                baseOptions
              ),
              0
            )
          }
        }
        staticPropSetterCache[parseClassPropertySetter(name as string)](
          newValue
        )
        return true
      }
      return false
    },
  })
}

function isUTSAndroid() {
  if (__X__) {
    return false
  }
  return typeof plus !== 'undefined' && plus.os.name === 'Android'
}

function isUTSiOS() {
  return !isUTSAndroid()
}

export function initUTSPackageName(name: string, is_uni_modules: boolean) {
  if (isUTSAndroid()) {
    return 'uts.sdk.' + (is_uni_modules ? 'modules.' : '') + name
  }
  return ''
}

export function initUTSIndexClassName(
  moduleName: string,
  is_uni_modules: boolean
) {
  return initUTSClassName(
    moduleName,
    isUTSAndroid() ? 'IndexKt' : 'IndexSwift',
    is_uni_modules
  )
}

export function initUTSClassName(
  moduleName: string,
  className: string,
  is_uni_modules: boolean
) {
  if (isUTSAndroid()) {
    return className
  }
  return (
    'UTSSDK' +
    (is_uni_modules ? 'Modules' : '') +
    capitalize(moduleName) +
    capitalize(className)
  )
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
