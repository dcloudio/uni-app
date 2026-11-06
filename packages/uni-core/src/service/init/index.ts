import {
  type ComponentPublicInstance,
  ref,
  //#if _X_VAPOR_
  watch,
  //#endif
} from 'vue'
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
  //#if _X_VAPOR_
  // Vapor 不提供 $watch，复用 uni-i18n 已有的 $watchLocale 内部入口。
  // 翻译可能首次在子组件中调用：监听必须归属 App，避免子组件卸载后语言切换失效。
  Object.defineProperty(appVm, '$watchLocale', {
    configurable: true,
    value(callback: (locale: string) => void) {
      return appVm.$.scope.run(() =>
        // 先更新翻译器语言，再让读取 $locale 的组件刷新，避免显示上一种语言。
        watch(locale, callback, { flush: 'sync' })
      )
    },
  })
  //#endif
  Object.defineProperty(appVm, '$locale', {
    get() {
      return locale.value
    },
    set(v) {
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
  if (__X__) {
    pageVm.$basePage = page
  } else {
    pageVm.$page = page
  }
  pageVm.$mpType = 'page'
  pageVm.$fontFamilySet = new Set()

  if (page.meta.isTabBar) {
    pageVm.$.__isTabBar = true
    // TODO preload? 初始化时，状态肯定是激活
    pageVm.$.__isActive = true
  }
}
