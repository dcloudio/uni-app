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
