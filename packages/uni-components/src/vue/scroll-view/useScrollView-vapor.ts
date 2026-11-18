import {
  type ExtractPropTypes,
  type SetupContext,
  computed,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { onScrollend } from '../../helpers/scrollend'
import { type EmitEvent, useCustomEvent } from '../../helpers/useEvent'
import {
  type ScrollViewController,
  type ScrollViewScrollToOptions,
  registerScrollViewContext,
} from './ScrollViewContext'

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

function isScrollReversed(
  style: CSSStyleDeclaration | undefined,
  horizontal: boolean
) {
  const flexReversed =
    (style?.display === 'flex' || style?.display === 'inline-flex') &&
    // 主轴由 flex-direction 反转，交叉轴由 wrap-reverse 反转。
    (style.flexDirection === (horizontal ? 'row-reverse' : 'column-reverse') ||
      (style.flexWrap === 'wrap-reverse' &&
        style.flexDirection.startsWith(horizontal ? 'column' : 'row')))
  return horizontal
    ? (style?.direction === 'rtl') !== flexReversed
    : flexReversed
}

function canScroll(
  element: HTMLElement,
  horizontal: boolean,
  delta: number,
  reverse: boolean
) {
  const size = horizontal ? element.clientWidth : element.clientHeight
  const total = horizontal ? element.scrollWidth : element.scrollHeight
  const extent = Math.max(0, total - size)
  const current = horizontal ? element.scrollLeft : element.scrollTop
  return delta < 0
    ? current > (reverse ? -extent : 0)
    : delta > 0 && current < (reverse ? 0 : extent)
}

export function useScrollView(
  props: Props,
  { emit, expose }: Pick<SetupContext, 'emit' | 'expose'>
) {
  const rootRef = ref<HTMLElement | null>(null)
  const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)
  const controller = reactive<ScrollViewController>({
    scrollEnabled: true,
    showScrollbar: props.showScrollbar !== false,
    pagingEnabled: false,
    scrollTo: contextScrollTo,
    scrollIntoView: scrollIntoViewSelector,
  })
  const scrollX = computed(
    () => props.direction === 'horizontal' || props.direction === 'all'
  )
  const scrollY = computed(
    () => props.direction === 'vertical' || props.direction === 'all'
  )
  const rootStyle = computed(
    () =>
      `overflow-x:${
        controller.scrollEnabled && scrollX.value ? 'auto' : 'hidden'
      };` +
      `overflow-y:${
        controller.scrollEnabled && scrollY.value ? 'auto' : 'hidden'
      };` +
      `scroll-behavior:${props.scrollWithAnimation ? 'smooth' : 'auto'};`
  )
  const scrollBarClassName = computed(() =>
    controller.showScrollbar ? '' : 'uni-scroll-view-scrollbar-hidden'
  )

  let lastScrollTop = 0
  let lastScrollLeft = 0
  let restoreScrollTop = 0
  let restoreScrollLeft = 0
  let lastUpperTime = 0
  let lastLowerTime = 0
  let pagingUserScroll = false
  let initialPositionPending = true
  let deactivated = false
  let pagingInput: { x: boolean; y: boolean; event: Event } | undefined
  let pagingInputTimer: ReturnType<typeof setTimeout> | undefined

  function clearPagingInput() {
    pagingInput = undefined
    if (pagingInputTimer !== undefined) clearTimeout(pagingInputTimer)
    pagingInputTimer = undefined
  }

  function resetPaging() {
    clearPagingInput()
    pagingUserScroll = false
  }

  function initialPosition(): ScrollToOptions {
    const position: ScrollToOptions = {}
    if (scrollX.value) position.left = Number(props.scrollLeft) || 0
    if (scrollY.value) position.top = Number(props.scrollTop) || 0
    return position
  }

  function cacheScrollPosition(root: HTMLElement) {
    if (deactivated) return
    restoreScrollTop = root.scrollTop
    restoreScrollLeft = root.scrollLeft
  }

  function scrollTo(options: ScrollToOptions) {
    const root = rootRef.value
    if (!root) return
    resetPaging()
    root.scrollTo(options)
    cacheScrollPosition(root)
  }

  function contextScrollTo(options: ScrollViewScrollToOptions) {
    const position: ScrollToOptions = {
      behavior: options.animated ? 'smooth' : 'instant',
    }
    if (scrollX.value && Number.isFinite(options.left))
      position.left = options.left
    if (scrollY.value && Number.isFinite(options.top))
      position.top = options.top
    if (position.left === undefined && position.top === undefined) return
    // 首次命令只覆盖显式指定的轴，其他轴仍采用尚未应用的初始属性。
    const target = initialPositionPending
      ? Object.assign(initialPosition(), position)
      : position
    initialPositionPending = false
    scrollTo(target)
  }

  function scrollToElement(element: Element) {
    const root = rootRef.value!
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

  function scrollIntoViewSelector(selector: string) {
    const root = rootRef.value
    if (!root || !selector) return
    let element: Element | null
    try {
      element = root.querySelector(selector)
    } catch {
      return
    }
    if (element) {
      initialPositionPending = false
      scrollToElement(element)
    }
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
    scrollToElement(element)
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
    if (event.target !== root || deactivated) return
    event.stopPropagation()
    if (pagingInput?.event.defaultPrevented) clearPagingInput()
    if (
      (pagingInput?.x && root.scrollLeft !== lastScrollLeft) ||
      (pagingInput?.y && root.scrollTop !== lastScrollTop)
    ) {
      pagingUserScroll = true
      clearPagingInput()
    }
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
    restoreScrollTop = lastScrollTop
    restoreScrollLeft = lastScrollLeft
  }

  function handleScrollEnd(event: Event) {
    const root = rootRef.value!
    if (event.target !== root || deactivated) return
    clearPagingInput()
    if (
      pagingUserScroll &&
      controller.pagingEnabled &&
      controller.scrollEnabled
    ) {
      pagingUserScroll = false
      const position: ScrollToOptions = { behavior: 'smooth' }
      const style = root.ownerDocument.defaultView?.getComputedStyle(root)
      if (scrollX.value) {
        const left = pagePosition(
          root.scrollLeft,
          root.clientWidth,
          root.scrollWidth,
          isScrollReversed(style, true)
        )
        if (Math.abs(left - root.scrollLeft) > 0.5) position.left = left
      }
      if (scrollY.value) {
        const top = pagePosition(
          root.scrollTop,
          root.clientHeight,
          root.scrollHeight,
          isScrollReversed(style, false)
        )
        if (Math.abs(top - root.scrollTop) > 0.5) position.top = top
      }
      if (position.left !== undefined || position.top !== undefined) {
        root.scrollTo(position)
        // 吸附结束后再派发一次最终的 scrollend。
        return
      }
    }
    trigger('scrollend', event, detail(root))
  }

  function pagePosition(
    position: number,
    size: number,
    total: number,
    reverse = false
  ) {
    if (size <= 0) return position
    const sign = reverse ? -1 : 1
    const max = Math.max(0, total - size)
    const current = Math.max(0, Math.min(sign * position, max))
    const page = Math.min(max, Math.round(current / size) * size)
    // 内容不足整页时，末尾本身也是一个吸附点。
    return sign * (max - current < Math.abs(page - current) ? max : page)
  }

  function beginUserScroll(deltaX: number, deltaY: number, event: Event) {
    if (
      !controller.pagingEnabled ||
      !controller.scrollEnabled ||
      deactivated ||
      event.defaultPrevented
    )
      return
    const x = scrollX.value && Number.isFinite(deltaX) && deltaX !== 0
    const y = scrollY.value && Number.isFinite(deltaY) && deltaY !== 0
    if (!x && !y) return
    clearPagingInput()
    pagingInput = { x, y, event }
    // 仅记录输入意图；由根容器实际偏移变化确认分页，嵌套滚动交给浏览器处理。
    pagingInputTimer = setTimeout(clearPagingInput, 150)
  }

  function handleWheel(event: WheelEvent) {
    beginUserScroll(event.deltaX, event.deltaY, event)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!controller.pagingEnabled || !controller.scrollEnabled || deactivated)
      return
    const target = event.target as HTMLElement
    if (
      !event.defaultPrevented &&
      !/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) &&
      !target.isContentEditable &&
      !(event.key === ' ' && target.closest('button, summary')) &&
      /^(ArrowUp|ArrowDown|ArrowLeft|ArrowRight|PageUp|PageDown|Home|End| )$/.test(
        event.key
      )
    ) {
      const horizontal =
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        (!scrollY.value && scrollX.value)
      beginUserScroll(horizontal ? 1 : 0, horizontal ? 0 : 1, event)
    }
  }

  let touchStart: {
    x: number
    y: number
    lastX: number
    lastY: number
    reverse?: { x: boolean; y: boolean }
  } | null = null
  function handleTouchStart(event: TouchEvent) {
    const touch = event.touches.length === 1 ? event.touches[0] : null
    touchStart = touch
      ? {
          x: touch.pageX,
          y: touch.pageY,
          lastX: touch.pageX,
          lastY: touch.pageY,
        }
      : null
  }
  function handleTouchMove(event: TouchEvent) {
    if (!controller.scrollEnabled || !touchStart || event.touches.length !== 1)
      return
    const root = rootRef.value!
    const touch = event.touches[0]
    const distanceX = touch.pageX - touchStart.x
    const distanceY = touch.pageY - touchStart.y
    const dx = touch.pageX - touchStart.lastX
    const dy = touch.pageY - touchStart.lastY
    touchStart.lastX = touch.pageX
    touchStart.lastY = touch.pageY
    // 累计位移判断主轴，避免单帧横向抖动把纵向手势交给父页。
    const horizontal = Math.abs(distanceX) > Math.abs(distanceY)
    if (horizontal ? !scrollX.value : !scrollY.value) return
    // 首次移动时共用一次样式查询，当前手势内复用两轴方向。
    if (!touchStart.reverse) {
      const style = root.ownerDocument.defaultView?.getComputedStyle(root)
      touchStart.reverse = {
        x: isScrollReversed(style, true),
        y: isScrollReversed(style, false),
      }
    }
    const reverse = horizontal ? touchStart.reverse.x : touchStart.reverse.y
    if (controller.pagingEnabled) {
      beginUserScroll(horizontal ? -dx : 0, horizontal ? 0 : -dy, event)
    }
    const delta = horizontal ? dx : dy
    // 主轴暂停时沿用累计意图；实际移动仍用增量判断，以支持手势反转。
    const boundaryDelta = delta || (horizontal ? distanceX : distanceY)
    // 到达边界后允许外层接管手势，内部可滚动时阻止触摸事件向外传播。
    if (canScroll(root, horizontal, -boundaryDelta, reverse)) {
      event.stopPropagation()
    }
  }
  function handleTouchEnd() {
    touchStart = null
  }

  let removeListeners: (() => void) | undefined
  onMounted(() => {
    const root = rootRef.value!
    const unregisterContext = registerScrollViewContext(root, controller)
    const passive = { passive: true }
    root.addEventListener('scroll', handleScroll, passive)
    root.addEventListener('touchstart', handleTouchStart, passive)
    root.addEventListener('touchmove', handleTouchMove, passive)
    root.addEventListener('touchend', handleTouchEnd, passive)
    root.addEventListener('touchcancel', handleTouchEnd, passive)
    root.addEventListener('wheel', handleWheel, passive)
    root.addEventListener('keydown', handleKeyDown)
    const removeScrollend = onScrollend(root, handleScrollEnd)
    removeListeners = () => {
      root.removeEventListener('scroll', handleScroll)
      root.removeEventListener('touchstart', handleTouchStart)
      root.removeEventListener('touchmove', handleTouchMove)
      root.removeEventListener('touchend', handleTouchEnd)
      root.removeEventListener('touchcancel', handleTouchEnd)
      root.removeEventListener('wheel', handleWheel)
      root.removeEventListener('keydown', handleKeyDown)
      removeScrollend()
      unregisterContext()
      resetPaging()
    }
    nextTick(() => {
      if (!rootRef.value || !initialPositionPending) return
      initialPositionPending = false
      const options = initialPosition()
      if (options.left !== undefined || options.top !== undefined)
        scrollTo(options)
      scrollIntoView(props.scrollIntoView)
    })
  })
  onBeforeUnmount(() => removeListeners?.())
  onDeactivated(() => {
    resetPaging()
    touchStart = null
    deactivated = true
  })
  onActivated(() => {
    if (!deactivated) return
    deactivated = false
    const options: ScrollToOptions = { behavior: 'instant' }
    if (scrollX.value) options.left = restoreScrollLeft
    if (scrollY.value) options.top = restoreScrollTop
    scrollTo(options)
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
  watch(
    () => props.showScrollbar,
    (value) => {
      controller.showScrollbar = value !== false
    }
  )
  watch(
    () => [controller.scrollEnabled, controller.pagingEnabled, props.direction],
    () => {
      resetPaging()
    },
    { flush: 'sync' }
  )

  expose({ $getMain: () => rootRef.value })
  return { rootRef, rootStyle, scrollBarClassName }
}
