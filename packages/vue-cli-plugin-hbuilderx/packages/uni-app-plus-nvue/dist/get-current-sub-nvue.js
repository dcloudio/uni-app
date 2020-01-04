export default function getCurrentSubNVue() {
  return uni.getSubNVueById(plus.webview.currentWebview().id)
}
