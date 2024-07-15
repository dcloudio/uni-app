import { type PropType, computed } from 'vue'
import { getRealPath } from '@dcloudio/uni-platform'
import { defineSystemComponent } from '@dcloudio/uni-components'

interface Position {
  left: number | string
  top: number | string
  width: number | string
  height: number | string
}

const props = {
  id: { type: [Number, String], default: '' },
  position: { type: Object as PropType<Position>, required: true },
  iconPath: { type: String, required: true },
  clickable: { type: [Boolean, String], default: '' },
  trigger: { type: Function, required: true },
}

export type Props = Partial<Record<keyof typeof props, any>>

export default /*#__PURE__*/ defineSystemComponent({
  name: 'MapControl',
  props,
  setup(props) {
    const imgPath = computed(() => getRealPath(props.iconPath!))
    const positionStyle = computed(() => {
      let positionStyle = `top:${props.position!.top || 0}px;left:${
        props.position!.left || 0
      }px;`

      if (props.position!.width) {
        positionStyle += `width:${props.position!.width}px;`
      }
      if (props.position!.height) {
        positionStyle += `height:${props.position!.height}px;`
      }

      return positionStyle
    })
    const handleClick = ($event: Event) => {
      if (props.clickable) {
        props.trigger!('controltap', $event, {
          controlId: props.id,
        })
      }
    }

    return () => {
      return (
        <div class="uni-map-control">
          <img
            src={imgPath.value}
            style={positionStyle.value}
            class="uni-map-control-icon"
            onClick={handleClick}
          />
        </div>
      )
    }
  },
})
