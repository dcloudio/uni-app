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

export type Maps = GoogleMapsWithCallout | QQMapsWithCallout

export enum MapType {
  QQ = 'qq',
  GOOGLE = 'google',
}

let maps: Maps
const callbacksMap: Partial<Record<MapType, Array<(maps: Maps) => void>>> = {}
const GOOGLE_MAP_CALLBACKNAME = '__map_callback__'
interface WindowExt extends Window {
  [key: string]: any
}

export function loadMaps(callback: (maps: Maps) => void) {
  let type: MapType
  let key: string
  if (__uniConfig.qqMapKey) {
    type = MapType.QQ
    key = __uniConfig.qqMapKey
  } else if (__uniConfig.googleMapKey) {
    type = MapType.GOOGLE
    key = __uniConfig.googleMapKey
  } else {
    console.error('Map key not configured.')
    return
  }
  const callbacks = (callbacksMap[type] = callbacksMap[type] || [])
  if (maps) {
    callback(maps)
  } else if ((window as WindowExt)[type] && (window as WindowExt)[type].maps) {
    maps = (window as WindowExt)[type].maps
    maps.Callout = maps.Callout || createCallout(maps)
    callback(maps)
  } else if (callbacks.length) {
    callbacks.push(callback)
  } else {
    callbacks.push(callback)
    const globalExt = window as WindowExt
    const callbackName = GOOGLE_MAP_CALLBACKNAME + type
    globalExt[callbackName] = function () {
      delete globalExt[callbackName]
      maps = (window as WindowExt)[type].maps
      maps.Callout = createCallout(maps)
      callbacks.forEach((callback) => callback(maps))
      callbacks.length = 0
    }
    const script = document.createElement('script')
    const src =
      type === MapType.GOOGLE
        ? 'https://maps.googleapis.com/maps/api/js?'
        : 'https://map.qq.com/api/js?v=2.exp&libraries=geometry&'
    script.src = `${src}key=${key}&callback=${callbackName}`
    script.onerror = function () {
      console.error('Map load failed.')
    }
    document.body.appendChild(script)
  }
}
