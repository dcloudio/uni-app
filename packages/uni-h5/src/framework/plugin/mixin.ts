import { App, ComponentPublicInstance } from 'vue'
import { isApp, initApp } from './app'
import { initPage, isPage } from './page'
export function initMixin(app: App) {
  // 目前使用mixin实现，稍后应调整为不依赖options的方案
  app.mixin({
    created(this: ComponentPublicInstance) {
      if (isApp(this)) {
        initApp(this)
      } else if (isPage(this)) {
        initPage(this)
        this.$callHook('onLoad', {})
        this.$callHook('onShow')
      }
    },
    mounted() {
      if (isPage(this)) {
        this.$callHook('onReady')
      }
    },
  })
}
