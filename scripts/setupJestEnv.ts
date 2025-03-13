;(global as any).__UNI_SOCKET_HOSTS__ = ''
;(global as any).__UNI_SOCKET_PORT__ = ''
;(global as any).__UNI_SOCKET_ID__ = ''
;(global as any).plus = {
  navigator: {},
  os: {},
}
;(global as any).UniServiceJSBridge = {
  publishHandler(...args: any[]) {
    console.log('publishHandler', JSON.stringify(args))
  },
}
let instanceId = 1
;(global as any).uni = {
  requireNativePlugin(name: string) {
    return {
      invokeSync(args: Record<string, any>, callback: unknown) {
        console.log(`invoke`, JSON.stringify(args))
        if (args.name === 'constructor') {
          return { type: 'return', params: instanceId++ }
        }
        return { type: 'return', params: null }
      },
      invokeAsync(args: unknown, callback: unknown) {
        console.log(`invokeAsync`, JSON.stringify(args))
      },
    }
  },
}
