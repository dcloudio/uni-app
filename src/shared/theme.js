import { isPlainObject, isStr } from './util'

const borderStyles = {
  black: 'rgba(0,0,0,0.4)',
  white: 'rgba(255,255,255,0.4)'
}

export function normalizeTabBarStyles (borderStyle) {
  if (borderStyle && borderStyle in borderStyles) {
    return borderStyles[borderStyle]
  }
  return borderStyle
}

export function normallizeStyles (pageStyle, themeConfig = {}, mode = 'light') {
  const modeStyle = themeConfig[mode]
  const styles = {}
  if (!modeStyle) {
    return pageStyle
  }
  Object.keys(pageStyle).forEach((key) => {
    const styleItem = pageStyle[key] // Object Array String
    styles[key] = (() => {
      if (isPlainObject(styleItem)) {
        return normallizeStyles(styleItem, themeConfig, mode)
      } else if (Array.isArray(styleItem)) {
        return styleItem.map((item) => isPlainObject(item)
          ? normallizeStyles(item, themeConfig, mode)
          : item)
      } else if (isStr(styleItem) && styleItem.startsWith('@')) {
        const _key = styleItem.replace('@', '')
        let _styleItem = modeStyle[_key] || styleItem
        switch (key) {
          case 'borderStyle':
            _styleItem = normalizeTabBarStyles(_styleItem)
            break
        }
        return _styleItem
      }
      return styleItem
    })()
  })
  return styles
}
