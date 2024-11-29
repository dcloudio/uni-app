import { isString } from '@vue/shared'

const BORDER_COLORS = new Map<string, string>([
  ['white', 'rgba(255, 255, 255, 0.33)'],
  ['black', 'rgba(0, 0, 0, 0.33)'],
])

function getBorderStyle(borderStyle: string): string {
  const value = BORDER_COLORS.get(borderStyle)

  if (borderStyle && !value) {
    console.warn(
      '4.23 版本起，在 pages.json 设置 tabbar borderStyle、在 uni.setTabBarStyle 设置 borderStyle 时仅支持 white/black，推荐使用 borderColor 自定义颜色。'
    )
  }
  return value || (BORDER_COLORS.get('black') as string)
}

// keep borderStyle aliways black/white
export function fixBorderStyle(tabBarConfig: Map<string, any>) {
  let borderStyle = tabBarConfig.get('borderStyle')
  let borderColor = tabBarConfig.get('borderColor')
  const isBorderColorFilled = isString(borderColor)

  // 如果设置 borderStyle 做格式化
  borderStyle = getBorderStyle(borderStyle as string)

  // 同时存在 borderColor>borderStyle，前者没有颜色限制，也不做格式化
  if (isBorderColorFilled) {
    borderStyle = borderColor
  }

  tabBarConfig.set('borderStyle', borderStyle)
  tabBarConfig.delete('borderColor')
}
