import type { App, ComponentPublicInstance } from 'vue'
import { getNativeApp } from './app'
import { loadFontFaceByStyles } from '../utils'
import { beforeSetupPage } from '../../../service/framework/page/setup'
import { homeDialogPages, homeSystemDialogPages } from '../page/dialogPage'

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
  const pageId = instance.root.attrs.__pageId
  const targetPage = findPageById(pageId + '')

  if (!targetPage) {
    console.warn(
      '[initFontFace] can not find page for pageId: ' +
        pageId +
        ', skip loadFontFace'
    )
    return
  }
  // 加载页面字体
  loadFontFaceByStyles(vm.$options.styles ?? [], targetPage)
}

function findPageById(pageId: string): UniPage | null {
  const isTargetPage = (page: UniPage) => {
    const targetPageId = page.vm?.$.root.attrs.__pageId
    return targetPageId != null && pageId === targetPageId + ''
  }
  const findTargetPage = (pages: UniPage[]) => {
    for (let i = pages.length - 1; i >= 0; i--) {
      if (isTargetPage(pages[i])) {
        return pages[i]
      }
    }
    return null
  }

  const currentPages = getCurrentPages() as UniPage[]
  const targetPage = findTargetPage(currentPages)
  if (targetPage) {
    return targetPage
  }

  for (let i = currentPages.length - 1; i >= 0; i--) {
    const page = currentPages[i]
    const targetSystemDialogPage = findTargetPage(page.$getSystemDialogPages())
    if (targetSystemDialogPage) {
      return targetSystemDialogPage
    }

    const targetDialogPage = findTargetPage(page.getDialogPages())
    if (targetDialogPage) {
      return targetDialogPage
    }
  }

  return (
    findTargetPage(homeSystemDialogPages as UniPage[]) ||
    findTargetPage(homeDialogPages as UniPage[])
  )
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
