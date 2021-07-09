import { rpx2px } from '@dcloudio/uni-core'
import { camelize, capitalize, hyphenate, isArray, isString } from '@vue/shared'

export function patchStyle(el: Element, value: string | Record<string, any>) {
  const style = (el as HTMLElement).style
  if (isString(value)) {
    if (value === '') {
      el.removeAttribute('style')
    } else {
      // TODO display
      style.cssText = rpx2px(value, true)
    }
  } else {
    for (const key in value) {
      setStyle(style, key, value[key])
    }
  }
}

const importantRE = /\s*!important$/

function setStyle(
  style: CSSStyleDeclaration,
  name: string,
  val: string | string[]
) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v))
  } else {
    val = rpx2px(val, true)
    if (name.startsWith('--')) {
      // custom property definition
      style.setProperty(name, val)
    } else {
      const prefixed = autoPrefix(style, name)
      if (importantRE.test(val)) {
        // !important
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ''),
          'important'
        )
      } else {
        style[prefixed as any] = val
      }
    }
  }
}

// 移动端，仅处理 Webkit
const prefixes = ['Webkit' /*, 'Moz', 'ms'*/]
const prefixCache: Record<string, string> = {}

function autoPrefix(style: CSSStyleDeclaration, rawName: string): string {
  const cached = prefixCache[rawName]
  if (cached) {
    return cached
  }
  let name = camelize(rawName)
  if (name !== 'filter' && name in style) {
    return (prefixCache[rawName] = name)
  }
  name = capitalize(name)
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name
    if (prefixed in style) {
      return (prefixCache[rawName] = prefixed)
    }
  }
  return rawName
}
