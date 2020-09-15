import { App } from 'vue'

import { initApp } from '@dcloudio/uni-vue'
import { initView, initService } from '@dcloudio/uni-core'

import { initRouter } from './router'
import { initSystemComponents } from './components'

export default {
  install(app: App) {
    initApp(app)
    initView(app)
    initService(app)
    initSystemComponents(app)

    initRouter(app)
  }
}
