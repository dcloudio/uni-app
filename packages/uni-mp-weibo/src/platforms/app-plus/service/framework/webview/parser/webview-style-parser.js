import { parseTitleNView } from './title-nview-parser'

import { parsePullToRefresh } from './pull-to-refresh-parser'

import { parseStyleUnit } from './style-unit-parser'

import { parseTheme } from '../../theme'

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

export function parseWebviewStyle (id, path, _routeOptions = {}) {
  const webviewStyle = {
    bounce: 'vertical'
  }

  // 合并
  _routeOptions.window = parseStyleUnit(
    Object.assign(
      JSON.parse(JSON.stringify(__uniConfig.window || {})),
      _routeOptions.window || {}
    )
  )

  const routeOptions = parseTheme(_routeOptions)

  Object.keys(routeOptions.window).forEach(name => {
    if (WEBVIEW_STYLE_BLACKLIST.indexOf(name) === -1) {
      webviewStyle[name] = routeOptions.window[name]
    }
  })

  let backgroundColor = routeOptions.window.backgroundColor
  if (
    /^#[a-z0-9]{6}$/i.test(backgroundColor) ||
    backgroundColor === 'transparent'
  ) {
    if (!webviewStyle.background) {
      webviewStyle.background = backgroundColor
    } else {
      backgroundColor = webviewStyle.background
    }
    if (!webviewStyle.backgroundColorTop) {
      webviewStyle.backgroundColorTop = backgroundColor
    }
    if (!webviewStyle.backgroundColorBottom) {
      webviewStyle.backgroundColorBottom = backgroundColor
    }
    if (!webviewStyle.animationAlphaBGColor) {
      webviewStyle.animationAlphaBGColor = backgroundColor
    }
    if (typeof webviewStyle.webviewBGTransparent === 'undefined') {
      webviewStyle.webviewBGTransparent = true
    }
  }

  const titleNView = parseTitleNView(id, routeOptions)
  if (titleNView) {
    if (
      id === 1 &&
      __uniConfig.realEntryPagePath &&
      !routeOptions.meta.isQuit // 可能是tabBar
    ) {
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

  if (routeOptions.meta.isQuit) {
    // 退出
    webviewStyle.popGesture = plus.os.name === 'iOS' ? 'appback' : 'none'
  }

  // TODO 下拉刷新

  if (path && routeOptions.meta.isNVue) {
    webviewStyle.uniNView = {
      path,
      defaultFontSize: __uniConfig.defaultFontSize,
      viewport: __uniConfig.viewport
    }
  }

  _routeOptions.meta = routeOptions.meta
  return webviewStyle
}
