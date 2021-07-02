import { App } from 'vue'

import { initApp } from '@dcloudio/uni-vue'
import { initViewPlugin, initServicePlugin } from '@dcloudio/uni-core'

import { initRouter } from './router'

export default {
  install(app: App) {
    initApp(app)
    initViewPlugin(app)
    initServicePlugin(app)

    if (__UNI_FEATURE_PAGES__) {
      initRouter(app)
    }
  },
}
