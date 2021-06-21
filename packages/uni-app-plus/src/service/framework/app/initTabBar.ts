import { invokeHook } from '@dcloudio/uni-core'
import tabBarInstance from './tabBar'

export function initTabBar() {
  const { tabBar } = __uniConfig
  const len = tabBar && tabBar.list && tabBar.list.length
  if (!len) {
    return
  }

  const { entryPagePath } = __uniConfig
  tabBar!.selectedIndex = 0

  const selected = tabBar!.list.findIndex(
    (page) => page.pagePath === entryPagePath
  )

  tabBarInstance.init(
    tabBar!,
    (item: UniApp.TabBarItemOptions, index: number) => {
      uni.switchTab({
        url: '/' + item.pagePath,
        openType: 'switchTab',
        from: 'tabBar',
        success() {
          invokeHook('onTabItemTap', {
            index,
            text: item.text,
            pagePath: item.pagePath,
          })
        },
      } as UniApp.SwitchTabOptions)
    }
  )

  if (selected !== -1) {
    // 取当前 tab 索引值
    tabBar!.selectedIndex = selected
    selected !== 0 && tabBarInstance.switchTab(entryPagePath!)
  }
}
