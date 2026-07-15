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

function isUTSAndroid() {
  return __VAPOR_PLATFORM__ === 'app-android'
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
  nested: boolean
  keepAlive: boolean
  instance?: unknown
  instanceId?: number
  params: unknown[]
}
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
type InvokeSyncCallback = (res: InvokeCallbackParamsRes) => void
type InvokeAsyncCallback = (
  res: InvokeCallbackReturnRes | InvokeCallbackParamsRes
) => void

type InvokeChannel = {
  invokeSync: (args: InvokeArgs, callback: InvokeSyncCallback) => InvokeSyncRes
  invokeAsync: (args: InvokeArgs, callback: InvokeAsyncCallback) => void
}
let channel: InvokeChannel
function getProxy(): InvokeChannel {
  if (!channel) {
    channel = {
      invokeSync(args: InvokeArgs, callback: InvokeSyncCallback) {
        // @ts-expect-error
        return nativeChannel.invokeSync('APP-SERVICE', args, callback)
      },
      invokeAsync(args: InvokeArgs, callback: InvokeAsyncCallback) {
        // @ts-expect-error
        return nativeChannel.invokeAsync('APP-SERVICE', args, callback)
      },
    }
  }
  return channel
}

function unregisterInstance(id: number) {
  const args: InvokeArgs = {
    moduleName: '_uts_bridge',
    methodId: 1,
    nested: false,
    keepAlive: false,
    params: [id],
  }
  getProxy().invokeSync(args, () => {})
}

export function registerUTSInterface(moduleName: string) {}
export function initUTSProxyClass(moduleName: string) {}
export function initUTSProxyFunction(moduleName: string) {
  unregisterInstance(0)
}
export function initUTSElementProxyClass(moduleName: string) {}
