import {
  isTabBarPage
} from '../util'

import tabBar from '../../framework/tab-bar'

export function setTabBarBadge ({
  index,
  text,
  type = 'text'
}) {
  tabBar.setTabBarBadge(type, index, text)
  return {
    errMsg: 'setTabBarBadge:ok'
  }
}

export function setTabBarItem ({
  index,
  text,
  iconPath,
  selectedIconPath,
  pagePath,
  visible,
  iconfont
}) {
  tabBar.setTabBarItem(index, text, iconPath, selectedIconPath, visible, iconfont)
  const route = pagePath && __uniRoutes.find(({ path }) => path === pagePath)
  if (route) {
    const meta = route.meta
    meta.isTabBar = true
    meta.tabBarIndex = index
    meta.isQuit = true
    const tabBar = __uniConfig.tabBar
    if (tabBar && tabBar.list && tabBar.list[index]) {
      tabBar.list[index].pagePath = pagePath.startsWith('/') ? pagePath.substring(1) : pagePath
    }
  }
  return {
    errMsg: 'setTabBarItem:ok'
  }
}

export function setTabBarStyle (style = {}) {
  if (!isTabBarPage()) {
    return {
      errMsg: 'setTabBarStyle:fail not TabBar page'
    }
  }
  const borderStyles = {
    black: 'rgba(0,0,0,0.4)',
    white: 'rgba(255,255,255,0.4)'
  }
  const borderStyle = style.borderStyle
  if (borderStyle in borderStyles) {
    style.borderStyle = borderStyles[borderStyle]
  }
  tabBar.setTabBarStyle(style)
  return {
    errMsg: 'setTabBarStyle:ok'
  }
}

export function hideTabBar ({
  animation
}) {
  if (!isTabBarPage()) {
    return {
      errMsg: 'hideTabBar:fail not TabBar page'
    }
  }
  tabBar.hideTabBar(animation)
  return {
    errMsg: 'hideTabBar:ok'
  }
}

export function showTabBar ({
  animation
}) {
  if (!isTabBarPage()) {
    return {
      errMsg: 'showTabBar:fail not TabBar page'
    }
  }
  tabBar.showTabBar(animation)
  return {
    errMsg: 'showTabBar:ok'
  }
}
