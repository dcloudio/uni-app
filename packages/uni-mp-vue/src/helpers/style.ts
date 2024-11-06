import { type NormalizedStyle, hyphenate, isString } from '@vue/shared'
import { normalizeStyle as vueNormalizeStyle } from '@vue/shared'
import { normalizeStyle as uniNormalizeStyle } from '@dcloudio/uni-shared'

export function stringifyStyle(value: unknown) {
  if (isString(value)) {
    return value
  }
  return stringify(__X__ ? uniNormalizeStyle(value) : vueNormalizeStyle(value))
}

// 不使用 @vue/shared 中的 stringifyStyle (#3456)
function stringify(styles: NormalizedStyle | string | undefined): string {
  let ret = ''
  if (!styles || isString(styles)) {
    return ret
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`
  }
  return ret
}
