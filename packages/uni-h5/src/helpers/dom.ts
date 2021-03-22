export function appendCss(css: string, cssId: string, replace = false) {
  let style = document.getElementById(cssId) as HTMLStyleElement | null
  if (style && replace) {
    style.parentNode!.removeChild(style)
    style = null
  }
  if (!style) {
    style = document.createElement('style')
    style.type = 'text/css'
    cssId && (style.id = cssId)
    document.getElementsByTagName('head')[0].appendChild(style)
  }
  style.appendChild(document.createTextNode(css))
}

const screen = window.screen
const documentElement = document.documentElement

let styleObj: CSSStyleDeclaration
export function updateCssVar(name: string, value: string) {
  if (!styleObj) {
    styleObj = documentElement.style
  }
  styleObj.setProperty(name, value)
}

export function checkMinWidth(minWidth: number) {
  const sizes = [
    window.outerWidth,
    window.outerHeight,
    screen.width,
    screen.height,
    documentElement.clientWidth,
    documentElement.clientHeight,
  ]
  return Math.max.apply(null, sizes) > minWidth
}
