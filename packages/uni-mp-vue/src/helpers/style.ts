import { type NormalizedStyle, hyphenate, isString } from '@vue/shared'
import { normalizeStyle } from '@vue/shared'

export function stringifyStyle(value: unknown) {
  if (isString(value)) {
    return value
  }
  return stringify(normalizeStyle(value))
}

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
