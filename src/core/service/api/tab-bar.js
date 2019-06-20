import {
  setProperties
} from 'uni-shared'

const setTabBarItemProps = ['text', 'iconPath', 'selectedIconPath']

const setTabBarStyleProps = ['color', 'selectedColor', 'backgroundColor', 'borderStyle']

const setTabBarBadgeProps = ['badge', 'redDot']

function setTabBar (type, args = {}) {
  const app = getApp()

  if (app) {
    let isTabBar = false
    const pages = getCurrentPages()
    if (pages.length) {
      if (pages[pages.length - 1].$page.meta.isTabBar) {
        isTabBar = true
      }
    } else if (app.$children[0].hasTabBar) {
      isTabBar = true
    }
    if (!isTabBar) {
      return {
        errMsg: `${type}:fail not TabBar page`
      }
    }

    const {
      index
    } = args
    const tabBar = app.$children[0].tabBar
    if (index >= __uniConfig.tabBar.list.length) {
      return {
        errMsg: `${type}:fail tabbar item not found`
      }
    }
    switch (type) {
      case 'showTabBar':
        app.$children[0].hideTabBar = false
        break
      case 'hideTabBar':
        app.$children[0].hideTabBar = true
        break
      case 'setTabBarItem':
        setProperties(tabBar.list[index], setTabBarItemProps, args)
        break
      case 'setTabBarStyle':
        setProperties(tabBar, setTabBarStyleProps, args)
        break
      case 'showTabBarRedDot':
        setProperties(tabBar.list[index], setTabBarBadgeProps, {
          badge: '',
          redDot: true
        })
        break
      case 'setTabBarBadge':
        setProperties(tabBar.list[index], setTabBarBadgeProps, {
          badge: args.text,
          redDot: true
        })
        break
      case 'hideTabBarRedDot':
      case 'removeTabBarBadge':
        setProperties(tabBar.list[index], setTabBarBadgeProps, {
          badge: '',
          redDot: false
        })
        break
    }
  }
  return {}
}
export function setTabBarItem (args) {
  return setTabBar('setTabBarItem', args)
}

export function setTabBarStyle (args) {
  return setTabBar('setTabBarStyle', args)
}

export function hideTabBar (args) {
  return setTabBar('hideTabBar', args)
}

export function showTabBar (args) {
  return setTabBar('showTabBar', args)
}
export function hideTabBarRedDot (args) {
  return setTabBar('hideTabBarRedDot', args)
}

export function showTabBarRedDot (args) {
  return setTabBar('showTabBarRedDot', args)
}

export function removeTabBarBadge (args) {
  return setTabBar('removeTabBarBadge', args)
}

export function setTabBarBadge (args) {
  return setTabBar('setTabBarBadge', args)
}
