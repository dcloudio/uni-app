import { QQMaps } from './types'
import { createCallout } from './Callout'
export { CalloutOptions } from './Callout'

export type Callout = ReturnType<typeof createCallout>

export interface QQMapsExt extends QQMaps {
  Callout: Callout
}

let maps: QQMapsExt
const callbacks: Array<(maps: QQMaps) => void> = []
const QQ_MAP_CALLBACKNAME = '__qq_map_callback__'
interface WindowExt extends Window {
  [key: string]: any
}
export function loadMaps(callback: (maps: QQMaps) => void) {
  if (maps) {
    callback(maps)
  } else if (window.qq && window.qq.maps) {
    maps = window.qq.maps
    callback(maps)
  } else if (callbacks.length) {
    callbacks.push(callback)
  } else {
    callbacks.push(callback)
    const key = __uniConfig.qqMapKey
    const globalExt = window as WindowExt
    globalExt[QQ_MAP_CALLBACKNAME] = function () {
      delete globalExt[QQ_MAP_CALLBACKNAME]
      maps = window.qq.maps
      maps.Callout = createCallout(maps)
      callbacks.forEach((callback) => callback(maps))
      callbacks.length = 0
    }
    const script = document.createElement('script')
    script.src = `https://map.qq.com/api/js?v=2.exp&key=${key}&callback=${QQ_MAP_CALLBACKNAME}&libraries=geometry`
    document.body.appendChild(script)
  }
}
