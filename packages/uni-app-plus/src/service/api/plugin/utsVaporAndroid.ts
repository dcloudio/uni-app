import { hasOwn, isArray, isPlainObject } from '@vue/shared'

const pluginDefines: Record<string, Record<string, unknown>> = {}
export function registerUTSPlugin(
  name: string,
  define: Record<string, unknown>
) {
  pluginDefines[name] = define
}

export function requireUTSPlugin(name: string, silent = false) {
  const define = pluginDefines[name]
  if (!define) {
    if (!silent) {
      console.error(`${name} is not found`)
    }
  }
  return define
}

function isUniElement(obj: any) {
  return obj && typeof obj.getNodeId === 'function' && obj.pageId
}

function isComponentPublicInstance(instance: any) {
  return instance && instance.$ && instance.$.proxy === instance
}

function serializeUniElement(
  el: any,
  type: 'UniElement' | 'ComponentPublicInstance'
) {
  let nodeId = ''
  let pageId = ''
  if (el && el.getNodeId) {
    pageId = el.pageId
    nodeId = el.getNodeId()
  }
  return { __type__: type, pageId, nodeId }
}

function serializeComponentPublicInstance(obj: any) {
  if (obj.$el) {
    return serializeUniElement(obj.$el, 'ComponentPublicInstance')
  }
  return { __type__: 'ComponentPublicInstance', pageId: '', nodeId: '' }
}

function toRaw(observed?: unknown) {
  const seen = new WeakSet<object>()
  let current = observed
  while (current) {
    const raw = (current as any).__v_raw
    if (!raw) {
      return current
    }
    if (typeof current === 'object' || typeof current === 'function') {
      if (seen.has(current as object)) {
        return current
      }
      seen.add(current as object)
    }
    current = raw
  }
  return current
}

const SKIP_CIRCULAR_REFERENCE = {}

function serializeArg(arg: unknown, stack: WeakSet<object>): unknown {
  arg = toRaw(arg)
  if (isUniElement(arg)) {
    return serializeUniElement(arg, 'UniElement')
  }
  if (isComponentPublicInstance(arg)) {
    return serializeComponentPublicInstance(arg)
  }
  if (!isArray(arg) && !isPlainObject(arg)) {
    return arg
  }
  if (stack.has(arg as object)) {
    return SKIP_CIRCULAR_REFERENCE
  }
  stack.add(arg as object)
  try {
    if (isArray(arg)) {
      const serialized: unknown[] = new Array(arg.length)
      arg.forEach((item, index) => {
        const value = serializeArg(item, stack)
        if (value !== SKIP_CIRCULAR_REFERENCE) {
          serialized[index] = value
        }
      })
      return serialized
    }
    const serialized: Record<string, unknown> = {}
    Object.keys(arg as object).forEach((name) => {
      const value = serializeArg((arg as any)[name], stack)
      if (value !== SKIP_CIRCULAR_REFERENCE) {
        serialized[name] = value
      }
    })
    return serialized
  } finally {
    stack.delete(arg as object)
  }
}

function serializeArgs(args: unknown[]) {
  const stack = new WeakSet<object>()
  return args.map((arg) => serializeArg(arg, stack))
}

let UTSClassInstanceRegistry: FinalizationRegistry<number>
function unregisterInstance(id: number) {
  const args: InvokeArgs = {
    moduleName: '_uts_bridge',
    methodId: 1,
    keepAlive: false,
    params: [id],
  }
  getProxy().invokeSync(args)
}
function ensureUTSClassInstanceRegistry() {
  if (!UTSClassInstanceRegistry) {
    UTSClassInstanceRegistry = new FinalizationRegistry((id) => {
      unregisterInstance(id as number)
    })
  }
}

