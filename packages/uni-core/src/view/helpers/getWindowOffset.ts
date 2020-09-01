import safeAreaInsets from 'safe-area-insets'

export function getWindowOffset() {
  if (uni.canIUse('css.var')) {
    const style = document.documentElement.style
    const top = parseInt(style.getPropertyValue('--window-top'))
    const bottom = parseInt(style.getPropertyValue('--window-bottom'))
    const left = parseInt(style.getPropertyValue('--window-left'))
    const right = parseInt(style.getPropertyValue('--window-right'))
    return {
      top: top ? top + safeAreaInsets.top : 0,
      bottom: bottom ? bottom + safeAreaInsets.bottom : 0,
      left: left ? left + safeAreaInsets.left : 0,
      right: right ? right + safeAreaInsets.right : 0
    }
  }
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
}
