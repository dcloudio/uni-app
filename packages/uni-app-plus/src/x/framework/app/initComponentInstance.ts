import type { App, ComponentPublicInstance } from 'vue'
import { getNativeApp } from './app'
import { loadFontFaceByStyles } from '../utils'

export function initComponentInstance(app: App) {
  app.mixin({
    beforeCreate(this: ComponentPublicInstance) {
      const vm = this
      const instance = vm.$
      if ((instance.type as any).mpType === 'app') {
        return
      }
      const pageId = instance.root.attrs.__pageId
      vm.$nativePage = getNativeApp().pageManager.findPageById(pageId + '')
      if (vm.$page) {
        // @ts-expect-error
        vm.$page.nativePageId = vm.$nativePage.pageId
      }
    },
    beforeMount(this: ComponentPublicInstance) {
      const vm = this
      const instance = vm.$
      if ((instance.type as any).mpType === 'app') {
        return
      }
      loadFontFaceByStyles(vm.$options.styles ?? [], false)
    },
  })
}
