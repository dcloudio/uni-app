import type { App, ComponentPublicInstance } from 'vue'
import { getNativeApp } from './app'

export function initComponentInstance(app: App) {
  app.mixin({
    beforeMount(this: ComponentPublicInstance) {
      const vm = this
      const instance = vm.$
      if ((instance.type as any).mpType === 'app') {
        return
      }
      const pageId = instance.root.attrs.__pageId
      vm.$nativePage = getNativeApp().pageManager.findPageById(pageId + '')
    },
  })
}
