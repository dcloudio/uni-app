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
  selectedIconPath
}) {
  if (!isTabBarPage()) {
    return {
      errMsg: 'setTabBarItem:fail not TabBar page'
    }
  }
  tabBar.setTabBarItem(index, text, iconPath, selectedIconPath)
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
  const style = {}
  const borderStyles = {
    black: 'rgba(0,0,0,0.4)',
    white: 'rgba(255,255,255,0.4)'
  }
  if (color) {
    style.color = color
  }
  if (selectedColor) {
    style.selectedColor = selectedColor
  }
  if (backgroundColor) {
    style.backgroundColor = backgroundColor
  }
  if (borderStyle in borderStyles) {
    borderStyle = borderStyles[borderStyle]
  }
  if (borderStyle) {
    style.borderStyle = borderStyle
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
