import { once } from '@dcloudio/uni-shared'

import { defineI18nProperties } from './useI18n'

const isEnableLocale = once(
  () => __uniConfig.locales && !!Object.keys(__uniConfig.locales).length
)

export function initNavigationBarI18n(
  navigationBar: UniApp.PageNavigationBar | PlusWebviewWebviewTitleNViewStyles
) {
  if (isEnableLocale()) {
    defineI18nProperties(navigationBar, [
      ['titleText'],
      ['searchInput', 'placeholder'],
    ])
  }
  return navigationBar
}

export function initPullToRefreshI18n(
  pullToRefresh:
    | UniApp.PageRefreshOptions
    | PlusWebviewWebviewPullToRefreshStyles
) {
  if (isEnableLocale()) {
    const CAPTION = 'caption'
    defineI18nProperties(pullToRefresh, [
      ['contentdown', CAPTION],
      ['contentover', CAPTION],
      ['contentrefresh', CAPTION],
    ])
  }
  return pullToRefresh
}
