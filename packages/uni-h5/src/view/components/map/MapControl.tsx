import { inject, onUnmounted, watch, PropType } from 'vue'
import { getRealPath } from '@dcloudio/uni-platform'
import { defineSystemComponent, useCustomEvent } from '@dcloudio/uni-components'
import { Maps, Map } from './maps'

interface Position {
  left: number | string
  top: number | string
  width: number | string
  height: number | string
}

const props = {
  id: { type: [Number, String], default: '' },
  position: { type: Object as PropType<Position>, require: true },
  iconPath: { type: String, require: true },
  clickable: { type: [Boolean, String], default: '' },
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
  name: 'MapControl',
  props,
  setup(props) {
    const onMapReady: OnMapReady = inject('onMapReady') as OnMapReady
    let control: HTMLDivElement
    function removeControl() {
      if (control) {
        control.remove()
      }
    }
    onMapReady((map, maps, trigger) => {
      function updateControl(option: Props) {
        removeControl()
        addControl(option)
      }
      function addControl(option: Props) {
        const position = option.position || {}
        control = document.createElement('div')
        const img = new Image()
        control.appendChild(img)
        const style = control.style
        style.position = 'absolute'
        style.width = '0'
        style.height = '0'
        img.onload = () => {
          if (option.position.width) {
            img.width = option.position.width
          }
          if (option.position.height) {
            img.height = option.position.height
          }
          const style = img.style
          style.position = 'absolute'
          style.left = (position.left || 0) + 'px'
          style.top = (position.top || 0) + 'px'
          style.maxWidth = 'initial'
        }
        img.src = getRealPath(option.iconPath)
        img.onclick = function ($event) {
          if (option.clickable) {
            trigger('controltap', $event, {
              controlId: option.id,
            })
          }
        }
        map.controls[maps.ControlPosition.TOP_LEFT].push(control)
      }
      addControl(props as Props)
      watch(props, updateControl)
    })
    onUnmounted(removeControl)
    return () => {
      return null
    }
  },
})
