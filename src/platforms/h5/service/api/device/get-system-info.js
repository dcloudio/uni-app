import getWindowOffset from 'uni-platform/helpers/get-window-offset'

const ua = navigator.userAgent
/**
 * 是否安卓设备
 */
export const isAndroid = /android/i.test(ua)
/**
 * 是否iOS设备
 */
export const isIOS = /iphone|ipad|ipod/i.test(ua)
/**
 * 获取系统信息-同步
 */
export function getSystemInfoSync () {
  var windowWidth = window.innerWidth
  var windowHeight = window.innerHeight
  var screen = window.screen
  var pixelRatio = window.devicePixelRatio
  var screenWidth = screen.width
  var screenHeight = screen.height
  var language = navigator.language
  var statusBarHeight = 0
  var osname
  var osversion
  var model

  if (isIOS) {
    osname = 'iOS'
    let osversionFind = ua.match(/OS\s([\w_]+)\slike/)
    if (osversionFind) {
      osversion = osversionFind[1].replace(/_/g, '.')
    }
    let modelFind = ua.match(/\(([a-zA-Z]+);/)
    if (modelFind) {
      model = modelFind[1]
    }
  } else if (isAndroid) {
    osname = 'Android'
    let osversionFind = ua.match(/Android\s([\w.]+);/)
    if (osversionFind) {
      osversion = osversionFind[1]
    }
    let infos = ua.match(/\((.+?)\)/)[1].split(';')
    const otherInfo = [/^\s?Android/i, /^\s?Linux/i, /^\s?U/i, /^\s?[a-z][a-z]$/i, /^\s?[a-z][a-z]-[a-z][a-z]$/i, /^\s?wv/i]
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
    model
  }
}
/**
 * 获取系统信息-异步
 */
export function getSystemInfo () {
  return getSystemInfoSync()
}
