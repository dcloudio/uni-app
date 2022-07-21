const moduleName = '__MODULE_NAME__'
const moduleDefine = '__MODULE_DEFINE__'
var module = initModule(moduleDefine)
let callbackId = 1
const objectToString = Object.prototype.toString
const toTypeString = (value) => objectToString.call(value)
const isPlainObject = (val) => toTypeString(val) === '[object Object]'
const callbacks = {}
function normalizeArg(arg) {
  if (typeof arg === 'function') {
    const id = callbackId++
    callbacks[id] = arg
    return id
  } else if (isPlainObject(arg)) {
    Object.keys(arg).forEach((name) => {
      arg[name] = normalizeArg(arg[name])
    })
  }
  return arg
}
function isProxyInvokeCallbackResponse(res) {
  return !!res.name
}
function moduleGetter(proxy, module, method, defines) {
  const invokeCallback = ({ id, name, params, keepAlive }) => {
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
  return (...args) => {
    const params = args.map((arg) => normalizeArg(arg))
    const invokeArgs = { module, method, params, async: !!defines.async }
    if (defines.async) {
      return new Promise((resolve, reject) => {
        proxy.invoke(invokeArgs, (res) => {
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
function initModule(moduleDefine) {
  let proxy
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

export { module as default, normalizeArg }
