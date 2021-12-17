import {
  API_HIDE_TAB_BAR,
  API_HIDE_TAB_BAR_RED_DOT,
  API_REMOVE_TAB_BAR_BADGE,
  API_SET_TAB_BAR_BADGE,
  API_SET_TAB_BAR_ITEM,
  API_SET_TAB_BAR_STYLE,
  API_SHOW_TAB_BAR,
  API_SHOW_TAB_BAR_RED_DOT,
  API_TYPE_HIDE_TAB_BAR,
  API_TYPE_HIDE_TAB_BAR_RED_DOT,
  API_TYPE_REMOVE_TAB_BAR_BADGE,
  API_TYPE_SET_TAB_BAR_BADGE,
  API_TYPE_SET_TAB_BAR_ITEM,
  API_TYPE_SET_TAB_BAR_STYLE,
  API_TYPE_SHOW_TAB_BAR,
  API_TYPE_SHOW_TAB_BAR_RED_DOT,
  defineAsyncApi,
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
} from '@dcloudio/uni-api'
import { isTabBarPage } from '../../utils'
import tabBar from '../../framework/app/tabBar'

export const setTabBarBadge = defineAsyncApi<API_TYPE_SET_TAB_BAR_BADGE>(
  API_SET_TAB_BAR_BADGE,
  ({ index, text }, { resolve, reject }) => {
    tabBar.setTabBarBadge('text', index, text)
    resolve()
  },
  SetTabBarBadgeProtocol,
  SetTabBarBadgeOptions
)

export const setTabBarItem = defineAsyncApi<API_TYPE_SET_TAB_BAR_ITEM>(
  API_SET_TAB_BAR_ITEM,
  (
    { index, text, iconPath, selectedIconPath, pagePath, visible },
    { resolve, reject }
  ) => {
    tabBar.setTabBarItem(index, text, iconPath, selectedIconPath, visible)
    const route = pagePath && __uniRoutes.find(({ path }) => path === pagePath)
    if (route) {
      const meta = route.meta
      meta.isTabBar = true
      meta.tabBarIndex = index
      meta.isQuit = true
      const tabBar = __uniConfig.tabBar
      if (tabBar && tabBar.list && tabBar.list[index] && pagePath) {
        tabBar.list[index].pagePath = pagePath.startsWith('/')
          ? pagePath.substring(1)
          : pagePath
      }
    }
    resolve()
  },
  SetTabBarItemProtocol,
  SetTabBarItemOptions
)

export const setTabBarStyle = defineAsyncApi<API_TYPE_SET_TAB_BAR_STYLE>(
  API_SET_TAB_BAR_STYLE,
  (style = {}, { resolve, reject }) => {
    if (!isTabBarPage()) {
      return reject('not TabBar page')
    }
    const borderStyles = {
      black: 'rgba(0,0,0,0.4)',
      white: 'rgba(255,255,255,0.4)',
    }
    const borderStyle = style.borderStyle
    if (borderStyle && borderStyle in borderStyles) {
      style.borderStyle = borderStyles[borderStyle as keyof typeof borderStyles]
    }
    tabBar.setTabBarStyle(style)
    resolve()
  },
  SetTabBarStyleProtocol,
  SetTabBarStyleOptions
)

export const hideTabBar = defineAsyncApi<API_TYPE_HIDE_TAB_BAR>(
  API_HIDE_TAB_BAR,
  (args, { resolve, reject }) => {
    const animation = args && args.animation
    if (!isTabBarPage()) {
      return reject('not TabBar page')
    }
    tabBar.hideTabBar(Boolean(animation))
    resolve()
  },
  HideTabBarProtocol
)

export const showTabBar = defineAsyncApi<API_TYPE_SHOW_TAB_BAR>(
  API_SHOW_TAB_BAR,
  (args, { resolve, reject }) => {
    const animation = args && args.animation
    if (!isTabBarPage()) {
      return reject('not TabBar page')
    }
    tabBar.showTabBar(Boolean(animation))
    resolve()
  },
  ShowTabBarProtocol
)

export const showTabBarRedDot = defineAsyncApi<API_TYPE_SHOW_TAB_BAR_RED_DOT>(
  API_SHOW_TAB_BAR_RED_DOT,
  ({ index }, { resolve, reject }) => {
    tabBar.setTabBarBadge('redDot', index)
    resolve()
  },
  ShowTabBarRedDotProtocol,
  ShowTabBarRedDotOptions
)

const setTabBarBadgeNone = (index: number) =>
  tabBar.setTabBarBadge('none', index)

export const removeTabBarBadge = defineAsyncApi<API_TYPE_REMOVE_TAB_BAR_BADGE>(
  API_REMOVE_TAB_BAR_BADGE,
  ({ index }, { resolve, reject }) => {
    setTabBarBadgeNone(index)
    resolve()
  },
  RemoveTabBarBadgeProtocol,
  RemoveTabBarBadgeOptions
)

export const hideTabBarRedDot = defineAsyncApi<API_TYPE_HIDE_TAB_BAR_RED_DOT>(
  API_HIDE_TAB_BAR_RED_DOT,
  ({ index }, { resolve, reject }) => {
    setTabBarBadgeNone(index)
    resolve()
  },
  HideTabBarRedDotProtocol,
  HideTabBarRedDotOptions
)