interface InvokeSyncRes {
  type: 'return'
  errMsg?: string
  errStackTrace?: string
  params: unknown
}
interface InvokeArgs {
  moduleName: string
  methodId: number
  keepAlive: boolean
  instance?: unknown
  instanceId?: number
  params: unknown[]
}
interface InvokeCallbackReturnRes {
  // 异步 API return 的返回值
  type: 'return'
  params?: unknown
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
type InvokeAsyncCallback = (
  res: InvokeCallbackReturnRes | InvokeCallbackParamsRes
) => void

type InvokeChannel = {
  invokeSync: (args: InvokeArgs) => InvokeSyncRes
  invokeAsync: (args: InvokeArgs, callback: InvokeAsyncCallback) => void
}
let channel: InvokeChannel
function getProxy(): InvokeChannel {
  if (!channel) {
    channel = {
      invokeSync(args: InvokeArgs) {
        // @ts-expect-error
        return nativeChannel.invokeSync('APP-SERVICE', args)
      },
      invokeAsync(args: InvokeArgs, callback: InvokeAsyncCallback) {
        // @ts-expect-error
        return nativeChannel.invokeAsync('APP-SERVICE', args, callback)
      },
    }
  }
  return channel
}

type UTSBridgeMethodType =
  | 'function'
  | 'constructor'
  | 'staticMethod'
  | 'staticGetter'
  | 'staticSetter'
  | 'method'
  | 'getter'
  | 'setter'
interface MethodOptions {
  name: string
  methodId: number
  type: UTSBridgeMethodType
  keepAlive: boolean
  async: boolean
  returnType?: string
}
interface InterfaceOptions {
  name: string
  utsBridgeName: string
  methods: MethodOptions[]
}

interface ClassOptions {
  name: string
  utsBridgeName: string
  constructor: MethodOptions
  staticMethods: MethodOptions[]
  methods: MethodOptions[]
}

interface FunctionOptions extends MethodOptions {
  utsBridgeName: string
}

const interfaceDefines: Record<string, Record<string, InterfaceOptions>> = {}
export function registerUTSInterface(options: InterfaceOptions) {
  if (!interfaceDefines[options.utsBridgeName]) {
    interfaceDefines[options.utsBridgeName] = {}
  }
  interfaceDefines[options.utsBridgeName][options.name] = options
}

function resolveReturnValue(
  utsBridgeName: string,
  options: MethodOptions,
  instanceOrId: Object | number | undefined,
  instanceProxy: unknown,
  value: unknown
) {
  if (options.returnType && typeof value === 'number') {
    if (value === 0) {
      return null
    }
    const thisInstanceId =
      typeof instanceOrId === 'number' ? instanceOrId : undefined
    if (value === thisInstanceId) {
      return instanceProxy
    }
    const interfaceOptions =
      interfaceDefines[utsBridgeName]?.[options.returnType]
    if (interfaceOptions) {
      return initUTSProxyInterface(value, interfaceOptions)
    }
  }
  return value
}

function initProxyFunction(
  utsBridgeName: string,
  options: MethodOptions,
  instanceOrId?: Object | number | undefined,
  instanceProxy?: unknown
) {
  return function (...args: any[]) {
    const invokeArgs: InvokeArgs = {
      moduleName: utsBridgeName,
      methodId: options.methodId,
      keepAlive: options.keepAlive,
      instance: typeof instanceOrId === 'object' ? instanceOrId : undefined,
      instanceId: typeof instanceOrId === 'number' ? instanceOrId : undefined,
      params: serializeArgs(args),
    }
    if (options.async) {
      return new Promise((resolve, reject) => {
        getProxy().invokeAsync(invokeArgs, (res) => {
          if (res.type === 'return') {
            if (res.errMsg) {
              reject(res.errMsg)
            } else {
              resolve(
                resolveReturnValue(
                  utsBridgeName,
                  options,
                  instanceOrId,
                  instanceProxy,
                  res.params
                )
              )
            }
          }
        })
      })
    }
    const res = getProxy().invokeSync(invokeArgs)
    if (!res) {
      throw new Error(
        '返回值为：' +
          JSON.stringify(res) +
          '；请求参数为：' +
          JSON.stringify(args)
      )
    }
    if (res.errMsg) {
      throw new Error(res.errMsg)
    }
    return resolveReturnValue(
      utsBridgeName,
      options,
      instanceOrId,
      instanceProxy,
      res.params
    )
  }
}

const FUNCTION_PLACEHOLDER = () => {}

export function initUTSProxyInterface(
  instanceId: number,
  options: InterfaceOptions
) {
  const methods: Record<string, Function> = {}
  const getters: Record<string, Function> = {}
  const setters: Record<string, Function> = {}
  for (const method of options.methods) {
    switch (method.type) {
      case 'method':
        methods[method.name] = FUNCTION_PLACEHOLDER
        break
      case 'getter':
        getters[method.name] = FUNCTION_PLACEHOLDER
        break
      case 'setter':
        setters[method.name] = FUNCTION_PLACEHOLDER
        break
    }
  }
  const instanceProxy = new Proxy(
    {},
    {
      get(target, prop, receiver) {
        if (typeof prop !== 'string') {
          return Reflect.get(target, prop, receiver)
        }
        // 重要：禁止响应式
        if (prop === '__v_skip') {
          return true
        }
        if (hasOwn(methods, prop)) {
          if (methods[prop] === FUNCTION_PLACEHOLDER) {
            methods[prop] = initProxyFunction(
              options.utsBridgeName,
              options.methods.find(
                (m) => m.name === prop && m.type === 'method'
              )!,
              instanceId
            )
          }
          return methods[prop]
        }
        if (hasOwn(getters, prop)) {
          const getter = getters[prop]
          if (getter === FUNCTION_PLACEHOLDER) {
            getters[prop] = initProxyFunction(
              options.utsBridgeName,
              options.methods.find(
                (m) => m.name === prop && m.type === 'getter'
              )!,
              instanceId
            )
          }
          return getters[prop]()
        }
        return Reflect.get(target, prop, receiver)
      },
      set(target, prop, value) {
        if (typeof prop !== 'string') {
          return Reflect.set(target, prop, value)
        }
        if (hasOwn(setters, prop)) {
          const setter = setters[prop]
          if (setter === FUNCTION_PLACEHOLDER) {
            setters[prop] = initProxyFunction(
              options.utsBridgeName,
              options.methods.find(
                (m) => m.name === prop && m.type === 'setter'
              )!,
              instanceId
            )
          }
          setters[prop](value)
          return true
        }
        return Reflect.set(target, prop, value)
      },
    }
  )
  if (typeof FinalizationRegistry !== 'undefined') {
    ensureUTSClassInstanceRegistry()
    UTSClassInstanceRegistry.register(instanceProxy, instanceId)
  }
  return instanceProxy
}

export function initUTSProxyClass(options: ClassOptions) {
  const constructor = initProxyFunction(
    options.utsBridgeName,
    options.constructor
  )
  const staticMethods: Record<string, Function> = {}
  const staticGetters: Record<string, Function> = {}
  const staticSetters: Record<string, Function> = {}
  for (const method of options.staticMethods) {
    switch (method.type) {
      case 'staticMethod':
        staticMethods[method.name] = FUNCTION_PLACEHOLDER
        break
      case 'staticGetter':
        staticGetters[method.name] = FUNCTION_PLACEHOLDER
        break
      case 'staticSetter':
        staticSetters[method.name] = FUNCTION_PLACEHOLDER
        break
    }
  }
  const ProxyClass = class {
    __instanceId: number = 0
    constructor(...args: any[]) {
      this.__instanceId = constructor(...args) as number
      if (!this.__instanceId) {
        throw new Error(`new ${options.name} is failed`)
      }
      const instance = this
      const methods: Record<string, Function> = {}
      const getters: Record<string, Function> = {}
      const setters: Record<string, Function> = {}
      for (const method of options.methods) {
        switch (method.type) {
          case 'method':
            methods[method.name] = FUNCTION_PLACEHOLDER
            break
          case 'getter':
            getters[method.name] = FUNCTION_PLACEHOLDER
            break
          case 'setter':
            setters[method.name] = FUNCTION_PLACEHOLDER
            break
        }
      }
      const instanceProxy = new Proxy(instance, {
        get(target, prop, receiver) {
          // 重要：禁止响应式
          if (prop === '__v_skip') {
            return true
          }
          if (typeof prop !== 'string') {
            return Reflect.get(target, prop, receiver)
          }
          if (hasOwn(methods, prop)) {
            if (methods[prop] === FUNCTION_PLACEHOLDER) {
              methods[prop] = initProxyFunction(
                options.utsBridgeName,
                options.methods.find(
                  (m) => m.name === prop && m.type === 'method'
                )!,
                instance.__instanceId,
                instanceProxy
              )
            }
            return methods[prop]
          }
          if (hasOwn(getters, prop)) {
            const getter = getters[prop]
            if (getter === FUNCTION_PLACEHOLDER) {
              getters[prop] = initProxyFunction(
                options.utsBridgeName,
                options.methods.find(
                  (m) => m.name === prop && m.type === 'getter'
                )!,
                instance.__instanceId,
                instanceProxy
              )
            }
            return getters[prop]()
          }
          return Reflect.get(target, prop, receiver)
        },
        set(target, prop, value) {
          if (typeof prop !== 'string') {
            return Reflect.set(target, prop, value)
          }
          if (hasOwn(setters, prop)) {
            const setter = setters[prop]
            if (setter === FUNCTION_PLACEHOLDER) {
              setters[prop] = initProxyFunction(
                options.utsBridgeName,
                options.methods.find(
                  (m) => m.name === prop && m.type === 'setter'
                )!,
                instance.__instanceId,
                instanceProxy
              )
            }
            setters[prop](value)
            return true
          }
          return Reflect.set(target, prop, value)
        },
      })
      if (typeof FinalizationRegistry !== 'undefined') {
        ensureUTSClassInstanceRegistry()
        UTSClassInstanceRegistry.register(
          instanceProxy,
          instanceProxy.__instanceId
        )
      }
      return instanceProxy
    }
  }
  return new Proxy(ProxyClass, {
    get(target, prop, receiver) {
      if (hasOwn(staticMethods, prop)) {
        const method = staticMethods[prop as string]
        if (method === FUNCTION_PLACEHOLDER) {
          staticMethods[prop as string] = initProxyFunction(
            options.utsBridgeName,
            options.staticMethods.find(
              (m) => m.name === prop && m.type === 'staticMethod'
            )!
          )
        }
        return staticMethods[prop as string]
      }
      if (hasOwn(staticGetters, prop)) {
        const getter = staticGetters[prop as string]
        if (getter === FUNCTION_PLACEHOLDER) {
          staticGetters[prop as string] = initProxyFunction(
            options.utsBridgeName,
            options.staticMethods.find(
              (m) => m.name === prop && m.type === 'staticGetter'
            )!
          )
        }
        return staticGetters[prop as string]()
      }
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value) {
      if (hasOwn(staticSetters, prop)) {
        const setter = staticSetters[prop as string]
        if (setter === FUNCTION_PLACEHOLDER) {
          staticSetters[prop as string] = initProxyFunction(
            options.utsBridgeName,
            options.staticMethods.find(
              (m) => m.name === prop && m.type === 'staticSetter'
            )!
          )
        }
        staticSetters[prop as string](value)
        return true
      }
      return Reflect.set(target, prop, value)
    },
  })
}

// UniElementImpl基类优先方法列表
const UNIELEMENT_PRIORITY_METHODS = [
  'hasAttribute',
  'getAttribute',
  // 'setAttribute',
  // 'removeAttribute',
  'getAnyAttribute',
  // 'setAnyAttribute',
]
let elementClassDefineId = 0
export function initUTSElementProxyClass(options: ClassOptions) {
  const classId = ++elementClassDefineId
  const staticMethods: Record<string, Function> = {}
  const staticGetters: Record<string, Function> = {}
  const staticSetters: Record<string, Function> = {}
  for (const method of options.staticMethods) {
    switch (method.type) {
      case 'staticMethod':
        staticMethods[method.name] = FUNCTION_PLACEHOLDER
        break
      case 'staticGetter':
        staticGetters[method.name] = FUNCTION_PLACEHOLDER
        break
      case 'staticSetter':
        staticSetters[method.name] = FUNCTION_PLACEHOLDER
        break
    }
  }
  const ProxyClass = class extends UniViewElementImpl {
    static [Symbol.hasInstance](instance) {
      return instance && instance.__element_class_id__ === classId
    }
    constructor(nodeId: number, page: any, tagName: string) {
      // @ts-expect-error 构造参数调整
      super(nodeId, page, tagName)
      const pageId = page.pageId
      const element = { __type__: 'UniElement', pageId, nodeId }
      const methods: Record<string, Function> = {}
      const getters: Record<string, Function> = {}
      const setters: Record<string, Function> = {}
      for (const method of options.methods) {
        switch (method.type) {
          case 'method':
            methods[method.name] = FUNCTION_PLACEHOLDER
            break
          case 'getter':
            getters[method.name] = FUNCTION_PLACEHOLDER
            break
          case 'setter':
            setters[method.name] = FUNCTION_PLACEHOLDER
            break
        }
      }
      return new Proxy(this, {
        get(target, prop, receiver) {
          // 重要：禁止响应式
          if (prop === '__v_skip') {
            return true
          }
          if (prop === '__element_class_id__') {
            return classId
          }
          if (typeof prop !== 'string') {
            return Reflect.get(target, prop, receiver)
          }
          if (UNIELEMENT_PRIORITY_METHODS.includes(prop) && prop in target) {
            return target[prop].bind(target)
          }
          if (hasOwn(methods, prop)) {
            if (methods[prop] === FUNCTION_PLACEHOLDER) {
              methods[prop] = initProxyFunction(
                options.utsBridgeName,
                options.methods.find(
                  (m) => m.name === prop && m.type === 'method'
                )!,
                element
              )
            }
            return methods[prop]
          }
          if (hasOwn(getters, prop)) {
            const getter = getters[prop]
            if (getter === FUNCTION_PLACEHOLDER) {
              getters[prop] = initProxyFunction(
                options.utsBridgeName,
                options.methods.find(
                  (m) => m.name === prop && m.type === 'getter'
                )!,
                element
              )
            }
            return getters[prop]()
          }
          return Reflect.get(target, prop, receiver)
        },
        set(target, prop, value) {
          if (typeof prop !== 'string') {
            return Reflect.set(target, prop, value)
          }
          if (hasOwn(setters, prop)) {
            const setter = setters[prop]
            if (setter === FUNCTION_PLACEHOLDER) {
              setters[prop] = initProxyFunction(
                options.utsBridgeName,
                options.methods.find(
                  (m) => m.name === prop && m.type === 'setter'
                )!,
                element
              )
            }
            setters[prop](value)
            return true
          }
          return Reflect.set(target, prop, value)
        },
      })
    }
  }
  return new Proxy(ProxyClass, {
    get(target, prop, receiver) {
      if (hasOwn(staticMethods, prop)) {
        const method = staticMethods[prop as string]
        if (method === FUNCTION_PLACEHOLDER) {
          staticMethods[prop as string] = initProxyFunction(
            options.utsBridgeName,
            options.staticMethods.find(
              (m) => m.name === prop && m.type === 'staticMethod'
            )!
          )
        }
        return staticMethods[prop as string]
      }
      if (hasOwn(staticGetters, prop)) {
        const getter = staticGetters[prop as string]
        if (getter === FUNCTION_PLACEHOLDER) {
          staticGetters[prop as string] = initProxyFunction(
            options.utsBridgeName,
            options.staticMethods.find(
              (m) => m.name === prop && m.type === 'staticGetter'
            )!
          )
        }
        return staticGetters[prop as string]()
      }
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value) {
      if (hasOwn(staticSetters, prop)) {
        const setter = staticSetters[prop as string]
        if (setter === FUNCTION_PLACEHOLDER) {
          staticSetters[prop as string] = initProxyFunction(
            options.utsBridgeName,
            options.staticMethods.find(
              (m) => m.name === prop && m.type === 'staticSetter'
            )!
          )
        }
        staticSetters[prop as string](value)
        return true
      }
      return Reflect.set(target, prop, value)
    },
  })
}

export function initUTSProxyFunction(
  moduleName: string,
  options: FunctionOptions
) {
  return initProxyFunction(moduleName, options)
}
