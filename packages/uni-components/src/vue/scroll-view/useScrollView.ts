import {
  type ExtractPropTypes,
  type Ref,
  type SetupContext,
  computed,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { passive } from '@dcloudio/uni-shared'
import { onScrollend } from '../../helpers/scrollend'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
} from '../../helpers/useEvent'
import { RefreshStateEnum, type RefresherState } from '../refresher/types'
import { useRefresher } from '../refresher/useRefresher'
type HTMLRef = Ref<HTMLElement | null>
type Props = ExtractPropTypes<typeof props>
type Direction = 'x' | 'y'
interface State extends RefresherState {
  lastScrollTop: number
  lastScrollLeft: number
  lastScrollToUpperTime: number
  lastScrollToLowerTime: number
}

export const props = {
  direction: {
    type: [String],
    default: 'vertical',
  },
  scrollX: {
    type: [Boolean, String],
    default: false,
  },
  scrollY: {
    type: [Boolean, String],
    default: false,
  },
  showScrollbar: {
    type: [Boolean, String],
    default: true,
  },
  upperThreshold: {
    type: [Number, String],
    default: 50,
  },
  lowerThreshold: {
    type: [Number, String],
    default: 50,
  },
  scrollTop: {
    type: [Number, String],
    default: 0,
  },
  scrollLeft: {
    type: [Number, String],
    default: 0,
  },
  scrollIntoView: {
    type: String,
    default: '',
  },
  scrollWithAnimation: {
    type: [Boolean, String],
    default: false,
  },
  enableBackToTop: {
    type: [Boolean, String],
    default: false,
  },
  refresherEnabled: {
    type: [Boolean, String],
    default: false,
  },
  refresherThreshold: {
    type: Number,
    default: 45,
  },
  refresherDefaultStyle: {
    type: String,
    /**
     * auto为内部值，蒸汽模式下用户未设置时使用该值
     */
    default: __VAPOR__ ? 'auto' : 'black',
  },
  refresherBackground: {
    type: String,
    default: __X__ ? 'transparent' : '#fff',
  },
  refresherTriggered: {
    type: [Boolean, String],
    default: false,
  },
}

export const emits = [
  'scroll',
  'scrollend',
  'scrolltoupper',
  'scrolltolower',
  'refresherrefresh',
  'refresherrestore',
  'refresherpulling',
  'refresherabort',
  'update:refresherTriggered',
]

export function useScrollView(
  props: Props,
  { emit, expose }: Pick<SetupContext, 'emit' | 'expose'>
) {
  const rootRef: HTMLRef = ref(null)
  const main: HTMLRef = ref(null)
  const wrap: HTMLRef = ref(null)
  const content: HTMLRef = ref(null)

  const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

  const { state, scrollTopNumber, scrollLeftNumber } = useScrollViewState(props)
  const { realScrollX, realScrollY, _scrollLeftChanged, _scrollTopChanged } =
    useScrollViewLoader(
      props,
      state,
      scrollTopNumber,
      scrollLeftNumber,
      trigger,
      rootRef,
      main,
      content,
      emit as SetupContext['emit']
    )

  const mainStyle = computed(() => {
    let style = ''
    realScrollX.value
      ? (style += 'overflow-x:auto;')
      : (style += 'overflow-x:hidden;')
    realScrollY.value
      ? (style += 'overflow-y:auto;')
      : (style += 'overflow-y:hidden;')
    return style
  })

  const scrollBarClassName = computed(() => {
    let className = 'uni-scroll-view'
    if (props.showScrollbar === false) {
      className += ' uni-scroll-view-scrollbar-hidden'
    }
    return className
  })

  expose({
    // 自动化测试需要暴露main从而获取scrollLeft
    $getMain() {
      return main.value
    },
  })

  return {
    rootRef,
    main,
    wrap,
    content,
    state,
    mainStyle,
    scrollBarClassName,
    _scrollLeftChanged,
    _scrollTopChanged,
  }
}

function useScrollViewState(props: Props) {
  const scrollTopNumber = computed(() => {
    return Number(props.scrollTop) || 0
  })
  const scrollLeftNumber = computed(() => {
    return Number(props.scrollLeft) || 0
  })

  const state: State = reactive({
    lastScrollTop: scrollTopNumber.value,
    lastScrollLeft: scrollLeftNumber.value,
    lastScrollToUpperTime: 0,
    lastScrollToLowerTime: 0,
    refresherHeight: 0,
    refreshState: RefreshStateEnum.Idle,
  })

  return {
    state,
    scrollTopNumber,
    scrollLeftNumber,
  }
}

