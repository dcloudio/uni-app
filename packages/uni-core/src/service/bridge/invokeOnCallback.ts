export const invokeOnCallback: UniApp.UniServiceJSBridge['invokeOnCallback'] = (
  name: string,
  res: unknown
) => UniServiceJSBridge.emit('api.' + name, res)
