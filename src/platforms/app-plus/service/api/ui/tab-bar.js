import {
  isTabBarPage
} from '../util'

import tabbar from '../../framework/tabbar'

export function setTabBarBadge ({
  index,
  text,
  type
}) {
  tabbar.setTabBarBadge(type, index, text)
  return {
    errMsg: 'setTabBarBadge:ok'
  }
}

export function setTabBarItem ({
  index,
  text,
  iconPath,
  selectedIconPath
}) {
  if (!isTabBarPage()) {
    return {
      errMsg: 'setTabBarItem:fail not TabBar page'
    }
  }
  tabbar.setTabBarItem(index, text, iconPath, selectedIconPath)
  return {
    errMsg: 'setTabBarItem:ok'
  }
}

export function setTabBarStyle ({
  color,
  selectedColor,
  backgroundColor,
  borderStyle
}) {
  if (!isTabBarPage()) {
    return {
      errMsg: 'setTabBarStyle:fail not TabBar page'
    }
  }
  tabbar.setTabBarStyle({
    color,
    selectedColor,
    backgroundColor,
    borderStyle
  })
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
  tabbar.hideTabBar(animation)
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
  tabbar.showTabBar(animation)
  return {
    errMsg: 'showTabBar:ok'
  }
}
