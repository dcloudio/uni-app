declare const uni: {
  requireNativePlugin(name: string): { invoke: Function }
}

const moduleName = '__MODULE_NAME__'

const moduleDefine = '__MODULE_DEFINE__' as unknown as Record<
  string,
  ModuleMethodDefine
>

interface ModuleMethodDefine {
  async?: boolean
}

export default initModule(moduleDefine)

let callbackId = 1

const objectToString = Object.prototype.toString
const toTypeString = (value: unknown): string => objectToString.call(value)

const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]'

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
interface ProxyInvokeAsyncResponse {
  errMsg: string
  params: unknown
}
interface ProxyInvokeCallbackResponse {
  id: number
  name: string
  params: unknown[]
  keepAlive: boolean
}
type ProxyInvokeResponse =
  | ProxyInvokeAsyncResponse
  | ProxyInvokeCallbackResponse

function isProxyInvokeCallbackResponse(
  res: ProxyInvokeResponse
): res is ProxyInvokeCallbackResponse {
  return !!(res as ProxyInvokeCallbackResponse).name
}
function moduleGetter(
  proxy: any,
  module: string,
  method: string,
  defines: ModuleMethodDefine
) {
  const invokeCallback = ({
    id,
    name,
    params,
    keepAlive,
  }: ProxyInvokeCallbackResponse) => {
    const callback = callbacks[id]
    if (callback) {
      callback(...params)
      if (!keepAlive) {
        delete callbacks[id]
      }
    } else {
      console.error(`${module}.${method} ${name} is not found`)
    }
  }
  return (...args: unknown[]) => {
    const params = args.map((arg) => normalizeArg(arg))
    const invokeArgs = { module, method, params, async: !!defines.async }
    if (defines.async) {
      return new Promise((resolve, reject) => {
        proxy.invoke(invokeArgs, (res: ProxyInvokeResponse) => {
          if (isProxyInvokeCallbackResponse(res)) {
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
    return proxy.invoke(invokeArgs, invokeCallback)
  }
}

function initModule(moduleDefine: Record<string, ModuleMethodDefine>) {
  let proxy: any
  const moduleProxy = {}
  for (const methodName in moduleDefine) {
    Object.defineProperty(moduleProxy, methodName, {
      enumerable: true,
      configurable: true,
      get: () => {
        if (!proxy) {
          proxy = uni.requireNativePlugin('proxy-module')
        }
        return moduleGetter(
          proxy,
          moduleName,
          methodName,
          moduleDefine[methodName]
        )
      },
    })
  }
}
