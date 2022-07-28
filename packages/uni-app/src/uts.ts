import { isPlainObject, hasOwn } from '@vue/shared'
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

interface ProxyBaseOptions {
  pkg: string
  cls: string
  method: string
}

interface ProxyFunctionOptions extends ProxyBaseOptions {
  async?: boolean
}

interface InvokeArgs {
  package: string
  class: string
  method: string
  params: unknown[]
}

export function initUtsProxyFunction({
  pkg,
  cls,
  method,
  async,
}: ProxyFunctionOptions) {
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
      console.error(
        `${pkg}${cls ? '.' + cls : ''}.${method} ${name} is not found`
      )
    }
  }

  return (...args: unknown[]) => {
    if (!proxy) {
      proxy = uni.requireNativePlugin('ProxyModule') as any
    }
    const params = args.map((arg) => normalizeArg(arg))
    const invokeArgs: InvokeArgs = { package: pkg, class: cls, method, params }
    if (async) {
      return new Promise((resolve, reject) => {
        proxy.invokeAsync(invokeArgs, (res: ProxyInvokeResponse) => {
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
    return proxy.invokeSync(invokeArgs, invokeCallback)
  }
}

interface ProxyClassOptions {
  pkg: string
  cls: string
  methods: {
    [name: string]: {
      async?: boolean
    }
  }
}

export function initUtsProxyClass({
  pkg,
  cls,
  methods,
}: ProxyClassOptions): any {
  return class ProxyClass {
    constructor() {
      const target: Record<string, Function> = {}
      return new Proxy(this, {
        get(_, method) {
          if (!target[method as string]) {
            if (hasOwn(methods, method)) {
              target[method] = initUtsProxyFunction({
                pkg,
                cls,
                method,
                async: methods[method].async,
              })
            }
            return target[method as string]
          }
        },
      })
    }
  }
}
