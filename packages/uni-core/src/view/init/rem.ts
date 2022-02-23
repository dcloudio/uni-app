function checkValue(value: unknown, defaultValue: number) {
  const newValue = Number(value) as number
  return isNaN(newValue) ? defaultValue : newValue
}

function getWindowWidth() {
  const screenFix =
    /^Apple/.test(navigator.vendor) && typeof window.orientation === 'number'
  const landscape = screenFix && Math.abs(window.orientation as number) === 90
  var screenWidth = screenFix
    ? Math[landscape ? 'max' : 'min'](screen.width, screen.height)
    : screen.width
  var windowWidth =
    Math.min(
      window.innerWidth,
      document.documentElement.clientWidth,
      screenWidth
    ) || screenWidth
  return windowWidth
}

export function useRem() {
  const config = __uniConfig.globalStyle || {}
  // ignore: rpxCalcIncludeWidth
  const maxWidth = checkValue(config.rpxCalcMaxDeviceWidth, 960)
  const baseWidth = checkValue(config.rpxCalcBaseDeviceWidth, 375)
  // TODO 与 upx2px 合并抽离逻辑到 shared，区分 service、view
  function updateRem() {
    let width = getWindowWidth()
    width = width <= maxWidth ? width : baseWidth
    document.documentElement.style.fontSize = width / 23.4375 + 'px'
  }
  updateRem()
  document.addEventListener('DOMContentLoaded', updateRem)
  window.addEventListener('load', updateRem)
  window.addEventListener('resize', updateRem)
}
