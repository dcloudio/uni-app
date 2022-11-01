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
})

export const tabBar = __uniConfig.tabBar
