;(global as any).UniServiceJSBridge = {
  publishHandler(...args: any[]) {
    console.log('publishHandler', JSON.stringify(args))
  },
}