function useScrollViewLoader(
  props: Props,
  state: State,
  scrollTopNumber: Ref<number>,
  scrollLeftNumber: Ref<number>,
  trigger: CustomEventTrigger,
  rootRef: HTMLRef,
  main: HTMLRef,
  content: HTMLRef,
  emit: SetupContext['emit']
) {
  let _innerSetScrollTop: boolean = false
  let _innerSetScrollLeft: boolean = false

  let __transitionEnd = () => {}

  const realScrollX = computed(() => {
    //#if _X_
    if (props.direction === 'horizontal' || props.direction === 'all') {
      return true
    }
    return false
    //#else
    return props.scrollX
    //#endif
  })
  const realScrollY = computed(() => {
    //#if _X_
    if (props.direction === 'vertical' || props.direction === 'all') {
      return true
    }
    return false
    //#else
    return props.scrollY
    //#endif
  })

  useRefresher({
    props,
    state,
    scrollElement: main,
    isVertical: realScrollY,
    trigger,
    emit,
    onNativeTouchMove(event, dx, dy) {
      const horizontal = Math.abs(dx) > Math.abs(dy)
      if (horizontal ? !realScrollX.value : !realScrollY.value) return
      const element = main.value!
      const position = horizontal ? element.scrollLeft : element.scrollTop
      const max = horizontal
        ? element.scrollWidth - element.offsetWidth
        : element.scrollHeight - element.offsetHeight
      const delta = horizontal ? dx : dy
      if ((delta > 0 && position > 0) || (delta < 0 && position < max)) {
        event.stopPropagation()
      }
    },
  })

  const upperThresholdNumber = computed(() => {
    let val = Number(props.upperThreshold)
    return isNaN(val) ? 50 : val
  })
  const lowerThresholdNumber = computed(() => {
    let val = Number(props.lowerThreshold)
    return isNaN(val) ? 50 : val
  })

  function scrollTo(scrollToValue: number, direction: Direction) {
    const container = main.value!
    let transformValue = 0
    let transform = ''

    scrollToValue < 0
      ? (scrollToValue = 0)
      : direction === 'x' &&
        scrollToValue > container.scrollWidth - container.offsetWidth
      ? (scrollToValue = container.scrollWidth - container.offsetWidth)
      : direction === 'y' &&
        scrollToValue > container.scrollHeight - container.offsetHeight &&
        (scrollToValue = container.scrollHeight - container.offsetHeight)

    direction === 'x'
      ? (transformValue = container.scrollLeft - scrollToValue)
      : direction === 'y' &&
        (transformValue = container.scrollTop - scrollToValue)

    if (transformValue === 0) return

    let _content = content.value!

    _content.style.transition = 'transform .3s ease-out'
    _content.style.webkitTransition = '-webkit-transform .3s ease-out'
    if (direction === 'x') {
      transform = 'translateX(' + transformValue + 'px) translateZ(0)'
    } else {
      direction === 'y' &&
        (transform = 'translateY(' + transformValue + 'px) translateZ(0)')
    }
    _content.removeEventListener('transitionend', __transitionEnd)
    _content.removeEventListener('webkitTransitionEnd', __transitionEnd)
    __transitionEnd = () => _transitionEnd(scrollToValue, direction)
    _content.addEventListener('transitionend', __transitionEnd)
    _content.addEventListener('webkitTransitionEnd', __transitionEnd)
    if (direction === 'x') {
      // if (e !== 'ios') {
      container.style.overflowX = 'hidden'
      // }
    } else if (direction === 'y') {
      container.style.overflowY = 'hidden'
    }

    _content.style.transform = transform
    _content.style.webkitTransform = transform
  }
  function _handleScroll($event: MouseEvent) {
    const target = $event.target as HTMLElement
    trigger('scroll', $event, {
      scrollLeft: target.scrollLeft,
      scrollTop: target.scrollTop,
      scrollHeight: target.scrollHeight,
      scrollWidth: target.scrollWidth,
      deltaX: state.lastScrollLeft - target.scrollLeft,
      deltaY: state.lastScrollTop - target.scrollTop,
    })
    if (realScrollY.value) {
      if (
        target.scrollTop <= upperThresholdNumber.value &&
        state.lastScrollTop - target.scrollTop > 0 &&
        $event.timeStamp - state.lastScrollToUpperTime > 200
      ) {
        trigger('scrolltoupper', $event, {
          direction: 'top',
        })
        state.lastScrollToUpperTime = $event.timeStamp
      }
      if (
        target.scrollTop + target.offsetHeight + lowerThresholdNumber.value >=
          target.scrollHeight &&
        state.lastScrollTop - target.scrollTop < 0 &&
        $event.timeStamp - state.lastScrollToLowerTime > 200
      ) {
        trigger('scrolltolower', $event, {
          direction: 'bottom',
        })
        state.lastScrollToLowerTime = $event.timeStamp
      }
    }
    if (realScrollX.value) {
      if (
        target.scrollLeft <= upperThresholdNumber.value &&
        state.lastScrollLeft - target.scrollLeft > 0 &&
        $event.timeStamp - state.lastScrollToUpperTime > 200
      ) {
        trigger('scrolltoupper', $event, {
          direction: 'left',
        })
        state.lastScrollToUpperTime = $event.timeStamp
      }
      if (
        target.scrollLeft + target.offsetWidth + lowerThresholdNumber.value >=
          target.scrollWidth &&
        state.lastScrollLeft - target.scrollLeft < 0 &&
        $event.timeStamp - state.lastScrollToLowerTime > 200
      ) {
        trigger('scrolltolower', $event, {
          direction: 'right',
        })
        state.lastScrollToLowerTime = $event.timeStamp
      }
    }
    state.lastScrollTop = target.scrollTop
    state.lastScrollLeft = target.scrollLeft
  }
  function _handleScrollEnd($event: Event) {
    const target = $event.target as HTMLElement
    trigger('scrollend', $event, {
      scrollLeft: target.scrollLeft,
      scrollTop: target.scrollTop,
      scrollHeight: target.scrollHeight,
      scrollWidth: target.scrollWidth,
      deltaX: state.lastScrollLeft - target.scrollLeft,
      deltaY: state.lastScrollTop - target.scrollTop,
    })
  }
  function _scrollTopChanged(val: number) {
    if (realScrollY.value) {
      if (_innerSetScrollTop) {
        _innerSetScrollTop = false
      } else {
        if (props.scrollWithAnimation) {
          scrollTo(val, 'y')
        } else {
          main.value!.scrollTop = val
        }
      }
    }
  }
  function _scrollLeftChanged(val: number) {
    if (realScrollX.value) {
      if (_innerSetScrollLeft) {
        _innerSetScrollLeft = false
      } else {
        if (props.scrollWithAnimation) {
          scrollTo(val, 'x')
        } else {
          main.value!.scrollLeft = val
        }
      }
    }
  }
  function _scrollIntoViewChanged(val: string) {
    if (val) {
      if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(val)) {
        console.error(`id error: scroll-into-view=${val}`)
        return
      }
      let element = rootRef.value!.querySelector('#' + val)
      if (element) {
        let mainRect = main.value!.getBoundingClientRect()
        let elRect = element.getBoundingClientRect()
        if (realScrollX.value) {
          let left = elRect.left - mainRect.left
          let scrollLeft = main.value!.scrollLeft
          let x = scrollLeft + left
          if (props.scrollWithAnimation) {
            scrollTo(x, 'x')
          } else {
            main.value!.scrollLeft = x
          }
        }
        if (realScrollY.value) {
          let top = elRect.top - mainRect.top
          let scrollTop = main.value!.scrollTop
          let y = scrollTop + top
          if (props.scrollWithAnimation) {
            scrollTo(y, 'y')
          } else {
            main.value!.scrollTop = y
          }
        }
      }
    }
  }
  function _transitionEnd(val: number, direction: Direction) {
    content.value!.style.transition = ''
    content.value!.style.webkitTransition = ''
    content.value!.style.transform = ''
    content.value!.style.webkitTransform = ''
    let _main = main.value!
    if (direction === 'x') {
      _main.style.overflowX = realScrollX.value ? 'auto' : 'hidden'
      _main.scrollLeft = val
    } else if (direction === 'y') {
      _main.style.overflowY = realScrollY.value ? 'auto' : 'hidden'
      _main.scrollTop = val
    }
    content.value!.removeEventListener('transitionend', __transitionEnd)
    content.value!.removeEventListener('webkitTransitionEnd', __transitionEnd)
  }
  onMounted(() => {
    nextTick(() => {
      _scrollTopChanged(scrollTopNumber.value)
      _scrollLeftChanged(scrollLeftNumber.value)
    })
    _scrollIntoViewChanged(props.scrollIntoView)
    let __handleScroll = function (event: Event) {
      event.preventDefault()
      event.stopPropagation()
      _handleScroll(event as MouseEvent)
    }
    main.value!.addEventListener('scroll', __handleScroll, passive(false))
    const removeScrollendListener = onScrollend(main.value!, _handleScrollEnd)

    onBeforeUnmount(() => {
      main.value!.removeEventListener('scroll', __handleScroll)
      removeScrollendListener()
    })
  })

  onActivated(() => {
    // 还原 scroll-view 滚动位置
    realScrollY.value && (main.value!.scrollTop = state.lastScrollTop)
    realScrollX.value && (main.value!.scrollLeft = state.lastScrollLeft)
  })

  watch(scrollTopNumber, (val) => {
    _scrollTopChanged(val)
  })
  watch(scrollLeftNumber, (val) => {
    _scrollLeftChanged(val)
  })
  watch(
    () => props.scrollIntoView,
    (val) => {
      _scrollIntoViewChanged(val)
    }
  )
  return {
    realScrollX,
    realScrollY,
    _scrollTopChanged,
    _scrollLeftChanged,
  }
}
