export function sendNativeEvent (event, data, callback) {
  // 实时获取weex module（weex可能会变化，比如首页nvue加速显示时）
  return weex.requireModule('plus').sendNativeEvent(event, data, callback)
}
