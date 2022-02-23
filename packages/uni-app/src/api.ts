export function getCurrentSubNVue() {
  // @ts-ignore
  return uni.getSubNVueById(plus.webview.currentWebview().id)
}
