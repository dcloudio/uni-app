import {
  Ref,
  ref,
  watch,
  onMounted,
  computed,
  reactive,
  inject,
  getCurrentInstance,
  ComponentInternalInstance,
  nextTick,
  ComponentPublicInstance,
} from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { useScroller } from '../../helpers/scroller'
import { Friction } from '../../helpers/scroller/Friction'
import { Spring } from '../../helpers/scroller/Spring'
import { Scroller } from '../../helpers/scroller/Scroller'
import { initScrollBounce, disableScrollBounce } from '../../helpers/scroll'
import { useTouchtrack } from '../../helpers/useTouchtrack'
import { useScopedAttrs } from '../../helpers/useScopedAttrs'
import { flatVNode } from '../../helpers/flatVNode'
import { useRebuild } from '../../helpers/useRebuild'
import ResizeSensor from '../resize-sensor/index'
import {
  GetPickerViewColumn,
  Props as PickerViewProps,
  State as PickerViewState,
} from '../picker-view'

let scopedIndex = 0
function useScopedClass(indicatorHeightRef: Ref<number>) {
  const className = `uni-picker-view-content-${scopedIndex++}`
  function updateStyle() {
    const style = document.createElement('style')
    style.innerText = `.uni-picker-view-content.${className}>*{height: ${indicatorHeightRef.value}px;overflow: hidden;}`
    document.head.appendChild(style)
  }
  watch(() => indicatorHeightRef.value, updateStyle)
  return className
}

