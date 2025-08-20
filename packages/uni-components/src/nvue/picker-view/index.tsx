import {
  Comment,
  type ExtractPropTypes,
  type Ref,
  type VNode,
  computed,
  defineComponent,
  nextTick,
  provide,
  reactive,
  ref,
  watch,
} from 'vue'
import { extend } from '@vue/shared'
import {
  type GetPickerViewColumn,
  pickerViewProps,
} from '../../components/pickerView'
import { flatVNode } from '../../helpers/flatVNode'
import { type EmitEvent, useCustomEvent } from '../../helpers/useNVueEvent'

export type { Props, GetPickerViewColumn }
const nvuePickerViewProps = extend({}, pickerViewProps, {
  height: {
    type: [Number, String],
    default: 0,
  },
  maskTopStyle: {
    type: String,
    default: '',
  },
  maskBottomStyle: {
    type: String,
    default: '',
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
    const getItemIndex = (vnode: VNode) => {
      return Array.prototype.indexOf.call(
        columnVNodes.filter((vnode) => vnode.type !== Comment),
        vnode
      )
    }
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
      const style = props.height
        ? { height: `${parseFloat(props.height as string)}px` }
        : {}
      return (
        <view
          ref={rootRef}
          class="uni-picker-view"
          style={style}
          {...{
            preventGesture: true,
          }}
        >
          <view class="uni-picker-view-wrapper">{columnVNodes}</view>
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
      // fixed by lxh 解决 picker 组件滑动出范围不重定向回 end
      nextTick(() => {
        val.forEach((val, index) => {
          if (val !== state.value[index]) {
            state.value.splice(index, 1, val)
          }
        })
      })
    }
  )

  return state
}
