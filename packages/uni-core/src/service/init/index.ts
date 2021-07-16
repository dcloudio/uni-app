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
  pageVm.route = page.route
  pageVm.$vm = pageVm
  pageVm.$page = page
  pageVm.$mpType = 'page'
  if (page.meta.isTabBar) {
    pageVm.__isTabBar = true
    // TODO preload? 初始化时，状态肯定是激活
    pageVm.$.__isActive = true
  }
}
