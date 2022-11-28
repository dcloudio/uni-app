import { normallizeStyles } from 'uni-shared'
import { weexGetSystemInfoSync } from '../api/device/system'
import { setStatusBarStyle } from '../bridge'
import { getCurrentPages } from './page'

const ON_THEME_CHANGE = 'api.onThemeChange'

function onThemeChange (callback = () => { }) {
  UniServiceJSBridge.on(ON_THEME_CHANGE, callback)
}

function offThemeChange (callback = () => { }) {
  UniServiceJSBridge.off(ON_THEME_CHANGE, callback)
}

function getNavigatorStyle () {
  return plus.navigator.getUIStyle() === 'dark' ? 'light' : 'dark'
}

export function changePagesNavigatorStyle () {
  if (__uniConfig.darkmode) {
    const theme = getNavigatorStyle()

    setStatusBarStyle(theme)

    const pages = getCurrentPages(true)
    pages.forEach((page) => {
      page.$page.meta.statusBarStyle = theme
    })
  }
}

export function parseTheme (pageStyle) {
  if (__uniConfig.darkmode) {
    let parsedStyle = {}
    let theme = plus.navigator.getUIStyle()

    const systemInfo = weexGetSystemInfoSync()
    // 小程序 SDK
    if (systemInfo && systemInfo.hostTheme) {
      theme = systemInfo.hostTheme
    }

    parsedStyle = normallizeStyles(pageStyle, __uniConfig.themeConfig, theme)
    return parsedStyle
  }
  return pageStyle
}

export function useTabBarThemeChange (tabBar, options) {
  if (__uniConfig.darkmode) {
    const fn = () => {
      const {
        list = [], color, selectedColor,
        backgroundColor, borderStyle
      } = parseTheme(options, false)
      const tabbarStyle = {
        color,
        selectedColor,
        backgroundColor,
        borderStyle
      }

      tabBar && tabBar.setTabBarStyle(tabbarStyle)
      tabBar && tabBar.setTabBarItems({
        list: list.map((item) => ({
          iconPath: item.iconPath,
          selectedIconPath: item.selectedIconPath,
          visible: item.visible
        }))
      })
      // TODO 暂未实现
      // tabBar && tabBar.setAnimationAlphaBGColor(parseTheme((__uniConfig.window || {}).backgroundColor, false))
    }

    fn()

    onThemeChange(fn)
  }
}

export function useWebviewThemeChange (webview, getWebviewStyle) {
  if (__uniConfig.darkmode) {
    const fn = () => {
      const webviewStyle = getWebviewStyle()
      const style = {
        animationAlphaBGColor: webviewStyle.animationAlphaBGColor,
        background: webviewStyle.background,
        backgroundColorBottom: webviewStyle.backgroundColorBottom,
        backgroundColorTop: webviewStyle.backgroundColorTop
      }
      var titleNView = webviewStyle.titleNView
      if (typeof titleNView !== 'undefined') {
        style.titleNView = typeof titleNView === 'object' ? {
          backgroundColor: titleNView.backgroundColor,
          titleColor: titleNView.titleColor
        } : titleNView
      }
      webview && webview.setStyle(webviewStyle)
    }
    onThemeChange(fn)
    webview.addEventListener('close', () => offThemeChange(fn))
  }
}
