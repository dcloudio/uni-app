;(global as any).UniServiceJSBridge = {
  publishHandler(...args: any[]) {
    console.log('publishHandler', JSON.stringify(args))
  },
}
;(global as any).uni = {
  requireNativePlugin(name: string) {
    return {
      invokeSync(args: unknown, callback: unknown) {
        console.log(`invoke`, JSON.stringify(args))
      },
      invokeAsync(args: unknown, callback: unknown) {
        console.log(`invokeAsync`, JSON.stringify(args))
      },
    }
  },
}
