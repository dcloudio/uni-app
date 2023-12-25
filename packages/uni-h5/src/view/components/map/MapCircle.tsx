import { inject, onUnmounted, watch } from 'vue'
import { defineSystemComponent, useCustomEvent } from '@dcloudio/uni-components'
import { Maps, Map, Circle, CircleOptions } from './maps'
import { hexToRgba } from '../../../helpers/hexToRgba'
import { getIsAMap, getIsBMap } from '../../../helpers/location'
import { QQMaps } from './maps/qq/types'
import { GoogleMaps } from './maps/google/types'

const props = {
  latitude: { type: [Number, String], require: true },
  longitude: { type: [Number, String], require: true },
  color: { type: String, default: '#000000' },
  fillColor: { type: String, default: '#00000000' },
  radius: { type: [Number, String], require: true },
  strokeWidth: { type: [Number, String], default: '' },
  level: { type: String, default: '' },
}

export type Props = Partial<Record<keyof typeof props, any>>
type CustomEventTrigger = ReturnType<typeof useCustomEvent>
type OnMapReadyCallback = (
  map: Map,
  maps: Maps,
  trigger: CustomEventTrigger
) => void
type OnMapReady = (callback: OnMapReadyCallback) => void

export default /*#__PURE__*/ defineSystemComponent({
  name: 'MapCircle',
  props,
  setup(props) {
    const onMapReady: OnMapReady = inject('onMapReady') as OnMapReady
    let circle: Circle
    function removeCircle() {
      if (circle) {
        circle.setMap(null)
      }
    }
    onMapReady((map, maps) => {
      function updateCircle(option: Props) {
        removeCircle()
        addCircle(option)
      }
      function addCircle(option: Props) {
        const center =
          getIsAMap() || getIsBMap()
            ? [option.longitude, option.latitude]
            : new (maps as QQMaps | GoogleMaps).LatLng(
                option.latitude,
                option.longitude
              )
        const circleOptions: CircleOptions = {
          map: map as any,
          center: center as any,
          clickable: false,
          radius: option.radius,
          strokeWeight: Number(option.strokeWidth) || 1,
          strokeDashStyle: 'solid',
        }
        if (getIsBMap()) {
          circleOptions.strokeColor = option.color
          circleOptions.fillColor = option.fillColor || '#000'
          circleOptions.fillOpacity = 1
        } else {
          const { r: fr, g: fg, b: fb, a: fa } = hexToRgba(option.fillColor)
          const { r: sr, g: sg, b: sb, a: sa } = hexToRgba(option.color)
          if ('Color' in maps) {
            circleOptions.fillColor = new maps.Color(fr, fg, fb, fa) as any
            circleOptions.strokeColor = new maps.Color(sr, sg, sb, sa) as any
          } else {
            circleOptions.fillColor = `rgb(${fr}, ${fg}, ${fb})`
            circleOptions.fillOpacity = fa
            circleOptions.strokeColor = `rgb(${sr}, ${sg}, ${sb})`
            circleOptions.strokeOpacity = sa
          }
        }
        if (getIsBMap()) {
          // @ts-ignore
          let pt = new maps.Point(
            // @ts-ignore
            circleOptions.center[0],
            // @ts-ignore
            circleOptions.center[1]
          )
          // @ts-ignore
          circle = new maps.Circle(pt, circleOptions.radius, circleOptions)
          // @ts-ignore
          map.addOverlay(circle)
        } else {
          circle = new maps.Circle(circleOptions)
          if (getIsAMap()) {
            ;(map as AMap.Map).add(circle as any)
          }
        }
      }
      addCircle(props as Props)
      watch(props, updateCircle)
    })
    onUnmounted(removeCircle)
    return () => {
      return null
    }
  },
})
