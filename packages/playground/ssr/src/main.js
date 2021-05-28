import { createSSRApp } from 'vue'
import App from './App.vue'
import createStore from './store/index'
export function createApp() {
  const app = createSSRApp(App)

  const store = createStore()
  app.use(store)

  app.config.warnHandler = function (msg) {
    const ssrLogElem = document.getElementById('ssr-log')
    ssrLogElem && (ssrLogElem.innerHTML = ssrLogElem.innerHTML + '\n' + msg)
  }
  return {
    app,
    store,
  }
}
