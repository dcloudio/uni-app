import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { UniElement } from '../../helpers/UniElement'
import { type EmitEvent, useCustomEvent } from '../../helpers/useEvent'

const MAX_SLIDE_DISTANCE = 100
const MIN_SLIDE_VELOCITY = 0.3

type PageContainerPosition = 'top' | 'bottom' | 'left' | 'right' | 'center'

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 300,
  },
  zIndex: {
    type: Number,
    default: 100,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  round: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String as () => PageContainerPosition,
    default: 'bottom' as PageContainerPosition,
  },
  customStyle: {
    type: String,
    default: '',
  },
  overlayStyle: {
    type: String,
    default: '',
  },
  closeOnSlideDown: {
    type: Boolean,
    default: false,
  },
}

export class UniPageContainerElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'PageContainer',
  props,
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-page-container-element',
    class: UniPageContainerElement,
  },
  //#endif
  emits: [
    'beforeenter',
    'enter',
    'afterenter',
    'beforeleave',
    'leave',
    'afterleave',
    'clickoverlay',
  ],
  setup(props, { emit, slots }) {
    const rootRef = ref<HTMLElement | null>(null)
    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
    const showPageContainer = ref(false)
    const isAnimating = ref(false)
    const transitionTimer = ref<number | null>(null)
    const isEntered = ref(false)

    let touchStartX = 0
    let touchStartY = 0
    let touchStartTime = 0
    let isDragging = false
    const translateValue = ref<number>(0)

    const overlayStyleMap = computed(() => {
      const styleMap = new Map<string, string>([
        ['z-index', String(props.zIndex)],
        ['transition-duration', props.duration + 'ms'],
      ])
      if (isEntered.value) {
        styleMap.set('opacity', '1').set('pointer-events', 'auto')
      }
      return styleMap
    })

    const innerStyleMap = computed(() => {
      const styleMap = new Map<string, string>([
        ['z-index', String(props.zIndex + 1)],
        ['transition-duration', props.duration + 'ms'],
      ])
      if (translateValue.value !== 0 && isDragging) {
        let transformValue = ''
        switch (props.position) {
          case 'bottom':
          case 'top':
            transformValue = `translateY(${translateValue.value}px)`
            break
          case 'left':
          case 'right':
            transformValue = `translateX(${translateValue.value}px)`
            break
        }
        if (transformValue) {
          styleMap.set('transform', transformValue)
          styleMap.set('transition', 'none')
        }
      } else if (translateValue.value !== 0 && !isDragging) {
        styleMap.set('transition', `transform ${props.duration}ms ease`)
      }
      return styleMap
    })

    const popupClasses = computed(() => {
      const classes: string[] = []
      if (props.position) {
        classes.push(`uni-page-container-popup-${props.position}`)
      }
      if (props.round) {
        classes.push('uni-page-container-popup-round')
      }
      if (isEntered.value) {
        classes.push('uni-page-container-popup-enter')
      }
      return classes
    })

    function clearTransitionTimer() {
      if (transitionTimer.value !== null) {
        clearTimeout(transitionTimer.value)
        transitionTimer.value = null
      }
    }

    function onAnimationEnd(type: 'enter' | 'leave') {
      isAnimating.value = false
      clearTransitionTimer()
      if (type === 'enter') {
        trigger('afterenter', {} as Event)
      } else if (type === 'leave') {
        showPageContainer.value = false
        trigger('afterleave', {} as Event)
      }
    }

    function listenTransitionEnd(type: 'enter' | 'leave') {
      clearTransitionTimer()
      transitionTimer.value = setTimeout(() => {
        onAnimationEnd(type)
      }, props.duration) as unknown as number
    }

    function resetDragState() {
      isDragging = false
      translateValue.value = 0
    }

    function openContainer() {
      trigger('beforeenter', {} as Event)
      showPageContainer.value = true
      isEntered.value = false
      resetDragState()
      nextTick(() => {
        trigger('enter', {} as Event)
        isAnimating.value = true
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            isEntered.value = true
            listenTransitionEnd('enter')
          })
        })
      })
    }

    function closeContainer() {
      if (isAnimating.value) return
      trigger('beforeleave', {} as Event)
      isAnimating.value = true
      nextTick(() => {
        isEntered.value = false
        trigger('leave', {} as Event)
        listenTransitionEnd('leave')
      })
    }

    watch(
      () => props.show,
      (newVal) => {
        if (newVal && !showPageContainer.value) {
          openContainer()
        } else if (!newVal && showPageContainer.value) {
          closeContainer()
        }
      }
    )

    function onClickOverlay(event: Event) {
      if (isAnimating.value) return
      trigger('clickoverlay', event)
      nextTick(() => {
        closeContainer()
      })
    }

    function onTouchStart(e: TouchEvent) {
      if (!props.closeOnSlideDown) return
      if (e.touches.length > 0) {
        const { clientX, clientY } = e.touches[0]
        touchStartX = clientX
        touchStartY = clientY
        touchStartTime = Date.now()
        isDragging = false
      }
    }

    function onTouchMove(e: TouchEvent) {
      if (!props.closeOnSlideDown) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
      if (e.touches.length > 0) {
        const { clientX, clientY } = e.touches[0]
        const deltaX = clientX - touchStartX
        const deltaY = clientY - touchStartY
        let shouldDrag = false
        let dragValue = 0

        switch (props.position) {
          case 'bottom':
            if (deltaY > 0) {
              shouldDrag = true
              dragValue = deltaY
            }
            break
          case 'top':
            if (deltaY < 0) {
              shouldDrag = true
              dragValue = deltaY
            }
            break
          case 'left':
            if (deltaX < 0) {
              shouldDrag = true
              dragValue = deltaX
            }
            break
          case 'right':
            if (deltaX > 0) {
              shouldDrag = true
              dragValue = deltaX
            }
            break
        }

        if (shouldDrag) {
          isDragging = true
          translateValue.value = dragValue
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }

    function onTouchEnd() {
      if (!props.closeOnSlideDown) return
      if (isDragging) {
        const deltaTime = Date.now() - touchStartTime
        const velocity = Math.abs(translateValue.value) / deltaTime
        if (
          Math.abs(translateValue.value) > MAX_SLIDE_DISTANCE ||
          velocity > MIN_SLIDE_VELOCITY
        ) {
          resetDragState()
          closeContainer()
        } else {
          resetDragState()
        }
      }
    }

    function onTouchCancel() {
      if (!props.closeOnSlideDown) return
      if (isDragging) {
        resetDragState()
      }
    }

    onMounted(() => {
      if (props.show) {
        openContainer()
      }
    })

    onBeforeUnmount(() => {
      clearTransitionTimer()
    })

    return () => {
      return (
        <uni-page-container ref={rootRef}>
          {props.overlay && showPageContainer.value && (
            <div
              class="uni-page-container-overlay"
              style={[overlayStyleMap.value, props.overlayStyle]}
              onClick={onClickOverlay}
              onTouchmove={(e: TouchEvent) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            />
          )}
          {showPageContainer.value && (
            <div
              class={['uni-page-container-popup', ...popupClasses.value]}
              style={[innerStyleMap.value, props.customStyle]}
              onTouchstart={onTouchStart}
              onTouchmove={onTouchMove}
              onTouchend={onTouchEnd}
              onTouchcancel={onTouchCancel}
            >
              {slots.default?.()}
            </div>
          )}
        </uni-page-container>
      )
    }
  },
})
