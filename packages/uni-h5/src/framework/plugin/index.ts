import { App } from 'vue'

import { initApp } from '@dcloudio/uni-vue'
import { initView, initService } from '@dcloudio/uni-core'

import { initRouter } from './router'

export default {
  install(app: App) {
    initApp(app)
    initView(app)
    initService(app)

    if (__UNI_FEATURE_PAGES__) {
      initRouter(app)
    }
  },
}
