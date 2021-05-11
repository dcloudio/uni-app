import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  // `trace` 是组件的继承关系追踪
  app.config.warnHandler = function (msg) {
    const ssrLogElem = document.getElementById('ssr-log')
    ssrLogElem && (ssrLogElem.innerHTML = ssrLogElem.innerHTML + '\n' + msg)
  }
  return {
    app,
  }
}
