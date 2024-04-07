import { getTheme } from '../service/api/base/getBrowserInfo'
import { ON_THEME_CHANGE, normalizeStyles } from '@dcloudio/uni-shared'
import { isReactive, reactive, watch } from 'vue'

export { getTheme }

type OnThemeChangeCallback = (res: { theme: UniApp.ThemeMode }) => void

export function onThemeChange(callback: OnThemeChangeCallback) {
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

export function useTheme<T extends Object>(
  pageStyle: T,
  onThemeChangeCallback?: OnThemeChangeCallback
) {
  const isReactived = isReactive(pageStyle)
  const reactivePageStyle = isReactived
    ? reactive(parseTheme(pageStyle))
    : parseTheme(pageStyle)
  if (__uniConfig.darkmode && isReactived) {
    watch(pageStyle, (value) => {
      const _pageStyle = parseTheme(value)
      for (const key in _pageStyle) {
        ;(reactivePageStyle as T)[key] = _pageStyle[key]
      }
    })
  }
  onThemeChangeCallback && onThemeChange(onThemeChangeCallback)
  return reactivePageStyle
}
