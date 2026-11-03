import {
  type ExtractPropTypes,
  type SetupContext,
  computed,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'
import { onScrollend } from '../../helpers/scrollend'
import { type EmitEvent, useCustomEvent } from '../../helpers/useEvent'

export const props = {
  direction: { type: String, default: 'vertical' },
  showScrollbar: { type: [Boolean, String], default: true },
  upperThreshold: { type: [Number, String], default: 50 },
  lowerThreshold: { type: [Number, String], default: 50 },
  scrollTop: { type: [Number, String], default: 0 },
  scrollLeft: { type: [Number, String], default: 0 },
  scrollIntoView: { type: String, default: '' },
  scrollWithAnimation: { type: [Boolean, String], default: false },
}

export const emits = ['scroll', 'scrollend', 'scrolltoupper', 'scrolltolower']

type Props = ExtractPropTypes<typeof props>

function threshold(value: number | string) {
  const number = Number(value)
  return isNaN(number) ? 50 : number
}

export function useScrollView(
  props: Props,
  { emit, expose }: Pick<SetupContext, 'emit' | 'expose'>
) {
  const rootRef = ref<HTMLElement | null>(null)
  const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
  const scrollX = computed(
    () => props.direction === 'horizontal' || props.direction === 'all'
  )
  const scrollY = computed(
    () => props.direction === 'vertical' || props.direction === 'all'
  )
  const rootStyle = computed(
    () =>
      `overflow-x:${scrollX.value ? 'auto' : 'hidden'};` +
      `overflow-y:${scrollY.value ? 'auto' : 'hidden'};`
  )
  const scrollBarClassName = computed(() =>
    props.showScrollbar === false ? 'uni-scroll-view-scrollbar-hidden' : ''
  )

  let lastScrollTop = 0
  let lastScrollLeft = 0
  let lastUpperTime = 0
  let lastLowerTime = 0

  function scrollTo(options: ScrollToOptions) {
    rootRef.value?.scrollTo(
      Object.assign(options, {
        behavior: props.scrollWithAnimation ? 'smooth' : 'instant',
      })
    )
  }

  function scrollIntoView(id: string) {
    const root = rootRef.value
    if (!root || !id) return
    if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(id)) {
      console.error(`id error: scroll-into-view=${id}`)
      return
    }
    // 校验后的 ID 不含引号；属性选择器也能匹配带冒号的 ID。
    const element = root.querySelector(`[id="${id}"]`)
    if (!element) return
    const rootRect = root.getBoundingClientRect()
    const rect = element.getBoundingClientRect()
    const options: ScrollToOptions = {}
    if (scrollX.value) {
      options.left =
        root.scrollLeft + rect.left - rootRect.left - root.clientLeft
    }
    if (scrollY.value) {
      options.top = root.scrollTop + rect.top - rootRect.top - root.clientTop
    }
    // 双向滚动一次提交，避免第二次原生滚动中断第一次。
    if (options.left !== undefined || options.top !== undefined)
      scrollTo(options)
  }

  function detail(root: HTMLElement) {
    return {
      scrollLeft: root.scrollLeft,
      scrollTop: root.scrollTop,
      scrollHeight: root.scrollHeight,
      scrollWidth: root.scrollWidth,
      deltaX: lastScrollLeft - root.scrollLeft,
      deltaY: lastScrollTop - root.scrollTop,
    }
  }

  function checkBoundary(
    event: Event,
    position: number,
    previous: number,
    size: number,
    total: number,
    upper: string,
    lower: string
  ) {
    if (
      position <= threshold(props.upperThreshold) &&
      position < previous &&
      event.timeStamp - lastUpperTime > 200
    ) {
      trigger('scrolltoupper', event, { direction: upper })
      lastUpperTime = event.timeStamp
    }
    if (
      position + size + threshold(props.lowerThreshold) >= total &&
      position > previous &&
      event.timeStamp - lastLowerTime > 200
    ) {
      trigger('scrolltolower', event, { direction: lower })
      lastLowerTime = event.timeStamp
    }
  }

  function handleScroll(event: Event) {
    const root = rootRef.value!
    if (event.target !== root) return
    event.stopPropagation()
    trigger('scroll', event, detail(root))
    if (scrollY.value) {
      checkBoundary(
        event,
        root.scrollTop,
        lastScrollTop,
        root.clientHeight,
        root.scrollHeight,
        'top',
        'bottom'
      )
    }
    if (scrollX.value) {
      checkBoundary(
        event,
        root.scrollLeft,
        lastScrollLeft,
        root.clientWidth,
        root.scrollWidth,
        'left',
        'right'
      )
    }
    lastScrollTop = root.scrollTop
    lastScrollLeft = root.scrollLeft
  }

  function handleScrollEnd(event: Event) {
    if (event.target === rootRef.value) {
      trigger('scrollend', event, detail(rootRef.value!))
    }
  }

  let touchStart: { x: number; y: number } | null = null
  function handleTouchStart(event: TouchEvent) {
    touchStart =
      event.touches.length === 1
        ? { x: event.touches[0].pageX, y: event.touches[0].pageY }
        : null
  }
  function handleTouchMove(event: TouchEvent) {
    if (!touchStart || event.touches.length !== 1) return
    const root = rootRef.value!
    const dx = event.touches[0].pageX - touchStart.x
    const dy = event.touches[0].pageY - touchStart.y
    const horizontal = Math.abs(dx) > Math.abs(dy)
    if (horizontal ? !scrollX.value : !scrollY.value) return
    const position = horizontal ? root.scrollLeft : root.scrollTop
    const max = horizontal
      ? root.scrollWidth - root.clientWidth
      : root.scrollHeight - root.clientHeight
    const delta = horizontal ? dx : dy
    // 到达边界后允许外层接管手势，内部可滚动时阻止触摸事件向外传播。
    if ((delta > 0 && position > 0) || (delta < 0 && position < max)) {
      event.stopPropagation()
    }
  }
  function handleTouchEnd() {
    touchStart = null
  }

  let removeListeners: (() => void) | undefined
  onMounted(() => {
    const root = rootRef.value!
    const passive = { passive: true }
    root.addEventListener('scroll', handleScroll, passive)
    root.addEventListener('touchstart', handleTouchStart, passive)
    root.addEventListener('touchmove', handleTouchMove, passive)
    root.addEventListener('touchend', handleTouchEnd, passive)
    root.addEventListener('touchcancel', handleTouchEnd, passive)
    const removeScrollend = onScrollend(root, handleScrollEnd)
    removeListeners = () => {
      root.removeEventListener('scroll', handleScroll)
      root.removeEventListener('touchstart', handleTouchStart)
      root.removeEventListener('touchmove', handleTouchMove)
      root.removeEventListener('touchend', handleTouchEnd)
      root.removeEventListener('touchcancel', handleTouchEnd)
      removeScrollend()
    }
    nextTick(() => {
      if (!rootRef.value) return
      const options: ScrollToOptions = {}
      if (scrollX.value) options.left = Number(props.scrollLeft) || 0
      if (scrollY.value) options.top = Number(props.scrollTop) || 0
      if (options.left !== undefined || options.top !== undefined)
        scrollTo(options)
      scrollIntoView(props.scrollIntoView)
    })
  })
  onBeforeUnmount(() => removeListeners?.())
  onActivated(() => {
    const options: ScrollToOptions = { behavior: 'instant' }
    if (scrollX.value) options.left = lastScrollLeft
    if (scrollY.value) options.top = lastScrollTop
    rootRef.value?.scrollTo(options)
  })

  watch(
    () => [props.scrollTop, props.scrollLeft],
    ([top, left], [previousTop, previousLeft]) => {
      const options: ScrollToOptions = {}
      if (scrollY.value && top !== previousTop) options.top = Number(top) || 0
      if (scrollX.value && left !== previousLeft)
        options.left = Number(left) || 0
      if (options.left !== undefined || options.top !== undefined)
        scrollTo(options)
    },
    { flush: 'post' }
  )
  watch(() => props.scrollIntoView, scrollIntoView, { flush: 'post' })

  expose({ $getMain: () => rootRef.value })
  return { rootRef, rootStyle, scrollBarClassName }
}
