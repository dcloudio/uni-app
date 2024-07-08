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
import tabBar from '../../framework/app/tabBar'
import { normalizeTabBarStyles, removeLeadingSlash } from '@dcloudio/uni-shared'
import { normalizeTabBarRoute } from '@dcloudio/uni-core'
import { isTabBarPage } from '../../../helpers/plus'

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
    { index, text, iconPath, selectedIconPath, pagePath, visible, iconfont },
    { resolve }
  ) => {
    tabBar.setTabBarItem(
      index,
      text,
      iconPath,
      selectedIconPath,
      visible,
      iconfont
    )
    if (pagePath) {
      const tabBarItem = __uniConfig.tabBar!.list[index]
      if (tabBarItem) {
        const oldPagePath = tabBarItem.pagePath
        const newPagePath = removeLeadingSlash(pagePath)
        if (newPagePath !== oldPagePath) {
          normalizeTabBarRoute(index, oldPagePath, newPagePath)
        }
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
    style.borderStyle = normalizeTabBarStyles(style.borderStyle)
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
