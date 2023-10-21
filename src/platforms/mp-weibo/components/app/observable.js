import Vue from 'vue'
import { initTabBarI18n } from 'uni-helpers/i18n'
import { onThemeChange, parseTheme } from '../theme'

const originalTabBar = __uniConfig.tabBar || {}

__uniConfig.tabBar = Vue.observable(parseTheme(initTabBarI18n(originalTabBar)))

onThemeChange(() => {
  const tabBarStyle = parseTheme(initTabBarI18n(originalTabBar))
  __uniConfig.tabBar.backgroundColor = tabBarStyle.backgroundColor
  __uniConfig.tabBar.borderStyle = tabBarStyle.borderStyle
  __uniConfig.tabBar.color = tabBarStyle.color
  __uniConfig.tabBar.selectedColor = tabBarStyle.selectedColor
  __uniConfig.tabBar.blurEffect = tabBarStyle.blurEffect
  if (tabBarStyle.list && tabBarStyle.list.length && __uniConfig.tabBar.list.length) {
    tabBarStyle.list.forEach((item, index) => {
      __uniConfig.tabBar.list[index].iconPath = item.iconPath
      __uniConfig.tabBar.list[index].selectedIconPath = item.selectedIconPath
    })
  }
})

export const tabBar = __uniConfig.tabBar
