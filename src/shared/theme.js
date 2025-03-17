import { isPlainObject, isString, isArray } from './util'

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

export function normalizeTitleColor (titleColor) {
  return titleColor === 'black' ? '#000000' : '#ffffff'
}

function resolveStringStyleItem (modeStyle, styleItem, key) {
  if (isString(styleItem) && styleItem.startsWith('@')) {
    const _key = styleItem.replace('@', '')
    let _styleItem = modeStyle[_key] || styleItem
    switch (key) {
      case 'titleColor':
        _styleItem = normalizeTitleColor(_styleItem)
        break
      case 'borderStyle':
        _styleItem = normalizeTabBarStyles(_styleItem)
        break

      default:
        break
    }
    return _styleItem
  }
  return styleItem
}

export function normalizeStyles (pageStyle, themeConfig = {}, mode = 'light') {
  const modeStyle = themeConfig[mode]
  const styles = {}

  if (typeof modeStyle === 'undefined' || !pageStyle) return pageStyle

  Object.keys(pageStyle).forEach(key => {
    const styleItem = pageStyle[key] // Object Array String

    const parseStyleItem = () => {
      if (isPlainObject(styleItem)) { return normalizeStyles(styleItem, themeConfig, mode) }

      if (isArray(styleItem)) {
        return styleItem.map(item => {
          if (isPlainObject(item)) { return normalizeStyles(item, themeConfig, mode) }
          return resolveStringStyleItem(modeStyle, item)
        })
      }

      return resolveStringStyleItem(modeStyle, styleItem, key)
    }

    styles[key] = parseStyleItem()
  })

  return styles
}
