import safeAreaInsets from 'safe-area-insets'

export function getWindowOffset() {
  const style = document.documentElement.style
  const top = parseInt(style.getPropertyValue('--window-top'))
  const bottom = parseInt(style.getPropertyValue('--window-bottom'))
  const left = parseInt(style.getPropertyValue('--window-left'))
  const right = parseInt(style.getPropertyValue('--window-right'))
  return {
    top: top ? top + safeAreaInsets.top : 0,
    bottom: bottom ? bottom + safeAreaInsets.bottom : 0,
    left: left ? left + safeAreaInsets.left : 0,
    right: right ? right + safeAreaInsets.right : 0,
  }
}
