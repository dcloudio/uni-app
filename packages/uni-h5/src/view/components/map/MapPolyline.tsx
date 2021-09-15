import { inject, PropType, onUnmounted, watch } from 'vue'
import { defineSystemComponent, useCustomEvent } from '@dcloudio/uni-components'
import { Maps, Map, LatLng, Polyline } from './maps'

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
        const path: LatLng[] = []
        option.points.forEach((point: Point) => {
          path.push(new maps.LatLng(point.latitude, point.longitude))
        })
        const strokeWeight = Number(option.width) || 1
        polyline = new maps.Polyline({
          map: map as any,
          clickable: false,
          path: path as any,
          strokeWeight,
          strokeColor: option.color || undefined,
          strokeDashStyle: option.dottedLine ? 'dash' : 'solid',
        })
        const borderWidth = Number(option.borderWidth) || 0
        if (borderWidth) {
          polylineBorder = new maps.Polyline({
            map: map as any,
            clickable: false,
            path: path as any,
            strokeWeight: strokeWeight + borderWidth * 2,
            strokeColor: option.borderColor || undefined,
            strokeDashStyle: option.dottedLine ? 'dash' : 'solid',
          })
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
