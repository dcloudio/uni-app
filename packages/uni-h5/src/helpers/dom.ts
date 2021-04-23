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
