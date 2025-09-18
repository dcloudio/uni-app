function checkValue(value: unknown, defaultValue: number) {
  const newValue = Number(value) as number
  return isNaN(newValue) ? defaultValue : newValue
}

const isApple = () => /^Apple/.test(navigator.vendor)

function getWindowWidth() {
  const screenFix = isApple() && typeof window.orientation === 'number'
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
  if (isApple()) {
    // fix: ios 在旋转屏幕时获取 window.orientation 不同步
    window.addEventListener('orientationchange', () => {
      updateRem()
      // fix: ios 在从竖屏页面跳转到横屏页面时 font-size 设置失败
      setTimeout(updateRem, 50)
    })
  }
}
