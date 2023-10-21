import { normallizeStyles } from 'uni-shared'
import { getTheme } from '../service/api/base/get-browser-info'
import {
  ON_THEME_CHANGE
} from 'uni-helpers/constants'

export { getTheme }

export function onThemeChange (callback = () => { }) {
  if (__uniConfig.darkmode) {
    UniServiceJSBridge.on('api.' + ON_THEME_CHANGE, callback)
  }
}

export function offThemeChange (callback = () => { }) {
  UniServiceJSBridge.off('api.' + ON_THEME_CHANGE, callback)
}

export function parseTheme (pageStyle) {
  let parsedStyle = {}
  if (__uniConfig.darkmode) {
    const theme = getTheme()
    parsedStyle = normallizeStyles(pageStyle, __uniConfig.themeConfig, theme)
  }
  return __uniConfig.darkmode ? parsedStyle : pageStyle
}
