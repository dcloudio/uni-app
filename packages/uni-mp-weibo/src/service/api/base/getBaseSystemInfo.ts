export const ua = navigator.userAgent

export const isAndroid = /*#__PURE__*/ /android/i.test(ua)

export const isIOS = /*#__PURE__*/ /iphone|ipad|ipod/i.test(ua)

export const isWindows = /*#__PURE__*/ ua.match(/Windows NT ([\d|\d.\d]*)/i)

export const isMac = /*#__PURE__*/ /Macintosh|Mac/i.test(ua)

export const isLinux = /*#__PURE__*/ /Linux|X11/i.test(ua)

export const isIPadOS = isMac && navigator.maxTouchPoints > 0

export function getScreenFix() {
  return (
    /^Apple/.test(navigator.vendor) && typeof window.orientation === 'number'
  )
}

export function isLandscape(screenFix: boolean) {
  return screenFix && Math.abs(window.orientation as number) === 90
}

export function getScreenWidth(screenFix: boolean, landscape: boolean) {
  return screenFix
    ? Math[landscape ? 'max' : 'min'](screen.width, screen.height)
    : screen.width
}

export function getScreenHeight(screenFix: boolean, landscape: boolean) {
  return screenFix
    ? Math[landscape ? 'min' : 'max'](screen.height, screen.width)
    : screen.height
}

export function getWindowWidth(screenWidth: number) {
  return (
    Math.min(
      window.innerWidth,
      document.documentElement.clientWidth,
      screenWidth
    ) || screenWidth
  )
}

/**
 * 简易版systemInfo，主要为upx2px,i18n服务
 * @returns
 */
export function getBaseSystemInfo() {
  const screenFix = getScreenFix()
  const windowWidth = getWindowWidth(
    getScreenWidth(screenFix, isLandscape(screenFix))
  )
  return {
    platform: isIOS ? 'ios' : 'other',
    pixelRatio: window.devicePixelRatio,
    windowWidth,
  }
}
