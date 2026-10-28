import { isFunction } from '@vue/shared'

export function initWindowInfo() {
  const platform = my as any
  if (isFunction(platform.getWindowInfo)) {
    return
  }

  // 钉钉沿用支付宝编译平台，但不一定提供 getWindowInfo。
  platform.getWindowInfo = () => {
    const windowInfo = platform.getSystemInfoSync()
    const {
      pixelRatio,
      screenWidth,
      screenHeight,
      windowWidth,
      windowHeight,
      statusBarHeight,
      titleBarHeight,
    } = windowInfo
    const safeArea = windowInfo.safeArea || {}
    const left = safeArea.left ?? 0
    const right = safeArea.right ?? screenWidth
    const top = safeArea.top ?? statusBarHeight
    // 钉钉未提供底部安全区尺寸，不根据机型推测底部留白。
    const bottom = safeArea.bottom ?? screenHeight
    return {
      pixelRatio,
      screenWidth,
      screenHeight,
      windowWidth,
      windowHeight,
      statusBarHeight,
      // 默认原生导航下，通过状态栏和标题栏高度估算窗口上边缘。
      screenTop: windowInfo.screenTop ?? statusBarHeight + titleBarHeight,
      safeArea: {
        left,
        right,
        top,
        bottom,
        width: safeArea.width ?? Math.max(0, right - left),
        height: safeArea.height ?? Math.max(0, bottom - top),
      },
    }
  }
}
