// @ts-expect-error
const proxy = uni.requireNativePlugin('proxy-module')
// @ts-expect-error
const moduleName = __MODULE_NAME__
// @ts-expect-error
const moduleDefine = __MODULE_DEFINE__
var module = initModule(moduleDefine)
let callbackId = 0
const objectToString = Object.prototype.toString
const toTypeString = (value) => objectToString.call(value)
const isPlainObject = (val) => toTypeString(val) === '[object Object]'
function normalizeArg(arg) {
  if (typeof arg === 'function') {
    return {
      type: 'function',
      value: callbackId++,
    }
  } else if (isPlainObject(arg)) {
    Object.keys(arg).forEach((name) => {
      arg[name] = normalizeArg(arg[name])
    })
  }
  return arg
}
function moduleGetter(module, method) {
  return (...args) => {
    const params = args.map((arg) => normalizeArg(arg))
    proxy.invoke({ module, method, params }, () => {})
  }
}
function initModule(moduleDefine) {
  const moduleProxy = {}
  for (const methodName in moduleDefine) {
    Object.defineProperty(moduleProxy, methodName, {
      enumerable: true,
      configurable: true,
      get: () => moduleGetter(moduleName, methodName),
    })
  }
}

export { module as default, normalizeArg }
