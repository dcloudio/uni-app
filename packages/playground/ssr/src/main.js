import { createSSRApp } from 'vue'
import App from './App.vue'
import createStore from './store'
export function createApp() {
  const store = createStore()
  const app = createSSRApp(App)
  app.use(store)
  // `trace` 是组件的继承关系追踪
  app.config.warnHandler = function (msg) {
    const ssrLogElem = document.getElementById('ssr-log')
    ssrLogElem && (ssrLogElem.innerHTML = ssrLogElem.innerHTML + '\n' + msg)
  }
  return {
    app,
    store,
  }
}
