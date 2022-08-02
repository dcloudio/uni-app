import {
  MapType,
  getMapInfo,
  IS_AMAP
} from '../../../../helpers/location'
import { createCallout } from './callout'

let maps
const callbacksMap = {}
const GOOGLE_MAP_CALLBACKNAME = '__map_callback__'

export function loadMaps (libraries, callback) {
  const mapInfo = getMapInfo()
  if (!mapInfo.key) {
    console.error('Map key not configured.')
    return
  }
  const callbacks = (callbacksMap[mapInfo.type] = callbacksMap[mapInfo.type] || [])
  if (maps) {
    callback(maps)
  } else if (
    window[mapInfo.type] &&
    window[mapInfo.type].maps
  ) {
    maps = IS_AMAP ? window[mapInfo.type] : window[mapInfo.type].maps
    maps.Callout = maps.Callout || createCallout(maps)
    callback(maps)
  } else if (callbacks.length) {
    callbacks.push(callback)
  } else {
    callbacks.push(callback)
    const globalExt = window
    const callbackName = GOOGLE_MAP_CALLBACKNAME + mapInfo.type
    globalExt[callbackName] = function () {
      delete globalExt[callbackName]
      maps = IS_AMAP ? window[mapInfo.type] : window[mapInfo.type].maps
      maps.Callout = createCallout(maps)
      callbacks.forEach((callback) => callback(maps))
      callbacks.length = 0
    }
    const script = document.createElement('script')
    let src = getScriptBaseUrl(mapInfo.type)

    if (mapInfo.type === MapType.QQ) {
      libraries.push('geometry')
    }
    if (libraries.length) {
      src += `libraries=${libraries.join('%2C')}&`
    }

    if (IS_AMAP) {
      handleAMapSecurityPolicy(mapInfo)
    }
    script.src = `${src}key=${mapInfo.key}&callback=${callbackName}`
    script.onerror = function () {
      console.error('Map load failed.')
    }
    document.body.appendChild(script)
  }
}

function getScriptBaseUrl (mapType) {
  const urlMap = {
    qq: 'https://map.qq.com/api/js?v=2.exp&',
    google: 'https://maps.googleapis.com/maps/api/js?',
    AMap: 'https://webapi.amap.com/maps?v=2.0&'
  }

  return urlMap[mapType]
}

function handleAMapSecurityPolicy (mapInfo) {
  window._AMapSecurityConfig = {
    securityJsCode: mapInfo.securityJsCode || '',
    serviceHost: mapInfo.serviceHost || ''
  }
}
