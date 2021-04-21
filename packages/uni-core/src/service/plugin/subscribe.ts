export function initSubscribe() {
  UniServiceJSBridge.on('onAppEnterForeground', () => {})
  UniServiceJSBridge.on('onAppEnterBackground', () => {})
}
