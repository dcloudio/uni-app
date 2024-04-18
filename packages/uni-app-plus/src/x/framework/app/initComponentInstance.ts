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
      if (instance.root === instance) {
        // 页面
      } else {
        // 自定义组件，接受页面传递的样式
        // @ts-expect-error
        instance.type.styles = [
          // @ts-expect-error
          ...(instance.type.styles ?? []),
          // @ts-expect-error
          ...(instance.root.type.styles ?? []),
        ]
        // 和 android 不同，后续样式在 parseStyleSheet 进一步处理
      }
      const pageId = instance.root.attrs.__pageId
      vm.$nativePage = getNativeApp().pageManager.findPageById(pageId + '')
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
