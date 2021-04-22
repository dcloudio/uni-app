import { reactive } from 'vue'

let tabBar: UniApp.TabBarOptions | undefined

export function useTabBar() {
  if (!tabBar) {
    tabBar =
      __uniConfig.tabBar && reactive<UniApp.TabBarOptions>(__uniConfig.tabBar)
  }
  return tabBar
}
