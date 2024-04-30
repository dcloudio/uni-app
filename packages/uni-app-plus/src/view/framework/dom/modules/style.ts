import { hyphenate, isArray, isString } from '@vue/shared'
import { normalizeStyleName, normalizeStyleValue } from '../../../utils'
import type { UniCustomElement } from '../components'

export function patchStyle(
  el: UniCustomElement,
  value: string | Record<string, any>
) {
  const style = (el as HTMLElement).style
  if (isString(value)) {
    if (value === '') {
      el.removeAttribute('style')
    } else {
      // TODO display
      style.cssText = normalizeStyleValue(value)
    }
  } else {
    for (const key in value) {
      setStyle(style, key, value[key])
    }
  }

  const { __wxsStyle } = el
  if (__wxsStyle) {
    for (const key in __wxsStyle) {
      setStyle(style, key, __wxsStyle[key] as string)
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
    val = normalizeStyleValue(val)
    if (name.startsWith('--')) {
      // custom property definition
      style.setProperty(name, val)
    } else {
      const prefixed = normalizeStyleName(style, name)
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
