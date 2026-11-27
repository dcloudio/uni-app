import {
  INPUT_PLACEHOLDER_STYLE_ATTRIBUTE,
  type InputPlaceholderStyle,
  stringifyInputStyle,
} from '@dcloudio/uni-shared'

const usage = new WeakMap<HTMLStyleElement, number>()

export function registerInputStyle(
  document: Document,
  style: InputPlaceholderStyle
) {
  const container = document.head || document.documentElement
  // SSR 和其他使用相同样式的 Input 共用已存在的规则。
  const existing = container.querySelector<HTMLStyleElement>(
    `style[${INPUT_PLACEHOLDER_STYLE_ATTRIBUTE}="${style.key}"]`
  )
  const nonce = document.querySelector<HTMLMetaElement>(
    'meta[property=csp-nonce]'
  )?.nonce
  let element = existing
  if (!element || (nonce && !element.nonce)) {
    element = document.createElement('style')
    element.setAttribute(INPUT_PLACEHOLDER_STYLE_ATTRIBUTE, style.key)
    if (nonce) element.nonce = nonce
    element.textContent = stringifyInputStyle(style)
    if (existing) existing.replaceWith(element)
    else container.appendChild(element)
  }
  const sheet = element
  usage.set(sheet, (usage.get(sheet) || 0) + 1)
  return () => {
    const count = usage.get(sheet)!
    if (count > 1) {
      usage.set(sheet, count - 1)
    } else {
      usage.delete(sheet)
      sheet.remove()
    }
  }
}
