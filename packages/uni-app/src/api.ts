/**
 * uni 对象是跨实例的，而此处列的 API 均是需要跟当前实例关联的，比如 requireNativePlugin 获取 dom 时，依赖当前 weex 实例
 */

export function getCurrentSubNVue() {
  return uni.getSubNVueById(plus.webview.currentWebview().id)
}
export function requireNativePlugin(name: string) {
  return weex.requireModule(name)
}
