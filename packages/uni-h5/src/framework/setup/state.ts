import { reactive } from 'vue'
import { initTabBarI18n } from '@dcloudio/uni-core'
import { parseTheme, useTheme } from '../../helpers/theme'

let _tabBar: UniApp.TabBarOptions | undefined
let _tabBarStyle: UniApp.TabBarOptions | undefined

function updateTabBarStyle() {
  const tabBar = _tabBarStyle
  const tabBarConfig = _tabBar
  if (!tabBar || !tabBarConfig) {
    return
  }
  const tabBarStyle = parseTheme(tabBarConfig)
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
}

export function useTabBar() {
  if (!_tabBarStyle) {
    const tabBar = __uniConfig.tabBar
    if (!tabBar) {
      return
    }
    _tabBar = reactive<UniApp.TabBarOptions>(initTabBarI18n(tabBar))
    _tabBarStyle = useTheme(_tabBar, updateTabBarStyle)
  }

  return _tabBarStyle
}
