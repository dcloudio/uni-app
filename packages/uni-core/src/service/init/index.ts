import { ComponentPublicInstance, ref } from 'vue'
import { useI18n } from '../../i18n'
import { initOn } from './on'
import { initSubscribe } from './subscribe'

export function initService() {
  if (!__NODE_JS__) {
    initOn()
    initSubscribe()
  }
}

export function initAppVm(appVm: ComponentPublicInstance) {
  appVm.$vm = appVm
  appVm.$mpType = 'app'
  const locale = ref<string>(useI18n().getLocale())
  Object.defineProperty(appVm, '$locale', {
    get() {
      if (__PLATFORM__ === 'app') {
        ;(uni as any).$nvueState && (uni as any).$nvueState.locale
      }
      return locale.value
    },
    set(v) {
      if (__PLATFORM__ === 'app') {
        ;(uni as any).$nvueState && ((uni as any).$nvueState.locale = v)
      }
      locale.value = v
    },
  })
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
    pageVm.$.__isTabBar = true
    // TODO preload? 初始化时，状态肯定是激活
    pageVm.$.__isActive = true
  }
}
