declare const weex: any
declare const __requireNativePlugin__: any

export function requireNativePlugin(pluginName: string) {
  if (typeof weex !== 'undefined') {
    return weex.requireModule(pluginName)
  }

  return __requireNativePlugin__(pluginName)
}

export function sendNativeEvent(
  event: string,
  data: Record<string, any>,
  callback: Function
) {
  // 实时获取weex module（weex可能会变化，比如首页nvue加速显示时）
  return requireNativePlugin('plus').sendNativeEvent(event, data, callback)
}
