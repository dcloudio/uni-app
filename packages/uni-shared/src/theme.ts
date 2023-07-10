import { isPlainObject, isString, isArray } from '@vue/shared'

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

export function normalizeStyles<T extends Object>(
  pageStyle: T,
  themeConfig: UniApp.ThemeJson = {},
  mode: UniApp.ThemeMode = 'light'
) {
  const modeStyle = themeConfig[mode]
  const styles = {} as T

  if (!modeStyle) {
    return pageStyle
  }

  Object.keys(pageStyle).forEach((key) => {
    type Key = keyof typeof pageStyle
    let styleItem = pageStyle[key as Key] // Object Array String

    ;(styles as any)[key] = (() => {
      if (isPlainObject(styleItem)) {
        return normalizeStyles(styleItem as T, themeConfig, mode)
      } else if (isArray(styleItem)) {
        return (styleItem as any[]).map((item) =>
          isPlainObject(item)
            ? normalizeStyles(item as T, themeConfig, mode)
            : item
        )
      } else if (isString(styleItem) && (styleItem as string).startsWith('@')) {
        const _key = (styleItem as string).replace('@', '')
        let _styleItem = modeStyle[_key] || styleItem
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
    })()
  })

  return styles
}
