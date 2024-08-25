import { type PropType, inject, onUnmounted, watch } from 'vue'
import {
  defineSystemComponent,
  type useCustomEvent,
} from '@dcloudio/uni-components'
import type { LatLng, Map, Maps, Polyline, PolylineOptions } from './maps'
import { hexToRgba } from '../../../helpers/hexToRgba'
import { getIsAMap, getIsBMap } from '../../../helpers/location'

interface Point {
  latitude: number
  longitude: number
}

const props = {
  points: { type: Array as PropType<Point[]>, require: true },
  color: { type: String, default: '#000000' },
  width: { type: [Number, String], default: '' },
  dottedLine: { type: [Boolean, String], default: false },
  arrowLine: { type: [Boolean, String], default: false },
  arrowIconPath: { type: String, default: '' },
  borderColor: { type: String, default: '#000000' },
  borderWidth: { type: [Number, String], default: '' },
  colorList: {
    type: Array,
    default() {
      return []
    },
  },
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
  name: 'MapPolyline',
  props,
  setup(props) {
    const onMapReady: OnMapReady = inject('onMapReady') as OnMapReady
    let polyline: Polyline
    let polylineBorder: Polyline
    function removePolyline() {
      if (polyline) {
        polyline.setMap(null)
      }
      if (polylineBorder) {
        polylineBorder.setMap(null)
      }
    }
    onMapReady((map, maps) => {
      function updatePolyline(option: Props) {
        removePolyline()
        addPolyline(option)
      }
      function addPolyline(option: Props) {
        const path: LatLng | any[] = []
        option.points.forEach((point: Point) => {
          let pointPosition: any
          if (getIsAMap()) {
            pointPosition = [point.longitude, point.latitude]
          } else if (getIsBMap()) {
            // @ts-expect-error
            pointPosition = new maps.Point(point.longitude, point.latitude)
          } else {
            pointPosition = new (maps as typeof google.maps).LatLng(
              point.latitude,
              point.longitude
            )
          }
          path.push(pointPosition)
        })
        const strokeWeight = Number(option.width) || 1
        const { r: sr, g: sg, b: sb, a: sa } = hexToRgba(option.color)
        const { r: br, g: bg, b: bb, a: ba } = hexToRgba(option.borderColor)
        const polylineOptions: PolylineOptions = {
          map: map as any,
          clickable: false,
          path: path as any,
          strokeWeight,
          strokeColor: option.color || undefined,
          strokeDashStyle: option.dottedLine ? 'dash' : 'solid',
        }
        const borderWidth = Number(option.borderWidth) || 0
        const polylineBorderOptions: PolylineOptions = {
          map: map as any,
          clickable: false,
          path: path as any,
          strokeWeight: strokeWeight + borderWidth * 2,
          strokeColor: option.borderColor || undefined,
          strokeDashStyle: option.dottedLine ? 'dash' : 'solid',
        }
        if ('Color' in maps) {
          polylineOptions.strokeColor = new maps.Color(sr, sg, sb, sa) as any
          polylineBorderOptions.strokeColor = new maps.Color(
            br,
            bg,
            bb,
            ba
          ) as any
        } else {
          polylineOptions.strokeColor = `rgb(${sr}, ${sg}, ${sb})`
          polylineOptions.strokeOpacity = sa
          polylineBorderOptions.strokeColor = `rgb(${br}, ${bg}, ${bb})`
          polylineBorderOptions.strokeOpacity = ba
        }
        if (borderWidth) {
          polylineBorder = new maps.Polyline(polylineBorderOptions)
        }
        if (getIsBMap()) {
          // @ts-expect-error
          polyline = new maps.Polyline(polylineOptions.path, polylineOptions)
          // @ts-expect-error
          map.addOverlay(polyline)
        } else {
          polyline = new maps.Polyline(polylineOptions)
        }
      }
      addPolyline(props as Props)
      watch(props, updatePolyline)
    })
    onUnmounted(removePolyline)
    return () => {
      return null
    }
  },
})
