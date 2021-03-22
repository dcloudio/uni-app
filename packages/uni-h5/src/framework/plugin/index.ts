import { App } from 'vue'

import { initApp } from '@dcloudio/uni-vue'
import { initView, initService } from '@dcloudio/uni-core'
import { isCustomElement } from '@dcloudio/uni-shared'

import { initRouter } from './router'
import { initSystemComponents } from './components'
import { initMixin } from './mixin'
import { initProvide } from './provide'

export default {
  install(app: App) {
    app._context.config.isCustomElement = isCustomElement

    initApp(app)
    initView(app)
    initService(app)
    initSystemComponents(app)

    initMixin(app)
    initProvide(app, (__UNI_FEATURE_PAGES__ && initRouter(app)) || undefined)
  },
}
