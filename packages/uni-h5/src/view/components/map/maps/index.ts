import { MapType, getMapInfo, getIsAMap } from '../../../../helpers/location'
export * from './types'
import { QQMaps } from './qq/types'
import { GoogleMaps } from './google/types'

import { createCallout } from './Callout'
export { CalloutOptions } from './Callout'

export type Callout = ReturnType<typeof createCallout>

interface MapsWithCallout {
  Callout: Callout
}

interface GoogleMapsWithCallout extends GoogleMaps, MapsWithCallout {}

interface QQMapsWithCallout extends QQMaps, MapsWithCallout {}

interface AMapMapsWithCallout extends AMap.NameSpace, MapsWithCallout {}

export type Maps =
  | GoogleMapsWithCallout
  | QQMapsWithCallout
  | AMapMapsWithCallout

let maps: Maps
const callbacksMap: Partial<Record<MapType, Array<(maps: Maps) => void>>> = {}
const GOOGLE_MAP_CALLBACKNAME = '__map_callback__'
interface WindowExt extends Window {
  [key: string]: any
}

export function loadMaps(libraries: string[], callback: (maps: Maps) => void) {
  const mapInfo = getMapInfo()
  if (!mapInfo.key) {
    console.error('Map key not configured.')
    return
  }
  const callbacks = (callbacksMap[mapInfo.type] =
    callbacksMap[mapInfo.type] || [])
  if (maps) {
    callback(maps)
  } else if (
    (window as WindowExt)[mapInfo.type] &&
    (window as WindowExt)[mapInfo.type].maps
  ) {
    maps = getIsAMap()
      ? (window as WindowExt)[mapInfo.type]
      : (window as WindowExt)[mapInfo.type].maps
    maps.Callout = maps.Callout || createCallout(maps)
    callback(maps)
  } else if (callbacks.length) {
    callbacks.push(callback)
  } else {
    callbacks.push(callback)
    const globalExt = window as WindowExt
    const callbackName = GOOGLE_MAP_CALLBACKNAME + mapInfo.type
    globalExt[callbackName] = function () {
      delete globalExt[callbackName]
      maps = getIsAMap()
        ? (window as WindowExt)[mapInfo.type]
        : (window as WindowExt)[mapInfo.type].maps
      maps.Callout = createCallout(maps)
      callbacks.forEach((callback) => callback(maps))
      callbacks.length = 0
    }

    if (getIsAMap()) {
      handleAMapSecurityPolicy(mapInfo)
    }

    const script = document.createElement('script')
    let src = getScriptBaseUrl(mapInfo.type)

    if (mapInfo.type === MapType.QQ) {
      libraries.push('geometry')
    }
    if (libraries.length) {
      src += `libraries=${libraries.join('%2C')}&`
    }
    script.src = `${src}key=${mapInfo.key}&callback=${callbackName}`
    script.onerror = function () {
      console.error('Map load failed.')
    }
    document.body.appendChild(script)
  }
}

const getScriptBaseUrl = (mapType: string): string => {
  const urlMap: any = {
    qq: 'https://map.qq.com/api/js?v=2.exp&',
    google: 'https://maps.googleapis.com/maps/api/js?',
    AMap: 'https://webapi.amap.com/maps?v=2.0&',
    BMapGL: 'https://api.map.baidu.com/api?type=webgl&v=1.0&',
  }

  return urlMap[mapType]
}

function handleAMapSecurityPolicy(mapInfo: AnyObject) {
  ;(window as any)._AMapSecurityConfig = {
    securityJsCode: mapInfo.securityJsCode || '',
    serviceHost: mapInfo.serviceHost || '',
  }
}
