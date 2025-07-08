import type { App, ComponentPublicInstance } from 'vue'
import { getNativeApp } from './app'
import { loadFontFaceByStyles } from '../utils'

export function initNativePage(vm: ComponentPublicInstance) {
  const instance = vm.$
  if ((instance.type as any).mpType === 'app') {
    return
  }
  const pageId = instance.root.attrs.__pageId
  vm.$nativePage = getNativeApp().pageManager.findPageById(pageId + '')
  if (vm.$page) {
    // @ts-expect-error
    vm.$page.__nativePageId = vm.$nativePage.pageId
  }
}

export function initFontFace(vm: ComponentPublicInstance) {
  const instance = vm.$
  if ((instance.type as any).mpType === 'app') {
    return
  }
  loadFontFaceByStyles(vm.$options.styles ?? [], false)
}

declare module 'vue' {
  interface AppConfig {
    uniX: {
      initNativePage: (vm: ComponentPublicInstance) => void
      initFontFace: (vm: ComponentPublicInstance) => void
    }
  }
}

export function initComponentInstance(app: App) {
  // 给 vapor 使用
  app.config.uniX = {
    initNativePage,
    initFontFace,
  }
  app.mixin({
    beforeCreate(this: ComponentPublicInstance) {
      initNativePage(this)
    },
    beforeMount(this: ComponentPublicInstance) {
      initFontFace(this)
    },
  })
}
