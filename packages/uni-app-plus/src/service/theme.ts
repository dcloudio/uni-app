import { weexGetSystemInfoSync } from './api/device/systemInfo'
import { normalizeStyles } from '@dcloudio/uni-shared'
import { parseWebviewStyle } from './framework/webview/style/index'
import { ON_THEME_CHANGE } from '@dcloudio/uni-shared'

function onThemeChange(callback: UniApp.CallbackFunction) {
  UniServiceJSBridge.on(ON_THEME_CHANGE, callback)
}

function offThemeChange(callback: UniApp.CallbackFunction) {
  UniServiceJSBridge.off(ON_THEME_CHANGE, callback)
}

export function parseTheme<T extends Object>(pageStyle: T): T {
  let parsedStyle = {} as T
  if (__uniConfig.darkmode) {
    let theme: UniApp.ThemeMode = 'light'

    const systemInfo = weexGetSystemInfoSync()
    if (systemInfo) {
      theme = systemInfo.hostTheme || systemInfo.osTheme
    }

    parsedStyle = normalizeStyles(pageStyle, __uniConfig.themeConfig, theme)
  }

  return __uniConfig.darkmode ? parsedStyle : pageStyle
}

export function useTabBarThemeChange(
  tabBar: any,
  options: UniApp.TabBarOptions
) {
  if (__uniConfig.darkmode) {
    const fn = () => {
      const {
        list = [],
        color,
        selectedColor,
        backgroundColor,
        borderStyle,
      } = parseTheme(options)
      tabBar &&
        tabBar.setTabBarStyle({
          color,
          selectedColor,
          backgroundColor,
          borderStyle,
        })
      tabBar &&
        tabBar.setTabBarItems({
          list: list.map((item) => ({
            iconPath: item.iconPath,
            selectedIconPath: item.selectedIconPath,
          })),
        })
    }

    // 由于应用首次启动获取不到手机 theme 应用首次启动设置下 tabBar
    fn()

    onThemeChange(fn)
  }
}

export function useWebviewThemeChange(
  webview: PlusWebviewWebviewObject,
  getWebviewStyle: () => ReturnType<typeof parseWebviewStyle>
) {
  if (__uniConfig.darkmode) {
    const fn = () => {
      const {
        animationAlphaBGColor,
        background,
        backgroundColorBottom,
        backgroundColorTop,
        titleNView: { backgroundColor, titleColor } = {},
      } = getWebviewStyle()
      webview?.setStyle({
        animationAlphaBGColor,
        background,
        backgroundColorBottom,
        backgroundColorTop,
        titleNView: {
          backgroundColor,
          titleColor,
        },
      })
    }

    onThemeChange(fn)

    webview.addEventListener('close', () => offThemeChange(fn))
  }
}
