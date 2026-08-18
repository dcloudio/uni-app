import { reactive } from 'vue'
import { initTabBarI18n } from '@dcloudio/uni-core'
import { parseTheme, useTheme } from '../../helpers/theme'

let _tabBar: UniApp.TabBarOptions | undefined

export function useTabBar() {
  if (!_tabBar) {
    _tabBar =
      __uniConfig.tabBar &&
      reactive<UniApp.TabBarOptions>(initTabBarI18n(__uniConfig.tabBar))
  }

  const tabBar = useTheme(_tabBar!, () => {
    const tabBarStyle = parseTheme(_tabBar!)
    tabBar.backgroundColor = tabBarStyle.backgroundColor
    tabBar.borderStyle = tabBarStyle.borderStyle
    tabBar.color = tabBarStyle.color
    tabBar.selectedColor = tabBarStyle.selectedColor
    tabBar.blurEffect = tabBarStyle.blurEffect
    tabBar.midButton = tabBarStyle.midButton
    if (tabBarStyle.list && tabBarStyle.list.length) {
      tabBarStyle.list.forEach((item, index) => {
        tabBar.list[index].iconPath = item.iconPath
        tabBar.list[index].selectedIconPath = item.selectedIconPath
      })
    }
  })
  return tabBar
}
