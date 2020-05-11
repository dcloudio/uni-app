import getWindowOffset from 'uni-platform/helpers/get-window-offset'
import safeAreaInsets from 'safe-area-insets'

const ua = navigator.userAgent
/**
 * 是否安卓设备
 */
const isAndroid = /android/i.test(ua)
/**
 * 是否iOS设备
 */
const isIOS = /iphone|ipad|ipod/i.test(ua)
/**
 * 获取系统信息-同步
 */
export function getSystemInfoSync () {
  var screen = window.screen
  var pixelRatio = window.devicePixelRatio
  // 横屏时 iOS 获取的屏幕宽高颠倒，进行纠正
  var landscape = Math.abs(window.orientation) === 90
  var screenWidth = Math[landscape ? 'max' : 'min'](screen.width, screen.height)
  var screenHeight = Math[landscape ? 'min' : 'max'](screen.height, screen.width)
  var windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth, screenWidth)
  var windowHeight = window.innerHeight
  var language = navigator.language
  var statusBarHeight = safeAreaInsets.top
  var osname
  var osversion
  var model

  if (isIOS) {
    osname = 'iOS'
    const osversionFind = ua.match(/OS\s([\w_]+)\slike/)
    if (osversionFind) {
      osversion = osversionFind[1].replace(/_/g, '.')
    }
    const modelFind = ua.match(/\(([a-zA-Z]+);/)
    if (modelFind) {
      model = modelFind[1]
    }
  } else if (isAndroid) {
    osname = 'Android'
    // eslint-disable-next-line no-useless-escape
    const osversionFind = ua.match(/Android[\s/]([\w\.]+)[;\s]/)
    if (osversionFind) {
      osversion = osversionFind[1]
    }
    const infoFind = ua.match(/\((.+?)\)/)
    const infos = infoFind ? infoFind[1].split(';') : ua.split(' ')
    // eslint-disable-next-line no-useless-escape
    const otherInfo = [/\bAndroid\b/i, /\bLinux\b/i, /\bU\b/i, /^\s?[a-z][a-z]$/i, /^\s?[a-z][a-z]-[a-z][a-z]$/i, /\bwv\b/i, /\/[\d\.,]+$/, /^\s?[\d\.,]+$/, /\bBrowser\b/i, /\bMobile\b/i]
    for (let i = 0; i < infos.length; i++) {
      const info = infos[i]
      if (info.indexOf('Build') > 0) {
        model = info.split('Build')[0].trim()
        break
      }
      let other
      for (let o = 0; o < otherInfo.length; o++) {
        if (otherInfo[o].test(info)) {
          other = true
          break
        }
      }
      if (!other) {
        model = info.trim()
        break
      }
    }
  } else {
    osname = 'Other'
    osversion = '0'
  }

  var system = `${osname} ${osversion}`
  var platform = osname.toLocaleLowerCase()
  var safeArea = {
    left: safeAreaInsets.left,
    right: windowWidth - safeAreaInsets.right,
    top: safeAreaInsets.top,
    bottom: windowHeight - safeAreaInsets.bottom,
    width: windowWidth - safeAreaInsets.left - safeAreaInsets.right,
    height: windowHeight - safeAreaInsets.top - safeAreaInsets.bottom
  }

  const {
    top: windowTop,
    bottom: windowBottom
  } = getWindowOffset()

  windowHeight -= windowTop
  windowHeight -= windowBottom

  return {
    windowTop,
    windowBottom,
    windowWidth,
    windowHeight,
    pixelRatio,
    screenWidth,
    screenHeight,
    language,
    statusBarHeight,
    system,
    platform,
    model,
    safeArea,
    safeAreaInsets: {
      top: safeAreaInsets.top,
      right: safeAreaInsets.right,
      bottom: safeAreaInsets.bottom,
      left: safeAreaInsets.left
    }
  }
}
/**
 * 获取系统信息-异步
 */
export function getSystemInfo () {
  return getSystemInfoSync()
}
