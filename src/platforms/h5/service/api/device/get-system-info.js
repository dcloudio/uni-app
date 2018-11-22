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
  var statusbarHeight = 0
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
    model = ua.split(')')[0].split(';')
    model = model[model.length - 1].split('Build')[0].replace(/^\s(.+)\s$/, '$1')
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
    statusbarHeight,
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
