import { reactive } from 'vue'
import { initTabBarI18n } from '@dcloudio/uni-core'

let tabBar: UniApp.TabBarOptions | undefined

export function useTabBar() {
  if (!tabBar) {
    tabBar =
      __uniConfig.tabBar &&
      reactive<UniApp.TabBarOptions>(initTabBarI18n(__uniConfig.tabBar))
  }
  return tabBar
}
