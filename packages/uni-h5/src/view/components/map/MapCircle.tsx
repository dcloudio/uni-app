import { inject, onUnmounted, watch } from 'vue'
import { defineSystemComponent, useCustomEvent } from '@dcloudio/uni-components'
import { Maps, Map, Circle } from './maps'

const props = {
  latitude: { type: [Number, String], require: true },
  longitude: { type: [Number, String], require: true },
  color: { type: String, default: '' },
  fillColor: { type: String, default: '' },
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
        const center = new maps.LatLng(option.latitude, option.longitude)
        function getColor(color: string) {
          const c = color && color.match(/#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?/)
          if ('Color' in maps) {
            if (c && c.length) {
              return maps.Color.fromHex(
                c[0],
                Number('0x' + c[1] || 255) / 255
              ).toRGBA()
            } else {
              return undefined
            }
          }
          return color
        }
        circle = new maps.Circle({
          map: map as any,
          center: center as any,
          clickable: false,
          radius: option.radius,
          strokeWeight: Number(option.strokeWidth) || 1,
          fillColor: getColor(option.fillColor) || getColor('#00000001'),
          strokeColor: getColor(option.color) || '#000000',
          strokeDashStyle: 'solid',
        })
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
