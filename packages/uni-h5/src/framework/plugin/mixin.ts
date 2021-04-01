import { App, ComponentPublicInstance } from 'vue'
import { isApp, initApp } from './app'
import { initPage, isPage } from './page'
export function initMixin(app: App) {
  // 目前使用mixin实现，稍后应调整为不依赖options的方案
  app.mixin({
    created(this: ComponentPublicInstance) {
      this.__isApp = isApp(this)
      this.__isPage = !this.__isApp && isPage(this)
      if (this.__isApp) {
        initApp(this)
      } else if (this.__isPage) {
        initPage(this)
        this.$callHook('onLoad', {})
        this.__isVisible = true
        this.$callHook('onShow')
      }
    },
    mounted() {
      if (this.__isPage) {
        this.$callHook('onReady')
      }
    },
    beforeActivate() {
      if (this.__isPage && !this.__isVisible) {
        this.$callHook('onShow')
      }
    },
    beforeDeactivate() {
      if (this.__isPage) {
        this.__isVisible = false
        this.$callHook('onHide')
      }
    },
    beforeUnmount() {
      // TODO 目前onUnload时机不对，比前一个页面的onShow要晚
      if (this.__isPage) {
        this.$callHook('onUnload')
      }
    },
  })
}
