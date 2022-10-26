import { normallizeStyles } from 'uni-shared'
import { weexGetSystemInfoSync } from '../api/device/system'

const ON_THEME_CHANGE = 'api.onThemeChange'

function onThemeChange (callback = () => { }) {
  UniServiceJSBridge.on(ON_THEME_CHANGE, callback)
}

function offThemeChange (callback = () => { }) {
  UniServiceJSBridge.off(ON_THEME_CHANGE, callback)
}

export function parseTheme (pageStyle) {
  let parsedStyle = {}
  if (__uniConfig.darkmode) {
    let theme = 'light'
    const systemInfo = weexGetSystemInfoSync()
    if (systemInfo) {
      theme = systemInfo.hostTheme || systemInfo.osTheme
    }
    parsedStyle = normallizeStyles(pageStyle, __uniConfig.themeConfig, theme)
  }
  return __uniConfig.darkmode ? parsedStyle : pageStyle
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
          selectedIconPath: item.selectedIconPath
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
      const {
        animationAlphaBGColor, background,
        backgroundColorBottom, backgroundColorTop,
        titleNView: { backgroundColor, titleColor } = {}
      } = getWebviewStyle()
      webview && webview.setStyle({
        animationAlphaBGColor,
        background,
        backgroundColorBottom,
        backgroundColorTop,
        titleNView: {
          backgroundColor,
          titleColor
        }
      })
    }
    onThemeChange(fn)
    webview.addEventListener('close', () => offThemeChange(fn))
  }
}
