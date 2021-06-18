import { invokeHook } from '@dcloudio/uni-core'
import tabBar from './tabBar'

export function initTabBar() {
  const len = __uniConfig.tabBar?.list?.length
  if (!len) {
    return
  }

  __uniConfig.tabBar!.selectedIndex = 0

  const selected = __uniConfig.tabBar!.list.findIndex(
    (page) => page.pagePath === __uniConfig.entryPagePath
  )

  tabBar.init(
    __uniConfig.tabBar!,
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
    __uniConfig.tabBar!.selectedIndex = selected
    selected !== 0 && tabBar.switchTab(__uniConfig.entryPagePath!)
  }
}
