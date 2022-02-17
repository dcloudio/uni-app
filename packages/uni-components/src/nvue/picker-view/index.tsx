import {
  defineComponent,
  computed,
  watch,
  ref,
  Ref,
  reactive,
  VNode,
  provide,
  ExtractPropTypes,
} from 'vue'
import { extend } from '@vue/shared'
import {
  pickerViewProps,
  GetPickerViewColumn,
} from '../../components/pickerView'
import { flatVNode } from '../../helpers/flatVNode'
import { useCustomEvent, EmitEvent } from '../../helpers/useNVueEvent'

export type { Props, GetPickerViewColumn }
const nvuePickerViewProps = extend({}, pickerViewProps, {
  height: {
    type: [Number, String],
    default: 0,
  },
})
type Props = ExtractPropTypes<typeof nvuePickerViewProps>
export default defineComponent({
  name: 'PickerView',
  props: nvuePickerViewProps,
  emits: ['change', 'update:value'],
  setup(props, { slots, emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const state = useState(props)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    let columnVNodes: VNode[] = []
    const getItemIndex = (vnode: VNode) =>
      Array.prototype.indexOf.call(columnVNodes, vnode)
    const getPickerViewColumn: GetPickerViewColumn = (columnInstance) => {
      return computed({
        get() {
          const index = getItemIndex(columnInstance.vnode)
          return state.value[index] || 0
        },
        set(current: number) {
          if (!columnInstance.data._isMounted) return
          const index = getItemIndex(columnInstance.vnode)
          if (index < 0) {
            return
          }
          const oldCurrent = state.value[index]
          if (oldCurrent !== current) {
            state.value[index] = current
            // 避免外部直接对此值进行修改
            const value = state.value.map((val) => val)
            emit('update:value', value)
            trigger('change', {
              value,
            })
          }
        },
      })
    }

    provide('getPickerViewColumn', getPickerViewColumn)
    provide('pickerViewProps', props)

    return () => {
      const defaultSlots = slots.default && slots.default()
      columnVNodes = flatVNode(defaultSlots)
      return (
        <view
          ref={rootRef}
          class="uni-picker-view"
          {...{
            preventGesture: true,
          }}
        >
          <view class="uni-picker-view-wrapper">{defaultSlots}</view>
        </view>
      )
    }
  },
  styles: [
    {
      'uni-picker-view': {
        '': { position: 'relative' },
      },
      'uni-picker-view-wrapper': {
        '': {
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
        },
      },
    },
  ],
})

function useState(props: Props) {
  const value: number[] = reactive([...props.value])
  const state = reactive({
    value,
  })

  watch(
    () => props.value,
    (val) => {
      state.value.length = val.length
      val.forEach((val, index) => {
        if (val !== state.value[index]) {
          state.value.splice(index, 1, val)
        }
      })
    }
  )

  return state
}
