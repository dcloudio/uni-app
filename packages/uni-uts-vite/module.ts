declare const uni: {
  requireNativePlugin(name: string): { invoke: Function }
}

const moduleName = '__MODULE_NAME__'

const moduleDefine = '__MODULE_DEFINE__'

export default initModule(moduleDefine as unknown as Record<string, boolean>)

let callbackId = 1

const objectToString = Object.prototype.toString
const toTypeString = (value: unknown): string => objectToString.call(value)

const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]'

export function normalizeArg(arg: unknown) {
  if (typeof arg === 'function') {
    return {
      $$type: 'function',
      value: callbackId++,
    }
  } else if (isPlainObject(arg)) {
    Object.keys(arg).forEach((name) => {
      ;(arg as any)[name] = normalizeArg((arg as any)[name])
    })
  }
  return arg
}

function moduleGetter(proxy: any, module: string, method: string) {
  return (...args: unknown[]) => {
    const params = args.map((arg) => normalizeArg(arg))
    proxy.invoke({ module, method, params }, () => {})
  }
}

function initModule(moduleDefine: Record<string, unknown>) {
  const proxy = uni.requireNativePlugin('proxy-module')
  const moduleProxy = {}
  for (const methodName in moduleDefine) {
    Object.defineProperty(moduleProxy, methodName, {
      enumerable: true,
      configurable: true,
      get: () => moduleGetter(proxy, moduleName, methodName),
    })
  }
}
