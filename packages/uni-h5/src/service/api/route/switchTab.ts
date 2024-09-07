import type { ComponentPublicInstance } from 'vue'
import {
  API_SWITCH_TAB,
  type API_TYPE_SWITCH_TAB,
  SwitchTabOptions,
  SwitchTabProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPageVm, invokeHook } from '@dcloudio/uni-core'
import {
  entryPageState,
  getCurrentPagesMap,
  getPage$BasePage,
  removePage,
  switchTabPagesBeforeEntryPages,
} from '../../../framework/setup/page'
import { navigate } from './utils'
import { ON_HIDE } from '@dcloudio/uni-shared'

export function removeNonTabBarPages() {
  const curTabBarPageVm = getCurrentPageVm()
  if (!curTabBarPageVm) {
    return
  }
  const pagesMap = getCurrentPagesMap()
  const keys = pagesMap.keys()
  for (const routeKey of keys) {
    const page = pagesMap.get(routeKey) as ComponentPublicInstance
    if (!page.$.__isTabBar) {
      removePage(routeKey)
    } else {
      page.$.__isActive = false
    }
  }
  if (curTabBarPageVm.$.__isTabBar) {
    curTabBarPageVm.$.__isVisible = false
    invokeHook(curTabBarPageVm, ON_HIDE)
  }
}

/**
 * 判断 url 和 page 是否为同一个页面
 * @param url 目标页
 * @param $page 页面栈中的某个页面
 * @returns boolean
 */
function isSamePage(url: string, $page: Page.PageInstance['$page']) {
  return url === $page.fullPath || (url === '/' && $page.meta.isEntry)
}

export function getTabBarPageId(url: string) {
  const pages = getCurrentPagesMap().values()
  for (const page of pages) {
    const $page = getPage$BasePage(page)
    if (isSamePage(url, $page)) {
      ;(page as ComponentPublicInstance).$.__isActive = true
      return $page.id
    }
  }
}

export const switchTab = defineAsyncApi<API_TYPE_SWITCH_TAB>(
  API_SWITCH_TAB,
  // @ts-expect-error
  ({ url, tabBarText, isAutomatedTesting }, { resolve, reject }) => {
    if (!entryPageState.handledBeforeEntryPageRoutes) {
      switchTabPagesBeforeEntryPages.push({
        args: { type: API_SWITCH_TAB, url, tabBarText, isAutomatedTesting },
        resolve,
        reject,
      })
      return
    }

    return (
      removeNonTabBarPages(),
      navigate(
        { type: API_SWITCH_TAB, url, tabBarText, isAutomatedTesting },
        getTabBarPageId(url)
      )
        .then(resolve)
        .catch(reject)
    )
  },
  SwitchTabProtocol,
  SwitchTabOptions
)
