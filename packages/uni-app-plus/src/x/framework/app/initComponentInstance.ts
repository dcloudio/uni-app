import type { App, ComponentPublicInstance } from 'vue'
import { getNativeApp } from './app'
import { loadFontFaceByStyles } from '../utils'
import { beforeSetupPage } from '../../../service/framework/page/setup'

export function initNativePage(vm: ComponentPublicInstance) {
  const instance = vm.$
  if ((instance.type as any).mpType === 'app') {
    return
  }
  const pageId = instance.root.attrs.__pageId
  vm.$nativePage = getNativeApp().pageManager.findPageById(pageId + '')
  // 必须先执行 setupXPage 之后，才有 $page
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
  const pageVm = (vm.$page as UniPage | null)?.vm ?? null
  if (!pageVm) {
    console.warn('[initFontFace] can not find page, skip loadFontFace')
    return
  }
  // 加载页面字体
  loadFontFaceByStyles(vm.$options.styles ?? [], pageVm)
}

export function initComponentInstance(app: App) {
  // 给 vapor 使用
  app.config.uniX = {
    beforeSetupPage,
    initNativePage,
    initFontFace,
  }
  // vapor 模式不需要
  !(app as any).vapor &&
    app.mixin({
      beforeCreate(this: ComponentPublicInstance) {
        initNativePage(this)
      },
      beforeMount(this: ComponentPublicInstance) {
        initFontFace(this)
      },
    })
}
