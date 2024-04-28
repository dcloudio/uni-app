import { nextTick, onActivated, onMounted, reactive, ref, watch } from 'vue'
import type { Ref, SetupContext } from 'vue'
import { extend } from '@vue/shared'
import { defineBuiltInComponent } from '../../helpers/component'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'ResizeSensor',
  props: {
    initial: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['resize'],
  setup(props, { emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    const reset = useResizeSensorReset(rootRef)
    const update = useResizeSensorUpdate(rootRef, emit, reset)
    useResizeSensorLifecycle(rootRef, props, update, reset)
    return () => (
      <uni-resize-sensor ref={rootRef} onAnimationstartOnce={update}>
        <div onScroll={update}>
          <div />
        </div>
        <div onScroll={update}>
          <div />
        </div>
      </uni-resize-sensor>
    )
  },
})

function useResizeSensorUpdate(
  rootRef: Ref<HTMLElement | null>,
  emit: SetupContext<['resize']>['emit'],
  reset: () => void
) {
  const size = reactive({ width: -1, height: -1 })
  watch(
    () => extend({}, size),
    (value: typeof size) => emit('resize', value)
  )
  return () => {
    const rootEl = rootRef.value
    if (!rootEl) return
    size.width = rootEl.offsetWidth
    size.height = rootEl.offsetHeight
    reset()
  }
}

function useResizeSensorReset(rootRef: Ref<HTMLElement | null>) {
  return () => {
    const { firstElementChild, lastElementChild } = rootRef.value!
    firstElementChild!.scrollLeft = 100000
    firstElementChild!.scrollTop = 100000
    lastElementChild!.scrollLeft = 100000
    lastElementChild!.scrollTop = 100000
  }
}

function useResizeSensorLifecycle(
  rootRef: Ref<HTMLElement | null>,
  props: { initial: boolean },
  update: () => void,
  reset: () => void
) {
  onActivated(reset)
  onMounted(() => {
    if (props.initial) {
      nextTick(update)
    }
    const rootEl = rootRef.value!
    if (rootEl.offsetParent !== rootEl.parentElement) {
      rootEl.parentElement!.style.position = 'relative'
    }
    if (!('AnimationEvent' in window)) {
      reset()
    }
  })
}
