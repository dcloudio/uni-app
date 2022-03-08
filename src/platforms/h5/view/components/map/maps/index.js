import {
  MapType,
  getMapInfo
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
    maps = window[mapInfo.type].maps
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
      maps = window[mapInfo.type].maps
      maps.Callout = createCallout(maps)
      callbacks.forEach((callback) => callback(maps))
      callbacks.length = 0
    }
    const script = document.createElement('script')
    let src =
      mapInfo.type === MapType.GOOGLE ? 'https://maps.googleapis.com/maps/api/js?' : 'https://map.qq.com/api/js?v=2.exp&'
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
