const screen = window.screen
const documentElement = document.documentElement

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

export function separateAttrs(attrs: Data) {
  const ignore = ['style', 'class']
  let $listeners: Data = {} // 事件
  let $ignoreAttrs: Data = {} // ignore
  let $otherAttrs: Data = {} // 事件 和 ignore
  let $attrs: Data = {} // 除去 ignore 和 事件
  for (const key in attrs) {
    if (/^on[A-Z]+/.test(key)) {
      $listeners[key] = attrs[key]
      $otherAttrs[key] = attrs[key]
    } else if (ignore.includes(key)) {
      $ignoreAttrs[key] = attrs[key]
      $otherAttrs[key] = attrs[key]
    } else {
      $attrs[key] = attrs[key]
    }
  }
  return { $attrs, $otherAttrs, $listeners, $ignoreAttrs }
}
