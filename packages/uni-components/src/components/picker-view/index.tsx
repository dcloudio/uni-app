import {
  defineComponent,
  Ref,
  ref,
  watch,
  provide,
  ComputedRef,
  computed,
  reactive,
  VNode,
  SetupContext,
  PropType,
  ComponentInternalInstance,
} from 'vue'
import ResizeSensor from '../resize-sensor/index'
import { useCustomEvent } from '../../helpers/useEvent'

const props = {
  value: {
    type: Array as PropType<number[]>,
    default() {
      return []
    },
    validator: function (val: any) {
      return (
        Array.isArray(val) &&
        val.filter((val) => typeof val === 'number').length === val.length
      )
    },
  },
  indicatorStyle: {
    type: String,
    default: '',
  },
  indicatorClass: {
    type: String,
    default: '',
  },
  maskStyle: {
    type: String,
    default: '',
  },
  maskClass: {
    type: String,
    default: '',
  },
}

type Props = Record<keyof typeof props, any>
interface State {
  value: number[]
  height: number
}
function useState(props: Props): State {
  const value: number[] = reactive([...props.value])
  const state = {
    value,
    height: 34,
  }
  watch(
    () => props.value,
    (val: number[], oldVal: number[]) => {
      if (
        __PLATFORM__ !== 'app' ||
        val === oldVal ||
        val.length !== oldVal.length ||
        val.findIndex((item, index) => item !== oldVal[index]) >= 0
      ) {
        state.value.length = val.length
        val.forEach((val, index) => {
          if (val !== state.value[index]) {
            state.value.splice(index, 1, val)
          }
        })
      }
    }
  )
  return state
}

export type GetPickerViewColumn = (
  columnInstance: ComponentInternalInstance
) => ComputedRef<number>
export type GetPickerViewProps = () => Props
export type GetPickerViewState = () => State

export default /*#__PURE__*/ defineComponent({
  name: 'PickerView',
  props,
  emits: ['change', 'pickstart', 'pickend', 'update:value'],
  setup(props, { slots, emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent(rootRef, emit as SetupContext['emit'])
    const state = useState(props)
    let columnVNodes: VNode[] = []
    function getItemIndex(vnode: VNode): number {
      return columnVNodes.indexOf(vnode)
    }
    const getPickerViewColumn: GetPickerViewColumn = function (columnInstance) {
      const ref: ComputedRef<number> = computed({
        get() {
          const index = getItemIndex(columnInstance.vnode)
          return state.value[index] || 0
        },
        set(current: number) {
          const index = getItemIndex(columnInstance.vnode)
          const oldCurrent = state.value[index]
          if (oldCurrent !== current) {
            state.value.splice(index, 1, current)
            // 避免外部直接对此值进行修改
            const value = state.value.map((val) => val)
            emit('update:value', value)
            trigger('change', {} as Event, {
              value,
            })
          }
        },
      })
      return ref
    }
    provide('getPickerViewColumn', getPickerViewColumn)
    const getPickerViewProps: GetPickerViewProps = () => {
      return props
    }
    provide('getPickerViewProps', getPickerViewProps)

    const getPickerViewState: GetPickerViewState = () => {
      return state
    }
    provide('getPickerViewState', getPickerViewState)

    return () => {
      const defaultSlots = slots.default && slots.default()
      // TODO filter
      columnVNodes = columnVNodes = defaultSlots || []
      return (
        <uni-picker-view ref={rootRef}>
          <ResizeSensor
            initial
            onResize={({ height }: { height: number }) =>
              (state.height = height)
            }
          ></ResizeSensor>
          <div class="uni-picker-view-wrapper">{columnVNodes}</div>
        </uni-picker-view>
      )
    }
  },
})
