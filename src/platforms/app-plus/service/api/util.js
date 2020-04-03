export {
  isTabBarPage
} from '../bridge'

export function callApiSync (api, args, name, alias) {
  const ret = api(args)
  if (ret && ret.errMsg) {
    ret.errMsg = ret.errMsg.replace(name, alias)
  }
  return ret
}

export function getLastWebview () {
  try {
    const pages = getCurrentPages()
    if (pages.length) {
      return pages[pages.length - 1].$getAppWebview()
    }
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('getCurrentPages is not ready')
    }
  }
}

const getRealRoute = (e, t) => {
  if (t.indexOf('./') === 0) return getRealRoute(e, t.substr(2), !1)
  let n
  let i
  let o = t.split('/')
  for (n = 0, i = o.length; n < i && o[n] === '..'; n++);
  o.splice(0, n)
  t = o.join('/')
  let r = e.length > 0 ? e.split('/') : []
  r.splice(r.length - n - 1, n + 1)
  return r.concat(o).join('/')
}

// 处理 Android 平台解压与非解压模式下获取的路径不一致的情况
const _handleLocalPath = filePath => {
  let localUrl = plus.io.convertLocalFileSystemURL(filePath)
  return localUrl.replace(/^\/?apps\//, '/android_asset/apps/').replace(/\/$/, '')
}

export function getRealPath (filePath) {
  const SCHEME_RE = /^([a-z-]+:)?\/\//i
  const DATA_RE = /^data:.*,.*/

  // 无协议的情况补全 https
  if (filePath.indexOf('//') === 0) {
    filePath = 'https:' + filePath
  }

  // 网络资源或base64
  if (SCHEME_RE.test(filePath) || DATA_RE.test(filePath)) {
    return filePath
  }

  if (filePath.indexOf('_www') === 0 || filePath.indexOf('_doc') === 0 || filePath.indexOf('_documents') === 0 ||
    filePath.indexOf('_downloads') === 0) {
    return 'file://' + _handleLocalPath(filePath)
  }
  const wwwPath = 'file://' + _handleLocalPath('_www')
  // 绝对路径转换为本地文件系统路径
  if (filePath.indexOf('/') === 0) {
    return wwwPath + filePath
  }
  // 相对资源
  if (filePath.indexOf('../') === 0 || filePath.indexOf('./') === 0) {
    if (typeof __id__ === 'string') {
      return wwwPath + getRealRoute('/' + __id__, filePath)
    } else {
      const pages = getCurrentPages()
      if (pages.length) {
        return wwwPath + getRealRoute('/' + pages[pages.length - 1].route, filePath)
      }
    }
  }
  return filePath
}

export function getStatusBarStyle () {
  let style = plus.navigator.getStatusBarStyle()
  if (style === 'UIStatusBarStyleBlackTranslucent' || style === 'UIStatusBarStyleBlackOpaque' || style === 'null') {
    style = 'light'
  } else if (style === 'UIStatusBarStyleDefault') {
    style = 'dark'
  }
  return style
}

const PI = 3.1415926535897932384626
const a = 6378245.0
const ee = 0.00669342162296594323

export function wgs84togcj02 (lng, lat) {
  lat = +lat
  lng = +lng
  if (outOfChina(lng, lat)) {
    return [lng, lat]
  }
  let dlat = _transformlat(lng - 105.0, lat - 35.0)
  let dlng = _transformlng(lng - 105.0, lat - 35.0)
  const radlat = lat / 180.0 * PI
  let magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  const sqrtmagic = Math.sqrt(magic)
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
  dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
  const mglat = lat + dlat
  const mglng = lng + dlng
  return [mglng, mglat]
}

export function gcj02towgs84 (lng, lat) {
  lat = +lat
  lng = +lng
  if (outOfChina(lng, lat)) {
    return [lng, lat]
  }
  let dlat = _transformlat(lng - 105.0, lat - 35.0)
  let dlng = _transformlng(lng - 105.0, lat - 35.0)
  const radlat = lat / 180.0 * PI
  let magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  const sqrtmagic = Math.sqrt(magic)
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
  dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
  const mglat = lat + dlat
  const mglng = lng + dlng
  return [lng * 2 - mglng, lat * 2 - mglat]
}

const _transformlat = function (lng, lat) {
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0
  return ret
}
const _transformlng = function (lng, lat) {
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0
  return ret
}

const outOfChina = function (lng, lat) {
  return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false)
}

export function getStatusbarHeight () {
  // 横屏时 iOS 获取的状态栏高度错误，进行纠正
  return plus.navigator.isImmersedStatusbar() ? Math.round(plus.os.name === 'iOS' ? plus.navigator.getSafeAreaInsets().top : plus.navigator.getStatusbarHeight()) : 0
}

export function getScreenInfo () {
  const { resolutionWidth, resolutionHeight } = plus.screen.getCurrentSize()
  return {
    screenWidth: Math.round(resolutionWidth),
    screenHeight: Math.round(resolutionHeight)
  }
}
