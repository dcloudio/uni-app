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
import { disableScrollBounce, initScrollBounce } from '../../helpers/scroll'
import { UniElement } from '../../helpers/UniElement'
import {
  type CustomEventTrigger,
  type EmitEvent,
  useCustomEvent,
} from '../../helpers/useEvent'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import Refresher from '../refresher'
import type { RefreshState } from '../refresher/types'
type HTMLRef = Ref<HTMLElement | null>
type Props = ExtractPropTypes<typeof props>
type Direction = 'x' | 'y'
interface State {
  lastScrollTop: number
  lastScrollLeft: number
  lastScrollToUpperTime: number
  lastScrollToLowerTime: number
  refresherHeight: number
  refreshState: RefreshState
}

const passiveOptions = /*#__PURE__*/ passive(true)

const props = {
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
    default: 'black',
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

export class UniScrollViewElement extends UniElement {}
export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'ScrollView',
  compatConfig: {
    MODE: 3,
  },
  props,
  emits: [
    'scroll',
    'scrolltoupper',
    'scrolltolower',
    'refresherrefresh',
    'refresherrestore',
    'refresherpulling',
    'refresherabort',
    'update:refresherTriggered',
  ],
  //#if _X_ && !_NODE_JS_
  rootElement: {
    name: 'uni-scroll-view',
    class: UniScrollViewElement,
  },
  //#endif
  setup(props, { emit, slots, expose }) {
    const rootRef: HTMLRef = ref(null)
    const main: HTMLRef = ref(null)
    const wrap: HTMLRef = ref(null)
    const content: HTMLRef = ref(null)

    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    const { state, scrollTopNumber, scrollLeftNumber } =
      useScrollViewState(props)
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

    //#if _X_ && !_NODE_JS_
    onMounted(() => {
      const rootElement = rootRef.value as UniScrollViewElement
      Object.defineProperties(rootElement, {
        scrollHeight: {
          get() {
            return main.value!.scrollHeight
          },
        },
        scrollWidth: {
          get() {
            return main.value!.scrollWidth
          },
        },
        scrollLeft: {
          get() {
            return main.value!.scrollLeft
          },
          set(val) {
            _scrollLeftChanged(val)
          },
        },
        scrollTop: {
          get() {
            return main.value!.scrollTop
          },
          set(val) {
            _scrollTopChanged(val)
          },
        },
        scrollTo: {
          get() {
            return main.value!.scrollBy.bind(main.value!)
          },
        },
        scrollBy: {
          get() {
            return main.value!.scrollBy.bind(main.value!)
          },
        },
      })
      rootElement.attachVmProps(props)
    })
    //#endif

    expose({
      // 自动化测试需要暴露main从而获取scrollLeft
      $getMain() {
        return main.value
      },
    })

    return () => {
      const {
        refresherEnabled,
        refresherBackground,
        refresherDefaultStyle,
        refresherThreshold,
      } = props
      const { refresherHeight, refreshState } = state

      return (
        <uni-scroll-view ref={rootRef}>
          <div ref={wrap} class="uni-scroll-view">
            <div
              ref={main}
              style={mainStyle.value}
              class={scrollBarClassName.value}
            >
              {refresherEnabled ? (
                <Refresher
                  refreshState={refreshState}
                  refresherHeight={refresherHeight}
                  refresherThreshold={refresherThreshold}
                  refresherDefaultStyle={refresherDefaultStyle}
                  refresherBackground={refresherBackground}
                >
                  {refresherDefaultStyle == 'none'
                    ? slots.refresher && slots.refresher()
                    : null}
                </Refresher>
              ) : null}
              <div ref={content} class="uni-scroll-view-content">
                {slots.default && slots.default()}
              </div>
            </div>
          </div>
        </uni-scroll-view>
      )
    }
  },
})

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
    refreshState: '',
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
  let beforeRefreshing: boolean = false
  let toUpperNumber: number = 0 // 容器触顶时，此时鼠标Y轴位置
  let triggerAbort: boolean = false

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
  function _setRefreshState(_state: RefreshState) {
    if (!props.refresherEnabled) return
    switch (_state) {
      case 'refreshing':
        state.refresherHeight = props.refresherThreshold
        // 之前是刷新状态则不再触发刷新
        if (!beforeRefreshing) {
          beforeRefreshing = true
          trigger('refresherpulling', {} as Event, {
            deltaY: state.refresherHeight,
            dy: state.refresherHeight,
          })
          trigger('refresherrefresh', {} as Event, {
            dy: touchEnd.y - touchStart.y,
          })
          emit('update:refresherTriggered', true)
        }
        break
      case 'restore':
      case 'refresherabort':
        beforeRefreshing = false
        state.refresherHeight = toUpperNumber = 0
        if (_state === 'restore') {
          triggerAbort = false
          trigger('refresherrestore', {} as Event, {
            dy: touchEnd.y - touchStart.y,
          })
        }
        if (_state === 'refresherabort' && triggerAbort) {
          triggerAbort = false
          trigger('refresherabort', {} as Event, {
            dy: touchEnd.y - touchStart.y,
          })
        }
        break
    }
    state.refreshState = _state
  }
  type touchPoint = {
    x: number
    y: number
  }
  let touchStart: touchPoint = {
    x: 0,
    y: 0,
  }
  let touchEnd: touchPoint = {
    x: 0,
    y: props.refresherThreshold,
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
    let needStop: boolean | null = null

    let __handleTouchMove = function (event: TouchEvent) {
      if (touchStart === null) return

      let x = event.touches[0].pageX
      let y = event.touches[0].pageY
      let _main = main.value!

      if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) {
        // 横向滑动
        if (realScrollX.value) {
          if (_main.scrollLeft === 0 && x > touchStart.x) {
            needStop = false
            return
          } else if (
            _main.scrollWidth === _main.offsetWidth + _main.scrollLeft &&
            x < touchStart.x
          ) {
            needStop = false
            return
          }
          needStop = true
        } else {
          needStop = false
        }
      } else {
        // 纵向滑动
        if (realScrollY.value) {
          if (_main.scrollTop === 0 && y > touchStart.y) {
            needStop = false
            // 刷新时，阻止页面滚动
            if (props.refresherEnabled && event.cancelable !== false)
              event.preventDefault()
          } else if (
            _main.scrollHeight === _main.offsetHeight + _main.scrollTop &&
            y < touchStart.y
          ) {
            needStop = false
            return
          } else {
            needStop = true
          }
        } else {
          needStop = false
        }
      }

      if (needStop) {
        event.stopPropagation()
      }

      if (_main.scrollTop === 0 && event.touches.length === 1) {
        // 如果容器滑动到达顶端，则进入下拉状态
        _setRefreshState('pulling')
      }

      if (props.refresherEnabled && state.refreshState === 'pulling') {
        const dy = y - touchStart.y

        if (toUpperNumber === 0) {
          toUpperNumber = y
        }

        if (!beforeRefreshing) {
          state.refresherHeight = y - toUpperNumber
          // 之前为刷新状态则不再触发pulling
          if (state.refresherHeight > 0) {
            triggerAbort = true
            trigger('refresherpulling', event, {
              deltaY: dy,
              dy,
            })
          }
        } else {
          state.refresherHeight = dy + props.refresherThreshold
          // 如果之前在刷新状态，则不触发刷新中断
          triggerAbort = false
        }
      }
    }
    let __handleTouchStart = function (event: TouchEvent) {
      if (event.touches.length === 1) {
        disableScrollBounce({
          disable: true,
        })
        touchStart = {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY,
        }
      }
    }
    let __handleTouchEnd = function (event: TouchEvent) {
      touchEnd = {
        x: event.changedTouches[0].pageX,
        y: event.changedTouches[0].pageY,
      }
      disableScrollBounce({
        disable: false,
      })
      if (state.refresherHeight >= props.refresherThreshold) {
        _setRefreshState('refreshing')
      } else {
        _setRefreshState('refresherabort')
      }
      touchStart = {
        x: 0,
        y: 0,
      }
      touchEnd = {
        x: 0,
        y: props.refresherThreshold,
      }
    }
    main.value!.addEventListener(
      'touchstart',
      __handleTouchStart,
      passiveOptions
    )
    main.value!.addEventListener('touchmove', __handleTouchMove, passive(false))
    main.value!.addEventListener('scroll', __handleScroll, passive(false))
    main.value!.addEventListener('touchend', __handleTouchEnd, passiveOptions)
    initScrollBounce()

    onBeforeUnmount(() => {
      main.value!.removeEventListener('touchstart', __handleTouchStart)
      main.value!.removeEventListener('touchmove', __handleTouchMove)
      main.value!.removeEventListener('scroll', __handleScroll)
      main.value!.removeEventListener('touchend', __handleTouchEnd)
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
  watch(
    () => props.refresherTriggered,
    (val) => {
      // TODO
      if (val === true) {
        _setRefreshState('refreshing')
      } else if (val === false) {
        _setRefreshState('restore')
      }
    }
  )

  return {
    realScrollX,
    realScrollY,
    _scrollTopChanged,
    _scrollLeftChanged,
  }
}
