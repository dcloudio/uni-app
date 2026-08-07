import App from './App'

import { createSSRApp } from 'vue'
import { createStore } from 'vuex'

const independentPlugin = {
  install(app) {
    app.config.globalProperties.$independentPluginReady = 'plugin-ready'
    app.provide('independentPluginReady', 'plugin-ready')
  },
}

export function createApp() {
  const app = createSSRApp(App)
  const store = createStore({
    state() {
      return {
        independentMessage: 'store-ready',
      }
    },
  })
  app.use(store)
  app.use(independentPlugin)
  app.config.globalProperties.$independentGlobal = 'global-ready'
  return {
    app,
  }
}
