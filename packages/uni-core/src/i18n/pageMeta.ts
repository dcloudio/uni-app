import { once } from '@dcloudio/uni-shared'

import { defineI18nProperties } from './useI18n'

const isEnableLocale = once(
  () => __uniConfig.locales && !!Object.keys(__uniConfig.locales).length
)

export function initNavigationBarI18n(
  navigationBar: UniApp.PageNavigationBar | PlusWebviewWebviewTitleNViewStyles
) {
  if (isEnableLocale()) {
    return defineI18nProperties(navigationBar, [
      ['titleText'],
      ['searchInput', 'placeholder'],
    ]) as [boolean, boolean]
  }
}

export function initPullToRefreshI18n(
  pullToRefresh:
    | UniApp.PageRefreshOptions
    | PlusWebviewWebviewPullToRefreshStyles
) {
  if (isEnableLocale()) {
    const CAPTION = 'caption'
    return defineI18nProperties(pullToRefresh, [
      ['contentdown', CAPTION],
      ['contentover', CAPTION],
      ['contentrefresh', CAPTION],
    ]) as [boolean, boolean, boolean]
  }
}
