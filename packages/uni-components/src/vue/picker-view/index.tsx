import {
  Comment,
  type ComponentPublicInstance,
  type Ref,
  type SetupContext,
  type VNode,
  type WritableComputedRef,
  computed,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
} from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { flatVNode } from '../../helpers/flatVNode'
import { useRebuild } from '../../helpers/useRebuild'
import ResizeSensor from '../resize-sensor/index'
import { useCustomEvent } from '../../helpers/useEvent'
import { UniElement } from '../../helpers/UniElement'
import { pickerViewProps } from '../../components/pickerView'
import type { GetPickerViewColumn, Props } from '../../components/pickerView'
export { Props, GetPickerViewColumn }
export interface State {
  value: number[]
  height: number
}
function useState(props: Props): State {
  const value: number[] = reactive([...props.value])
  const state = reactive({
    value,
    height: 34,
  })
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

export class UniPickerViewElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'PickerView',
  props: pickerViewProps,
  emits: ['change', 'pickstart', 'pickend', 'update:value'],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-picker-view',
    class: UniPickerViewElement,
  },
  //#endif
  setup(props, { slots, emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const wrapperRef: Ref<HTMLElement | null> = ref(null)
    const trigger = useCustomEvent(rootRef, emit as SetupContext['emit'])
    const state = useState(props)
    const resizeSensorRef: Ref<ComponentPublicInstance | null> = ref(null)
    const onMountedCallback = () => {
      const resizeSensor = resizeSensorRef.value as ComponentPublicInstance
      resizeSensor && (state.height = resizeSensor.$el.offsetHeight)
    }
    if (__PLATFORM__ !== 'app') {
      onMounted(onMountedCallback)
    }
    let ColumnsPreRef: Ref<VNode[]> = ref([])
    // app HTMLCollection, H5 VNode[]
    let columnsRef: Ref<VNode[] | HTMLCollection> = ref([])
    function getItemIndex(vnode: VNode): number {
      let columnVNodes = columnsRef.value
      if (__PLATFORM__ === 'app' && columnVNodes instanceof HTMLCollection) {
        return Array.prototype.indexOf.call(columnVNodes, vnode.el)
      } else {
        columnVNodes = (columnVNodes as VNode[]).filter(
          (vnode) => vnode.type !== Comment
        )
      }
      let index: number = (columnVNodes as VNode[]).indexOf(vnode)
      return index !== -1 ? index : ColumnsPreRef.value.indexOf(vnode)
    }
    const getPickerViewColumn: GetPickerViewColumn = function (columnInstance) {
      const ref: WritableComputedRef<number> = computed({
        get() {
          const index = getItemIndex(columnInstance.vnode)
          return state.value[index] || 0
        },
        set(current: number) {
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
            trigger('change', {} as Event, {
              value,
            })
          }
        },
      })
      return ref
    }
    provide('getPickerViewColumn', getPickerViewColumn)
    provide('pickerViewProps', props)
    provide('pickerViewState', state)

    if (__PLATFORM__ === 'app') {
      useRebuild(() => {
        // 由于 App 端 onMounted 时机未插入真实位置，需重新执行
        onMountedCallback()
        wrapperRef.value &&
          (columnsRef.value = (wrapperRef.value as HTMLElement).children)
      })
    }

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniPickerViewElement
      Object.defineProperty(rootElement, 'value', {
        get() {
          const columns = rootElement.querySelectorAll('uni-picker-view-column')
          return Array.from(columns).map(
            (item) => (item as unknown as { current: number }).current
          )
        },
        set(value: number[]) {
          const columns = rootElement.querySelectorAll('uni-picker-view-column')
          Array.from(columns).forEach((item, index) => {
            ;(item as unknown as { current: number }).current =
              value[index] || 0
          })
        },
      })
      rootElement.attachVmProps(props)
    })
    //#endif

    return () => {
      const defaultSlots = slots.default && slots.default()
      if (__PLATFORM__ !== 'app') {
        // TODO filter
        const vnode = flatVNode(defaultSlots)
        ColumnsPreRef.value = vnode
        nextTick(() => {
          columnsRef.value = vnode
        })
      }
      return (
        <uni-picker-view ref={rootRef}>
          <ResizeSensor
            ref={resizeSensorRef}
            // @ts-expect-error
            onResize={({ height }: { height: number }) =>
              (state.height = height)
            }
          ></ResizeSensor>
          <div ref={wrapperRef} class="uni-picker-view-wrapper">
            {defaultSlots}
          </div>
        </uni-picker-view>
      )
    }
  },
})
