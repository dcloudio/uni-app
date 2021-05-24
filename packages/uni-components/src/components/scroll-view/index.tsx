import {
  Ref,
  ref,
  ExtractPropTypes,
  computed,
  reactive,
  onMounted,
  onBeforeUnmount,
  onActivated,
  watch,
} from 'vue'
import { passive } from '@dcloudio/uni-shared'
import { initScrollBounce, disableScrollBounce } from '../../helpers/scroll'
import {
  useCustomEvent,
  CustomEventTrigger,
  EmitEvent,
} from '../../helpers/useEvent'
import { defineBuiltInComponent } from '@dcloudio/uni-components'

type HTMLRef = Ref<HTMLElement | null>
type Props = ExtractPropTypes<typeof props>
type RefreshState = 'refreshing' | 'restore' | 'pulling' | ''
interface State {
  lastScrollTop: number
  lastScrollLeft: number
  lastScrollToUpperTime: number
  lastScrollToLowerTime: number
  refresherHeight: number
  refreshRotate: number
  refreshState: RefreshState
}

const passiveOptions = passive(true)

const props = {
  scrollX: {
    type: [Boolean, String],
    default: false,
  },
  scrollY: {
    type: [Boolean, String],
    default: false,
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
    default: 'back',
  },
  refresherBackground: {
    type: String,
    default: '#fff',
  },
  refresherTriggered: {
    type: [Boolean, String],
    default: false,
  },
}

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'ScrollView',
  compatConfig: {
    MODE: 3,
  },
  props,
  emits: ['scroll', 'scrolltoupper', 'scrolltolower', 'refresherabort'],
  setup(props, { emit, slots }) {
    const rootRef: HTMLRef = ref(null)
    const main: HTMLRef = ref(null)
    const wrap: HTMLRef = ref(null)
    const content: HTMLRef = ref(null)
    const refresherinner: HTMLRef = ref(null)

    const trigger = useCustomEvent<EmitEvent<typeof emit>>(rootRef, emit)

    const { state, scrollTopNumber, scrollLeftNumber } =
      useScrollViewState(props)
    useScrollViewLoader(
      props,
      state,
      scrollTopNumber,
      scrollLeftNumber,
      trigger,
      rootRef,
      main,
      content
    )

    const mainStyle = computed(() => {
      let style = ''
      props.scrollX
        ? (style += 'overflow-x:auto;')
        : (style += 'overflow-x:hidden;')
      props.scrollY
        ? (style += 'overflow-y:auto;')
        : (style += 'overflow-y:hidden;')
      return style
    })

    return () => {
      const { refresherEnabled, refresherBackground, refresherDefaultStyle } =
        props
      const { refresherHeight, refreshState, refreshRotate } = state

      return (
        <uni-scroll-view ref={rootRef}>
          <div ref={wrap} class="uni-scroll-view">
            <div ref={main} style={mainStyle.value} class="uni-scroll-view">
              <div ref={content} class="uni-scroll-view-content">
                {refresherEnabled ? (
                  <div
                    ref={refresherinner}
                    style={{
                      backgroundColor: refresherBackground,
                      height: refresherHeight + 'px',
                    }}
                    class="uni-scroll-view-refresher"
                  >
                    {refresherDefaultStyle !== 'none' ? (
                      <div class="uni-scroll-view-refresh">
                        <div class="uni-scroll-view-refresh-inner">
                          {refreshState == 'pulling' ? (
                            <svg
                              style={{
                                transform: 'rotate(' + refreshRotate + 'deg)',
                              }}
                              fill="#2BD009"
                              class="uni-scroll-view-refresh__icon"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                              <path d="M0 0h24v24H0z" fill="none" />
                            </svg>
                          ) : null}
                          {refreshState == 'refreshing' ? (
                            <svg
                              class="uni-scroll-view-refresh__spinner"
                              width="24"
                              height="24"
                              viewBox="25 25 50 50"
                            >
                              <circle
                                cx="50"
                                cy="50"
                                r="20"
                                fill="none"
                                style="color: #2bd009"
                                stroke-width="3"
                              />
                            </svg>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                    {refresherDefaultStyle == 'none'
                      ? slots.refresher && slots.refresher()
                      : null}
                  </div>
                ) : null}
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
    refreshRotate: 0,
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
  content: HTMLRef
) {
  let _lastScrollTime = 0
  let _innerSetScrollTop = false
  let _innerSetScrollLeft = false
  let __transitionEnd = () => {}
  const upperThresholdNumber = computed(() => {
    var val = Number(props.upperThreshold)
    return isNaN(val) ? 50 : val
  })
  const lowerThresholdNumber = computed(() => {
    var val = Number(props.lowerThreshold)
    return isNaN(val) ? 50 : val
  })

  function scrollTo(t: number, n: 'x' | 'y') {
    var i = main.value!
    t < 0
      ? (t = 0)
      : n === 'x' && t > i.scrollWidth - i.offsetWidth
      ? (t = i.scrollWidth - i.offsetWidth)
      : n === 'y' &&
        t > i.scrollHeight - i.offsetHeight &&
        (t = i.scrollHeight - i.offsetHeight)
    var r = 0
    var o = ''
    n === 'x' ? (r = i.scrollLeft - t) : n === 'y' && (r = i.scrollTop - t)
    if (r !== 0) {
      content.value!.style.transition = 'transform .3s ease-out'
      content.value!.style.webkitTransition = '-webkit-transform .3s ease-out'
      if (n === 'x') {
        o = 'translateX(' + r + 'px) translateZ(0)'
      } else {
        n === 'y' && (o = 'translateY(' + r + 'px) translateZ(0)')
      }
      content.value!.removeEventListener('transitionend', __transitionEnd)
      content.value!.removeEventListener('webkitTransitionEnd', __transitionEnd)
      __transitionEnd = () => _transitionEnd(t, n)
      content.value!.addEventListener('transitionend', __transitionEnd)
      content.value!.addEventListener('webkitTransitionEnd', __transitionEnd)
      if (n === 'x') {
        // if (e !== 'ios') {
        i.style.overflowX = 'hidden'
        // }
      } else if (n === 'y') {
        i.style.overflowY = 'hidden'
      }

      content.value!.style.transform = o
      content.value!.style.webkitTransform = o
    }
  }
  function _handleScroll($event: MouseEvent) {
    if ($event.timeStamp - _lastScrollTime > 20) {
      _lastScrollTime = $event.timeStamp
      const target = $event.target as HTMLElement
      trigger('scroll', $event, {
        scrollLeft: target.scrollLeft,
        scrollTop: target.scrollTop,
        scrollHeight: target.scrollHeight,
        scrollWidth: target.scrollWidth,
        deltaX: state.lastScrollLeft - target.scrollLeft,
        deltaY: state.lastScrollTop - target.scrollTop,
      })
      if (props.scrollY) {
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
      if (props.scrollX) {
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
  }
  function _scrollTopChanged(val: number) {
    if (props.scrollY) {
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
    if (props.scrollX) {
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
      var element = rootRef.value!.querySelector('#' + val)
      if (element) {
        var mainRect = main.value!.getBoundingClientRect()
        var elRect = element.getBoundingClientRect()
        if (props.scrollX) {
          var left = elRect.left - mainRect.left
          var scrollLeft = main.value!.scrollLeft
          var x = scrollLeft + left
          if (props.scrollWithAnimation) {
            scrollTo(x, 'x')
          } else {
            main.value!.scrollLeft = x
          }
        }
        if (props.scrollY) {
          var top = elRect.top - mainRect.top
          var scrollTop = main.value!.scrollTop
          var y = scrollTop + top
          if (props.scrollWithAnimation) {
            scrollTo(y, 'y')
          } else {
            main.value!.scrollTop = y
          }
        }
      }
    }
  }
  function _transitionEnd(val: number, type: 'x' | 'y') {
    content.value!.style.transition = ''
    content.value!.style.webkitTransition = ''
    content.value!.style.transform = ''
    content.value!.style.webkitTransform = ''
    let _main = main.value!
    if (type === 'x') {
      _main.style.overflowX = props.scrollX ? 'auto' : 'hidden'
      _main.scrollLeft = val
    } else if (type === 'y') {
      _main.style.overflowY = props.scrollY ? 'auto' : 'hidden'
      _main.scrollTop = val
    }
    content.value!.removeEventListener('transitionend', __transitionEnd)
    content.value!.removeEventListener('webkitTransitionEnd', __transitionEnd)
  }
  function _setRefreshState(_state: RefreshState) {
    switch (_state) {
      case 'refreshing':
        state.refresherHeight = props.refresherThreshold
        trigger('refresherrefresh', {} as Event, {})
        break
      case 'restore':
        state.refresherHeight = 0
        trigger('refresherrestore', {} as Event, {})
        break
    }
    state.refreshState = _state
  }
  /* function getScrollPosition() {
    const _main = main.value!
    return {
      scrollLeft: _main.scrollLeft,
      scrollTop: _main.scrollTop,
      scrollHeight: _main.scrollHeight,
      scrollWidth: _main.scrollWidth,
    }
  } */

  onMounted(() => {
    _scrollTopChanged(scrollTopNumber.value)
    _scrollLeftChanged(scrollLeftNumber.value)
    _scrollIntoViewChanged(props.scrollIntoView)
    let __handleScroll = function (event: Event) {
      // Unable to preventDefault inside passive event listener invocation.
      // event.preventDefault();
      event.stopPropagation()
      _handleScroll(event as MouseEvent)
    }
    let touchStart: {
      x: number
      y: number
    } = {
      x: 0,
      y: 0,
    }
    let needStop: boolean | null = null
    let __handleTouchMove = function (_event: Event) {
      const event = _event as TouchEvent
      var x = event.touches[0].pageX
      var y = event.touches[0].pageY
      var _main = main.value!
      if (needStop === null) {
        if (Math.abs(x - touchStart.x) > Math.abs(y - touchStart.y)) {
          // 横向滑动
          if (self.scrollX) {
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
          if (self.scrollY) {
            if (_main.scrollTop === 0 && y > touchStart.y) {
              needStop = false
              return
            } else if (
              _main.scrollHeight === _main.offsetHeight + _main.scrollTop &&
              y < touchStart.y
            ) {
              needStop = false
              return
            }
            needStop = true
          } else {
            needStop = false
          }
        }
      }
      if (needStop) {
        event.stopPropagation()
      }

      if (props.refresherEnabled && state.refreshState === 'pulling') {
        const dy = y - touchStart.y
        state.refresherHeight = dy

        let rotate = dy / props.refresherThreshold
        if (rotate > 1) {
          rotate = 1
        } else {
          rotate = rotate * 360
        }
        state.refreshRotate = rotate

        trigger('refresherpulling', event, {
          deltaY: dy,
        })
      }
    }
    let __handleTouchStart = function (_event: Event) {
      const event = _event as TouchEvent
      if (event.touches.length === 1) {
        disableScrollBounce({
          disable: true,
        })
        needStop = null
        touchStart = {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY,
        }
        if (
          props.refresherEnabled &&
          state.refreshState !== 'refreshing' &&
          main.value!.scrollTop === 0
        ) {
          state.refreshState = 'pulling'
        }
      }
    }
    let __handleTouchEnd = function (_event: Event) {
      const event = _event as TouchEvent
      touchStart = {
        x: 0,
        y: 0,
      }
      disableScrollBounce({
        disable: false,
      })
      if (state.refresherHeight >= props.refresherThreshold) {
        _setRefreshState('refreshing')
      } else {
        state.refresherHeight = 0
        trigger('refresherabort', event, {})
      }
    }
    main.value!.addEventListener(
      'touchstart',
      __handleTouchStart,
      passiveOptions
    )
    main.value!.addEventListener('touchmove', __handleTouchMove, passiveOptions)
    main.value!.addEventListener('scroll', __handleScroll, passiveOptions)
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
    props.scrollY && (main.value!.scrollTop = state.lastScrollTop)
    props.scrollX && (main.value!.scrollLeft = state.lastScrollLeft)
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
}