function useCustomClick(dom: HTMLElement) {
  type CustomClickProps =
    | 'screenX'
    | 'screenY'
    | 'clientX'
    | 'clientY'
    | 'pageX'
    | 'pageY'
  interface CustomClick
    extends CustomEvent,
      Partial<Record<CustomClickProps, number>> {}
  const MAX_MOVE = 20
  let x = 0
  let y = 0
  dom.addEventListener('touchstart', (event) => {
    const info = event.changedTouches[0]
    x = info.clientX
    y = info.clientY
  })
  dom.addEventListener('touchend', (event: TouchEvent) => {
    const info = event.changedTouches[0]
    if (
      Math.abs(info.clientX - x) < MAX_MOVE &&
      Math.abs(info.clientY - y) < MAX_MOVE
    ) {
      const options: any = {
        bubbles: true,
        cancelable: true,
        target: event.target,
        currentTarget: event.currentTarget,
      }
      const customClick: CustomClick = new CustomEvent('click', options)
      const props: CustomClickProps[] = [
        'screenX',
        'screenY',
        'clientX',
        'clientY',
        'pageX',
        'pageY',
      ]
      props.forEach((key) => {
        customClick[key] = info[key]
      })
      event.target!.dispatchEvent(customClick)
    }
  })
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'PickerViewColumn',
  setup(props, { slots, emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const contentRef: Ref<HTMLElement | null> = ref(null)

    const getPickerViewColumn: GetPickerViewColumn | undefined = inject(
      'getPickerViewColumn'
    )
    const instance = getCurrentInstance() as ComponentInternalInstance
    const currentRef = getPickerViewColumn
      ? getPickerViewColumn(instance)
      : ref(0)

    const pickerViewProps = inject('pickerViewProps') as PickerViewProps
    const pickerViewState = inject('pickerViewState') as PickerViewState
    const indicatorHeight = ref(34)
    const resizeSensorRef: Ref<ComponentPublicInstance | null> = ref(null)
    const initIndicatorHeight = () => {
      const resizeSensor = resizeSensorRef.value as ComponentPublicInstance
      indicatorHeight.value = resizeSensor.$el.offsetHeight
    }
    if (__PLATFORM__ !== 'app') {
      onMounted(initIndicatorHeight)
    }
    const maskSize = computed(
      () => (pickerViewState.height - indicatorHeight.value) / 2
    )

    const { state: scopedAttrsState } = useScopedAttrs()
    const className = useScopedClass(indicatorHeight)

    let scroller: Scroller

    const state = reactive({
      current: currentRef.value,
      length: 0,
    })
    let updatesScrollerRequest: boolean
    function updatesScroller() {
      if (scroller && !updatesScrollerRequest) {
        updatesScrollerRequest = true
        nextTick(() => {
          updatesScrollerRequest = false
          let current = Math.min(state.current, state.length - 1)
          current = Math.max(current, 0)
          scroller.update(
            current * indicatorHeight.value,
            undefined,
            indicatorHeight.value
          )
        })
      }
    }
    watch(
      () => currentRef.value,
      (current) => {
        if (current !== state.current) {
          state.current = current
          updatesScroller()
        }
      }
    )
    watch(
      () => state.current,
      (current) => (currentRef.value = current)
    )
    watch(
      [
        () => indicatorHeight.value,
        () => state.length,
        () => pickerViewState.height,
      ],
      updatesScroller
    )

    let oldDeltaY = 0
    function handleWheel(event: Event) {
      const deltaY = oldDeltaY + (event as WheelEvent).deltaY
      if (Math.abs(deltaY) > 10) {
        oldDeltaY = 0
        let current = Math.min(
          state.current + (deltaY < 0 ? -1 : 1),
          state.length - 1
        )
        state.current = current = Math.max(current, 0)
        scroller.scrollTo(current * indicatorHeight.value)
      } else {
        oldDeltaY = deltaY
      }
      event.preventDefault()
    }
    function handleTap({ clientY }: MouseEvent) {
      const el = rootRef.value as HTMLElement
      if (!scroller.isScrolling()) {
        const rect = el.getBoundingClientRect()
        const r = clientY - rect.top - pickerViewState.height / 2
        const o = indicatorHeight.value / 2
        if (!(Math.abs(r) <= o)) {
          const a = Math.ceil((Math.abs(r) - o) / indicatorHeight.value)
          const s = r < 0 ? -a : a
          let current = Math.min(state.current + s, state.length - 1)
          state.current = current = Math.max(current, 0)
          scroller.scrollTo(current * indicatorHeight.value)
        }
      }
    }

    const initScroller = () => {
      const el = rootRef.value as HTMLElement
      const content = contentRef.value as HTMLElement
      const {
        scroller: scrollerOrigin,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
      } = useScroller(content, {
        enableY: true,
        enableX: false,
        enableSnap: true,
        itemSize: indicatorHeight.value,
        friction: new Friction(0.0001),
        spring: new Spring(2, 90, 20),
        onSnap: (index) => {
          if (!isNaN(index) && index !== state.current) {
            state.current = index
          }
        },
      })
      scroller = scrollerOrigin
      useTouchtrack(
        el,
        (e) => {
          switch (e.detail.state) {
            case 'start':
              handleTouchStart(e)
              disableScrollBounce({
                disable: true,
              })
              break
            case 'move':
              handleTouchMove(e)
              e.stopPropagation()
              break
            case 'end':
            case 'cancel':
              handleTouchEnd(e)
              disableScrollBounce({
                disable: false,
              })
          }
        },
        true
      )
      useCustomClick(el)
      initScrollBounce()
      updatesScroller()
    }
    if (__PLATFORM__ !== 'app') {
      onMounted(initScroller)
    }

    if (__PLATFORM__ === 'app') {
      let isMounted: boolean = false
      useRebuild(() => {
        contentRef.value &&
          (state.length = (contentRef.value as HTMLElement).children.length)
        if (!isMounted) {
          isMounted = true
          // 由于 App 端 onMounted 时机未插入真实位置，需重新执行
          initIndicatorHeight()
          initScroller()
        }
      })
    }

    return () => {
      const defaultSlots = slots.default && slots.default()
      if (__PLATFORM__ !== 'app') {
        state.length = flatVNode(defaultSlots).length
      }
      const padding = `${maskSize.value}px 0`
      return (
        <uni-picker-view-column ref={rootRef}>
          <div
            onWheel={handleWheel}
            onClick={handleTap}
            class="uni-picker-view-group"
          >
            <div
              {...scopedAttrsState.attrs}
              class={['uni-picker-view-mask', pickerViewProps.maskClass]}
              style={`background-size: 100% ${maskSize.value}px;${pickerViewProps.maskStyle}`}
            ></div>
            <div
              {...scopedAttrsState.attrs}
              class={[
                'uni-picker-view-indicator',
                pickerViewProps.indicatorClass,
              ]}
              style={pickerViewProps.indicatorStyle}
            >
              <ResizeSensor
                ref={resizeSensorRef}
                // @ts-ignore
                onResize={({ height }: { height: number }) =>
                  (indicatorHeight.value = height)
                }
              ></ResizeSensor>
            </div>
            <div
              ref={contentRef}
              class={['uni-picker-view-content', className]}
              style={{ padding: padding }}
            >
              {defaultSlots}
            </div>
          </div>
        </uni-picker-view-column>
      )
    }
  },
})
