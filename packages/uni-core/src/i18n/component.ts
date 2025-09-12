import { defineI18nProperties, defineI18nProperty } from './useI18n'
import { isEnableLocale } from './utils'

export function initNavigationBarI18n(
  navigationBar: UniApp.PageNavigationBar | PlusWebviewWebviewTitleNViewStyles
) {
  if (isEnableLocale()) {
    return defineI18nProperties(navigationBar, [
      ['titleText'],
      ['searchInput', 'placeholder'],
      ['buttons', 'text'],
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

export function initTabBarI18n(tabBar: UniApp.TabBarOptions) {
  if (isEnableLocale() && tabBar.list) {
    tabBar.list.forEach((item) => {
      defineI18nProperty(item, ['text'])
    })
  }
  if (isEnableLocale() && tabBar.midButton) {
    defineI18nProperty(tabBar.midButton, ['text'])
  }
  return tabBar
}
