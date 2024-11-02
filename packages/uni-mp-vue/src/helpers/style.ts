import { type NormalizedStyle, hyphenate, isString } from '@vue/shared'
import { normalizeStyle } from '@vue/shared'
import { getCurrentInstance } from 'vue'
import type { UniCSSStyleDeclaration } from '../dom/UniCSSStyleDeclaration'

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

export function withUniElementStyle(id: string, style: string = '') {
  // 从缓存中获取元素，作用域插槽？
  const el = getCurrentInstance()?.$uniElements.get(id)
  if (!el) {
    return style
  }
  const cssText = (el.style as unknown as UniCSSStyleDeclaration).cssText
  return style ? `${style};${cssText}` : cssText
}
