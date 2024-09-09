export function checkMinWidth(minWidth: number) {
  if (__NODE_JS__) {
    return false
  }
  const screen = window.screen
  const documentElement = document.documentElement
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

export function getStateId() {
  if (__NODE_JS__) {
    return 1
  }
  return (history.state && history.state.__id__) || 1
}
