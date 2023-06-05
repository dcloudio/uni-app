import { ComponentPublicInstance } from 'vue'
import {
  API_SWITCH_TAB,
  API_TYPE_SWITCH_TAB,
  defineAsyncApi,
  SwitchTabOptions,
  SwitchTabProtocol,
} from '@dcloudio/uni-api'
import { getCurrentPageVm, invokeHook } from '@dcloudio/uni-core'
import { getCurrentPagesMap, removePage } from '../../../framework/setup/page'
import { navigate } from './utils'
import { ON_HIDE } from '@dcloudio/uni-shared'

function removeNonTabBarPages() {
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

function getTabBarPageId(url: string) {
  const pages = getCurrentPagesMap().values()
  for (const page of pages) {
    const $page = page.$page
    if (isSamePage(url, $page)) {
      ;(page as ComponentPublicInstance).$.__isActive = true
      return $page.id
    }
  }
}

export const switchTab = defineAsyncApi<API_TYPE_SWITCH_TAB>(
  API_SWITCH_TAB,
  // @ts-ignore
  ({ url, tabBarText }, { resolve, reject }) => {
    return (
      removeNonTabBarPages(),
      navigate({ type: API_SWITCH_TAB, url, tabBarText }, getTabBarPageId(url))
        .then(resolve)
        .catch(reject)
    )
  },
  SwitchTabProtocol,
  SwitchTabOptions
)
