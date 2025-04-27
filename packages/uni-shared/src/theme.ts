import { isArray, isPlainObject, isString } from '@vue/shared'

export const borderStyles = {
  black: 'rgba(0,0,0,0.4)',
  white: 'rgba(255,255,255,0.4)',
}
export function normalizeTabBarStyles(borderStyle?: string) {
  if (borderStyle && borderStyle in borderStyles) {
    return borderStyles[borderStyle as keyof typeof borderStyles]
  }
  return borderStyle
}

export function normalizeTitleColor(titleColor: string) {
  return titleColor === 'black' ? '#000000' : '#ffffff'
}

function resolveStringStyleItem(
  modeStyle: Record<string, string>,
  styleItem: string,
  key?: string
) {
  if (isString(styleItem) && styleItem.startsWith('@')) {
    const _key = (styleItem as string).replace('@', '')
    let _styleItem = modeStyle![_key] || styleItem
    switch (key) {
      case 'titleColor':
        _styleItem = normalizeTitleColor(_styleItem)
        break
      case 'borderStyle':
        _styleItem = normalizeTabBarStyles(_styleItem)!
        break

      default:
        break
    }
    return _styleItem
  }
  return styleItem
}

export function normalizeStyles<T extends object>(
  pageStyle: T,
  themeConfig: UniApp.ThemeJson = {},
  mode: UniApp.ThemeMode = 'light'
) {
  const modeStyle = themeConfig[mode]
  const styles = {} as T

  if (typeof modeStyle === 'undefined' || !pageStyle) return pageStyle
  ;(Object.keys(pageStyle) as Array<keyof T>).forEach((key) => {
    const styleItem = pageStyle[key] // Object Array String

    const parseStyleItem = () => {
      if (isPlainObject(styleItem))
        return normalizeStyles(styleItem, themeConfig, mode)

      if (isArray(styleItem))
        return styleItem.map((item: object | Array<T> | string) => {
          if (isPlainObject(item))
            return normalizeStyles(item, themeConfig, mode)
          return resolveStringStyleItem(modeStyle, item)
        })

      return resolveStringStyleItem(
        modeStyle,
        styleItem as string,
        key as string
      )
    }

    styles[key] = parseStyleItem() as T[keyof T]
  })

  return styles
}
