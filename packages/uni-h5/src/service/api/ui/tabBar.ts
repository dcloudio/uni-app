import { hasOwn } from '@vue/shared'
import {
  API_HIDE_TAB_BAR,
  API_HIDE_TAB_BAR_RED_DOT,
  API_REMOVE_TAB_BAR_BADGE,
  API_SET_TAB_BAR_BADGE,
  API_SET_TAB_BAR_ITEM,
  API_SET_TAB_BAR_STYLE,
  API_SHOW_TAB_BAR,
  API_SHOW_TAB_BAR_RED_DOT,
  type API_TYPE_HIDE_TAB_BAR,
  type API_TYPE_HIDE_TAB_BAR_RED_DOT,
  type API_TYPE_REMOVE_TAB_BAR_BADGE,
  type API_TYPE_SET_TAB_BAR_BADGE,
  type API_TYPE_SET_TAB_BAR_ITEM,
  type API_TYPE_SET_TAB_BAR_STYLE,
  type API_TYPE_SHOW_TAB_BAR,
  type API_TYPE_SHOW_TAB_BAR_RED_DOT,
  HideTabBarProtocol,
  HideTabBarRedDotOptions,
  HideTabBarRedDotProtocol,
  RemoveTabBarBadgeOptions,
  RemoveTabBarBadgeProtocol,
  SetTabBarBadgeOptions,
  SetTabBarBadgeProtocol,
  SetTabBarItemOptions,
  SetTabBarItemProtocol,
  SetTabBarStyleOptions,
  SetTabBarStyleProtocol,
  ShowTabBarProtocol,
  ShowTabBarRedDotOptions,
  ShowTabBarRedDotProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { normalizeTabBarRoute } from '@dcloudio/uni-core'
import { addLeadingSlash } from '@dcloudio/uni-shared'
import { useTabBar } from '../../../framework/setup/state'
import {
  getCurrentBasePages,
  getPage$BasePage,
} from '../../../framework/setup/page'

const setTabBarItemProps = [
  'text',
  'iconPath',
  'iconfont',
  'selectedIconPath',
  'visible',
]
const setTabBarStyleProps = [
  'color',
  'selectedColor',
  'backgroundColor',
  'borderStyle',
  'borderColor',
  'midButton',
]
const setTabBarBadgeProps = ['badge', 'redDot']

function setProperties(
  item: Record<string, any>,
  props: string[],
  propsData: Record<string, any>
) {
  props.forEach(function (name) {
    if (hasOwn(propsData, name)) {
      item[name] = propsData[name]
    }
  })
}

function setTabBar(
  type: string,
  args: Record<string, any>,
  resolve: () => void,
  reject: (errMsg?: string, errRes?: any) => void
) {
  let isTabBar = false
  const pages = getCurrentBasePages()
  if (pages.length) {
    if (getPage$BasePage(pages[pages.length - 1]).meta.isTabBar) {
      isTabBar = true
    }
  }
  if (!isTabBar) {
    return reject(`not TabBar page`)
  }
  const { index } = args
  if (typeof index === 'number') {
    const tabBarListLength = __uniConfig?.tabBar?.list.length
    if (!tabBarListLength || index >= tabBarListLength) {
      return reject(`tabbar item not found`)
    }
  }
  const tabBar = useTabBar()!
  switch (type) {
    case API_SHOW_TAB_BAR:
      tabBar.shown = true
      break
    case API_HIDE_TAB_BAR:
      tabBar.shown = false
      break
    case API_SET_TAB_BAR_ITEM:
      const tabBarItem = tabBar.list[index]
      const oldPagePath = tabBarItem.pagePath
      setProperties(tabBarItem, setTabBarItemProps, args)
      const { pagePath } = args
      if (pagePath) {
        const newPagePath = addLeadingSlash(pagePath)
        if (newPagePath !== oldPagePath) {
          normalizeTabBarRoute(index, oldPagePath, newPagePath)
        }
      }
      break
    case API_SET_TAB_BAR_STYLE:
      // 设置 tabBar style
      setProperties(tabBar, setTabBarStyleProps, args)
      break
    case API_SHOW_TAB_BAR_RED_DOT:
      setProperties(tabBar.list[index], setTabBarBadgeProps, {
        badge: '',
        redDot: true,
      })
      break
    case API_SET_TAB_BAR_BADGE:
      setProperties(tabBar.list[index], setTabBarBadgeProps, {
        badge: args.text,
        redDot: true,
      })
      break
    case API_HIDE_TAB_BAR_RED_DOT:
    case API_REMOVE_TAB_BAR_BADGE:
      setProperties(tabBar.list[index], setTabBarBadgeProps, {
        badge: '',
        redDot: false,
      })
      break
  }
  resolve()
}

export const setTabBarItem = defineAsyncApi<API_TYPE_SET_TAB_BAR_ITEM>(
  API_SET_TAB_BAR_ITEM,
  (args, { resolve, reject }) => {
    setTabBar(API_SET_TAB_BAR_ITEM, args, resolve, reject)
  },
  SetTabBarItemProtocol,
  SetTabBarItemOptions
)

export const setTabBarStyle = defineAsyncApi<API_TYPE_SET_TAB_BAR_STYLE>(
  API_SET_TAB_BAR_STYLE,
  (args, { resolve, reject }) => {
    setTabBar(API_SET_TAB_BAR_STYLE, args, resolve, reject)
  },
  SetTabBarStyleProtocol,
  SetTabBarStyleOptions
)

export const hideTabBar = defineAsyncApi<API_TYPE_HIDE_TAB_BAR>(
  API_HIDE_TAB_BAR,
  (args, { resolve, reject }) => {
    setTabBar(API_HIDE_TAB_BAR, args ? args : {}, resolve, reject)
  },
  HideTabBarProtocol
)

export const showTabBar = defineAsyncApi<API_TYPE_SHOW_TAB_BAR>(
  API_SHOW_TAB_BAR,
  (args, { resolve, reject }) => {
    setTabBar(API_SHOW_TAB_BAR, args ? args : {}, resolve, reject)
  },
  ShowTabBarProtocol
)
export const hideTabBarRedDot = defineAsyncApi<API_TYPE_HIDE_TAB_BAR_RED_DOT>(
  API_HIDE_TAB_BAR_RED_DOT,
  (args, { resolve, reject }) => {
    setTabBar(API_HIDE_TAB_BAR_RED_DOT, args, resolve, reject)
  },
  HideTabBarRedDotProtocol,
  HideTabBarRedDotOptions
)

export const showTabBarRedDot = defineAsyncApi<API_TYPE_SHOW_TAB_BAR_RED_DOT>(
  API_SHOW_TAB_BAR_RED_DOT,
  (args, { resolve, reject }) => {
    setTabBar(API_SHOW_TAB_BAR_RED_DOT, args, resolve, reject)
  },
  ShowTabBarRedDotProtocol,
  ShowTabBarRedDotOptions
)

export const removeTabBarBadge = defineAsyncApi<API_TYPE_REMOVE_TAB_BAR_BADGE>(
  API_REMOVE_TAB_BAR_BADGE,
  (args, { resolve, reject }) => {
    setTabBar(API_REMOVE_TAB_BAR_BADGE, args, resolve, reject)
  },
  RemoveTabBarBadgeProtocol,
  RemoveTabBarBadgeOptions
)

export const setTabBarBadge = defineAsyncApi<API_TYPE_SET_TAB_BAR_BADGE>(
  API_SET_TAB_BAR_BADGE,
  (args, { resolve, reject }) => {
    setTabBar(API_SET_TAB_BAR_BADGE, args, resolve, reject)
  },
  SetTabBarBadgeProtocol,
  SetTabBarBadgeOptions
)
