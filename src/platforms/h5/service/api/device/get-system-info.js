import getWindowOffset from 'uni-platform/helpers/get-window-offset'
import deviceId from 'uni-platform/helpers/uuid'
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
 * 是否是Windows设备
 */
const isWindows = ua.match(/Windows NT ([\d|\d.\d]*)/i)
/**
 * 是否是Mac设备
 */
const isMac = /Macintosh|Mac/i.test(ua)
/**
 * 是否是Linux设备
 */
const isLinux = /Linux|X11/i.test(ua)
/**
 * 是否是iPadOS
 */
const isIPadOS = isMac && navigator.maxTouchPoints > 0
/**
 * 获取系统信息-同步
 */
export function getSystemInfoSync () {
  var screen = window.screen
  var pixelRatio = window.devicePixelRatio
  // 横屏时 iOS 获取的屏幕宽高颠倒，进行纠正
  const screenFix = /^Apple/.test(navigator.vendor) && typeof window.orientation === 'number'
  const landscape = screenFix && Math.abs(window.orientation) === 90
  var screenWidth = screenFix ? Math[landscape ? 'max' : 'min'](screen.width, screen.height) : screen.width
  var screenHeight = screenFix ? Math[landscape ? 'min' : 'max'](screen.height, screen.width) : screen.height
  var windowWidth = Math.min(window.innerWidth, document.documentElement.clientWidth, screenWidth) || screenWidth
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
  } else if (isIPadOS) {
    model = 'iPad'
    osname = 'iOS'
    osversion = typeof window.BigInt === 'function' ? '14.0' : '13.0'
  } else if (isWindows || isMac || isLinux) {
    model = 'PC'
    const osversionFind = ua.match(/\((.+?)\)/)[1]

    if (isWindows) {
      osname = 'Windows'
      osversion = ''
      switch (isWindows[1]) {
        case '5.1':
          osversion = 'XP'
          break
        case '6.0':
          osversion = 'Vista'
          break
        case '6.1':
          osversion = '7'
          break
        case '6.2':
          osversion = '8'
          break
        case '6.3':
          osversion = '8.1'
          break
        case '10.0':
          osversion = '10'
          break
      }

      const framework = osversionFind.match(/[Win|WOW]([\d]+)/)
      if (framework) {
        osversion += ` x${framework[1]}`
      }
    } else if (isMac) {
      osname = 'Mac'
      osversion = osversionFind.match(/Mac OS X (.+)/) || ''

      if (osversion) {
        osversion = osversion[1].replace(/_/g, '.')
        // '10_15_7' or '10.16; rv:86.0'
        if (osversion.indexOf(';') !== -1) {
          osversion = osversion.split(';')[0]
        }
      }
    } else if (isLinux) {
      osname = 'Linux'
      osversion = osversionFind.match(/Linux (.*)/) || ''

      if (osversion) {
        osversion = osversion[1]
        // 'x86_64' or 'x86_64; rv:79.0'
        if (osversion.indexOf(';') !== -1) {
          osversion = osversion.split(';')[0]
        }
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
    },
    deviceId: deviceId()
  }
}
/**
 * 获取系统信息-异步
 */
export function getSystemInfo () {
  return getSystemInfoSync()
}
