import { getTheme } from '../service/api/base/getBrowserInfo'
import { normalizeStyles, ON_THEME_CHANGE } from '@dcloudio/uni-shared'

export { getTheme }

export function onThemeChange(
  callback: (res: { theme: UniApp.ThemeMode }) => void
) {
  if (__uniConfig.darkmode) {
    UniServiceJSBridge.on(ON_THEME_CHANGE, callback as UniApp.CallbackFunction)
  }
}

export function offThemeChange(callback: UniApp.CallbackFunction) {
  UniServiceJSBridge.off(ON_THEME_CHANGE, callback)
}

export function parseTheme<T extends Object>(pageStyle: T): T {
  let parsedStyle = {} as T
  if (__uniConfig.darkmode) {
    parsedStyle = normalizeStyles(
      pageStyle,
      __uniConfig.themeConfig,
      getTheme()
    )
  }

  return __uniConfig.darkmode ? parsedStyle : pageStyle
}
