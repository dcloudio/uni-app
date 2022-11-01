import {
  SELECTED_COLOR,
  TABBAR_HEIGHT,
  normalizeTabBarStyles,
} from '@dcloudio/uni-shared'

export function initTabBar(
  entryPagePath: string,
  manifestJson: Record<string, any>,
  pagesJson: UniApp.PagesJson
) {
  if (!pagesJson.tabBar?.list?.length) {
    return
  }
  const tabBar = JSON.parse(
    JSON.stringify(pagesJson.tabBar)
  ) as UniApp.TabBarOptions

  tabBar.borderStyle = normalizeTabBarStyles(
    tabBar.borderStyle
  ) as UniNamespace.TabBarOptions['borderStyle']

  if (!tabBar.selectedColor) {
    tabBar.selectedColor = SELECTED_COLOR
  }
  tabBar.height = `${parseFloat(tabBar.height!) || TABBAR_HEIGHT}px`

  // 首页是 tabBar 页面
  const item = tabBar.list.find((page) => page.pagePath === entryPagePath)
  if (item) {
    ;(tabBar as any).child = ['lauchwebview']
    ;(tabBar as any).selected = tabBar.list.indexOf(item)
  }
  manifestJson.plus.tabBar = tabBar
}
