import { ComponentPublicInstance } from 'vue'
import { initOn } from './on'
import { initSubscribe } from './subscribe'

export function initService() {
  if (__NODE_JS__) {
    return
  }
  initOn()
  initSubscribe()
}

export function initAppVm(appVm: ComponentPublicInstance) {
  appVm.$vm = appVm
  appVm.$mpType = 'app'
}

export function initPageVm(
  pageVm: ComponentPublicInstance,
  page: Page.PageInstance['$page']
) {
  pageVm.$vm = pageVm
  pageVm.$page = page
  pageVm.$mpType = 'page'
  pageVm.__isTabBar = page.meta.isTabBar!
}
