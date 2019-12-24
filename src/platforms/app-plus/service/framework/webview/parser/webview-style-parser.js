import {
  parseTitleNView
} from './title-nview-parser'

import {
  parsePullToRefresh
} from './pull-to-refresh-parser'

import {
  parseStyleUnit
} from './style-unit-parser'

const WEBVIEW_STYLE_BLACKLIST = [
  'navigationBarBackgroundColor',
  'navigationBarTextStyle',
  'navigationBarTitleText',
  'navigationBarShadow',
  'navigationStyle',
  'disableScroll',
  'backgroundColor',
  'backgroundTextStyle',
  'enablePullDownRefresh',
  'onReachBottomDistance',
  'usingComponents',
  // 需要解析的
  'titleNView',
  'pullToRefresh'
]

export function parseWebviewStyle (id, path, routeOptions = {}) {
  const webviewStyle = Object.create(null)

  // 合并
  routeOptions.window = parseStyleUnit(Object.assign(
    JSON.parse(JSON.stringify(__uniConfig.window || {})),
    routeOptions.window || {}
  ))

  Object.keys(routeOptions.window).forEach(name => {
    if (WEBVIEW_STYLE_BLACKLIST.indexOf(name) === -1) {
      webviewStyle[name] = routeOptions.window[name]
    }
  })

  const titleNView = parseTitleNView(routeOptions)
  if (titleNView) {
    if (id === 1 && __uniConfig.realEntryPagePath) {
      titleNView.autoBackButton = true
    }
    webviewStyle.titleNView = titleNView
  }

  const pullToRefresh = parsePullToRefresh(routeOptions)
  if (pullToRefresh) {
    if (pullToRefresh.style === 'circle') {
      webviewStyle.bounce = 'none'
    }
    webviewStyle.pullToRefresh = pullToRefresh
  }

  // 不支持 hide
  if (webviewStyle.popGesture === 'hide') {
    delete webviewStyle.popGesture
  }

  // TODO 下拉刷新

  if (path && routeOptions.meta.isNVue) {
    webviewStyle.uniNView = {
      path,
      defaultFontSize: __uniConfig.defaultFontSize,
      viewport: __uniConfig.viewport
    }
  }

  return webviewStyle
}
