import { withModifiers } from 'vue'
import safeAreaInsets from 'safe-area-insets'

export const onEventPrevent = /*#__PURE__*/ withModifiers(() => {}, ['prevent'])
export const onEventStop = /*#__PURE__*/ withModifiers(
  (_event: Event) => {},
  ['stop']
)

function getWindowOffsetCssVar(style: CSSStyleDeclaration, name: string) {
  return parseInt((style.getPropertyValue(name).match(/\d+/) || ['0'])[0])
}

export function getWindowTop() {
  const style = document.documentElement.style
  const top = getWindowOffsetCssVar(style, '--window-top')
  return top ? top + safeAreaInsets.top : 0
}

export function getWindowOffset() {
  const style = document.documentElement.style
  const top = getWindowTop()
  const bottom = getWindowOffsetCssVar(style, '--window-bottom')
  const left = getWindowOffsetCssVar(style, '--window-left')
  const right = getWindowOffsetCssVar(style, '--window-right')
  const topWindowHeight = getWindowOffsetCssVar(style, '--top-window-height')
  return {
    top,
    bottom: bottom ? bottom + safeAreaInsets.bottom : 0,
    left: left ? left + safeAreaInsets.left : 0,
    right: right ? right + safeAreaInsets.right : 0,
    topWindowHeight: topWindowHeight || 0,
  }
}

interface PageCssVars {
  '--window-top'?: string
  '--window-bottom'?: string
  '--window-left'?: string
  '--window-right'?: string
  '--window-margin'?: string
  '--top-window-height'?: string
}

export function updateCssVar(cssVars: Record<string, any>) {
  const style = document.documentElement.style
  Object.keys(cssVars).forEach((name) => {
    style.setProperty(name, cssVars[name])
  })
}

export function updatePageCssVar(cssVars: PageCssVars) {
  return updateCssVar(cssVars)
}

interface AppCssVar {
  '--status-bar-height'?: string
  '--tab-bar-height'?: string
}

export function updateAppCssVar(cssVars: AppCssVar) {
  return updateCssVar(cssVars)
}

const sheetsMap = new Map()

export function updateStyle(id: string, content: string) {
  let style = sheetsMap.get(id)
  if (style && !(style instanceof HTMLStyleElement)) {
    removeStyle(id)
    style = undefined
  }
  if (!style) {
    style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.innerHTML = content
    document.head.appendChild(style)
  } else {
    style.innerHTML = content
  }
  sheetsMap.set(id, style)
}

export function removeStyle(id: string) {
  let style = sheetsMap.get(id)
  if (style) {
    if (style instanceof CSSStyleSheet) {
      // @ts-ignore
      const index = document.adoptedStyleSheets.indexOf(style)
      // @ts-ignore
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
        (s: CSSStyleSheet) => s !== style
      )
    } else {
      document.head.removeChild(style)
    }
    sheetsMap.delete(id)
  }
}
