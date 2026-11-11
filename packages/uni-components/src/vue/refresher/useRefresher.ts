import {
  type Ref,
  type SetupContext,
  onBeforeUnmount,
  onMounted,
  watch,
} from 'vue'
import { passive } from '@dcloudio/uni-shared'
import { disableScrollBounce, initScrollBounce } from '../../helpers/scroll'
import type { CustomEventTrigger } from '../../helpers/useEvent'
import { RefreshStateEnum, type RefresherState } from './types'

/**
 * 下拉刷新卡顿的情况说明
 * 卡顿具体场景是一次下拉过程中先触发滚动再触发下拉刷新，
 * 不管下拉刷新是做高度动画还是transform动画都一样，哪怕把下拉刷新去了只让滚动内容transform都会卡，
 * 这个问题在chrome 131版本存在，升级到156版本就不卡了。
 * 要维持现有的表现的话，卡顿的问题尝试了很多方案都没法修复。
 * 如果可以接受下拉刷新不和滚动连在一起的话，这个倒是能解决，
 * 表现为用户在scrollTop大于0的位置持续下拉只能拉到scrollTop等于0，松手之后再次下拉才能触发下拉刷新。
 * 当前微信开发者工具最新稳定版的webview是136版本，所以它在这个场景下也卡
 *
 * 上述chrome版本差异由UnthrottleAsyncTouchMoves差异引发，此特性调整于chrome 150版本
 * 相关chromium仓库提交: https://chromium.googlesource.com/chromium/src/testing/+/4f6ac4d2e261cbe4421b6b3b082815bcf7ca2bdb
 */

// 与 Refresher 的 height 0.3s 回弹保持一致。
const REFRESHER_RESTORE_DURATION = 300
const passiveOptions = /*#__PURE__*/ passive(true)
// Chrome < 150 中原生滚动衔接下拉刷新会卡顿，需松手后重新下拉。
const chromeVersion = __NODE_JS__
  ? null
  : navigator.userAgent.match(/Chrome\/(\d+)/)
const canPullAfterScroll = !chromeVersion || Number(chromeVersion[1]) >= 150

interface RefresherProps {
  refresherEnabled: boolean | string
  refresherThreshold: number
  refresherTriggered: boolean | string
}

interface RefresherOptions {
  props: RefresherProps
  state: RefresherState
  scrollElement: Ref<HTMLElement | null>
  isVertical: Ref<boolean | string>
  trigger: CustomEventTrigger
  emit: SetupContext['emit']
  // 仅对交给原生的手势调用，由各容器决定是否阻止事件向外传播。
  onNativeTouchMove: (event: TouchEvent, dx: number, dy: number) => void
}

interface TouchGesture {
  identifier: number
  startX: number
  startY: number
  y: number
  // 原生滚动尚未触顶时不记录下拉起点，避免把滚动距离计入刷新高度。
  pullStartY: number | null
  // 水平手势或禁用刷新后，本次触摸不再参与下拉检测。
  canPull: boolean
  /**
   * 本次触摸的处理方，独立于刷新状态：
   * undecided：等待首个有效 touchmove 判断方向。
   * browser：浏览器处理滚动；到顶后可观察下拉距离，但不再阻止默认行为。
   * refresher：由组件处理自定义下拉，需要阻止原生滚动。
   */
  handledBy: 'undecided' | 'browser' | 'refresher'
}

/**
 * scroll-view / list-view 共用的刷新状态机与 touch 生命周期。
 *
 * 刷新状态与触摸处理方分开维护：首个有效移动决定交给浏览器还是自定义下拉。
 * 原生滚动开始后，后续 touchmove 通常已不可取消。Chrome 150 以下必须等
 * 下一次触摸才能下拉刷新；其他环境中，browser 手势到顶时重新记录下拉起点，
 * 随后只观察 touchmove 更新刷新高度，不尝试通过 preventDefault() 接管滚动。
 */
export function useRefresher({
  props,
  state,
  scrollElement,
  isVertical,
  trigger,
  emit,
  onNativeTouchMove,
}: RefresherOptions) {
  let touch: TouchGesture | null = null
  let refreshResetTimer: ReturnType<typeof setTimeout> | undefined

  function clearRefreshResetTimer() {
    clearTimeout(refreshResetTimer)
    refreshResetTimer = undefined
  }

  function setRefreshState(
    nextState: RefreshStateEnum,
    event: Event = {} as Event,
    dy = touch ? touch.y - touch.startY : 0
  ) {
    if (state.refreshState === nextState) return
    clearRefreshResetTimer()
    state.refreshState = nextState

    switch (nextState) {
      case RefreshStateEnum.Idle:
        state.refresherHeight = 0
        if (touch) {
          touch.pullStartY =
            scrollElement.value!.scrollTop <= 0 ? touch.y : null
        }
        break
      case RefreshStateEnum.Refresh:
        state.refresherHeight = props.refresherThreshold
        trigger('refresherrefresh', event, { dy })
        emit('update:refresherTriggered', true)
        break
      case RefreshStateEnum.Restore:
      case RefreshStateEnum.Abort:
        state.refresherHeight = 0
        refreshResetTimer = setTimeout(() => {
          setRefreshState(RefreshStateEnum.Idle)
        }, REFRESHER_RESTORE_DURATION)
        if (nextState === RefreshStateEnum.Restore) {
          emit('update:refresherTriggered', false)
          trigger('refresherrestore', event, { dy })
        } else {
          trigger('refresherabort', event, { dy })
        }
        break
    }
  }

  function updatePulling(event: TouchEvent, dy: number) {
    const gesture = touch!
    if (gesture.pullStartY === null) return
    state.refresherHeight = Math.max(0, gesture.y - gesture.pullStartY)
    if (state.refresherHeight > 0) {
      trigger('refresherpulling', event, { deltaY: dy, dy })
    }
  }

  function handleBrowserPulling(event: TouchEvent, dy: number, stepY: number) {
    const gesture = touch!
    if (
      !canPullAfterScroll ||
      !gesture.canPull ||
      !props.refresherEnabled ||
      !isVertical.value ||
      (state.refreshState !== RefreshStateEnum.Idle &&
        state.refreshState !== RefreshStateEnum.Pulling)
    ) {
      return
    }
    if (scrollElement.value!.scrollTop > 0) {
      gesture.pullStartY = null
      if (state.refreshState === RefreshStateEnum.Pulling) {
        state.refresherHeight = 0
      }
      return
    }
    if (gesture.pullStartY === null) {
      // 首次确认触顶时只建立起点，后续移动才计入下拉距离。
      gesture.pullStartY = gesture.y
      return
    }
    if (state.refreshState === RefreshStateEnum.Idle) {
      if (stepY <= 0 || gesture.y <= gesture.pullStartY) {
        gesture.pullStartY = gesture.y
        return
      }
      setRefreshState(RefreshStateEnum.Pulling, event, dy)
    }
    // 浏览器始终负责滚动，包括 cancelable=false 的事件；这里只更新刷新区。
    updatePulling(event, dy)
  }

  function handleRefresherTouchMove(
    event: TouchEvent,
    dx: number,
    dy: number,
    stepY: number
  ) {
    const gesture = touch!
    if (gesture.handledBy === 'undecided') {
      if (dx === 0 && dy === 0) return false
      if (
        Math.abs(dx) > Math.abs(dy) ||
        scrollElement.value!.scrollTop > 0 ||
        gesture.pullStartY === null ||
        (state.refreshState === RefreshStateEnum.Idle && dy < 0)
      ) {
        if (Math.abs(dx) > Math.abs(dy)) gesture.canPull = false
        gesture.handledBy = 'browser'
      } else {
        gesture.handledBy = 'refresher'
      }
    }
    if (gesture.handledBy === 'browser') {
      handleBrowserPulling(event, dy, stepY)
      return false
    }

    if (state.refreshState === RefreshStateEnum.Refresh && dy < 0) {
      // 特例：Refresh -> Restore 必须在 preventDefault() 之前判断。
      // 本次上滑只结束刷新并放行原生滚动，无需等 touchend 就可继续滚动列表。
      // 恢复到 Idle 后若反向触顶，可以观察下拉，但仍不能重新阻止原生滚动。
      // 注意：若本次触摸更早已经被 preventDefault() 阻止，之后放行并不能
      // 保证恢复原生滚动；只有从 Refresh 直接上滑、此前未被阻止时才可延续。
      gesture.handledBy = 'browser'
      setRefreshState(RefreshStateEnum.Restore, event, dy)
      return false
    }
    if (event.cancelable === false) {
      gesture.handledBy = 'browser'
      if (state.refreshState === RefreshStateEnum.Pulling) {
        setRefreshState(RefreshStateEnum.Abort, event, dy)
      }
      return false
    }

    // 只有自定义下拉持有手势时阻止滚动；上面的 Restore 分支始终放行。
    event.preventDefault()
    if (state.refreshState === RefreshStateEnum.Idle) {
      if (gesture.pullStartY === null || gesture.y <= gesture.pullStartY) {
        gesture.pullStartY = gesture.y
      } else {
        setRefreshState(RefreshStateEnum.Pulling, event, dy)
      }
    }

    if (state.refreshState === RefreshStateEnum.Pulling) {
      updatePulling(event, dy)
    }
    return true
  }

  function finishTouch(event: TouchEvent, cancelled: boolean) {
    if (!touch) return
    const gesture = touch
    const point = Array.from(event.changedTouches).find(
      (point) => point.identifier === gesture.identifier
    )
    if (!point && !cancelled) return
    touch = null
    disableScrollBounce({ disable: false })

    if (state.refreshState === RefreshStateEnum.Pulling) {
      // touchcancel / 多指中断只能 Abort，超过阈值也不能误触发 Refresh。
      setRefreshState(
        !cancelled && state.refresherHeight >= props.refresherThreshold
          ? RefreshStateEnum.Refresh
          : RefreshStateEnum.Abort,
        event,
        (point ? point.pageY : gesture.y) - gesture.startY
      )
    }
  }

  function handleTouchStart(event: TouchEvent) {
    if (touch) finishTouch(event, true)
    if (event.touches.length !== 1) return
    const point = event.touches[0]
    const canPull = !!(props.refresherEnabled && isVertical.value)
    touch = {
      identifier: point.identifier,
      startX: point.pageX,
      startY: point.pageY,
      y: point.pageY,
      pullStartY: scrollElement.value!.scrollTop <= 0 ? point.pageY : null,
      canPull,
      handledBy: canPull ? 'undecided' : 'browser',
    }
    disableScrollBounce({ disable: true })
  }

  function handleTouchMove(event: TouchEvent) {
    if (!touch) return
    if (
      event.touches.length !== 1 ||
      event.touches[0].identifier !== touch.identifier
    ) {
      finishTouch(event, true)
      return
    }
    const point = event.touches[0]
    const dx = point.pageX - touch.startX
    const dy = point.pageY - touch.startY
    const stepY = point.pageY - touch.y
    touch.y = point.pageY
    if (!handleRefresherTouchMove(event, dx, dy, stepY)) {
      onNativeTouchMove(event, dx, dy)
    }
  }

  function handleTouchEnd(event: TouchEvent) {
    finishTouch(event, false)
  }

  function handleTouchCancel(event: TouchEvent) {
    finishTouch(event, true)
  }

  let removeListeners: (() => void) | undefined
  onMounted(() => {
    const element = scrollElement.value!
    element.addEventListener('touchstart', handleTouchStart, passiveOptions)
    element.addEventListener('touchmove', handleTouchMove, passive(false))
    element.addEventListener('touchend', handleTouchEnd, passiveOptions)
    element.addEventListener('touchcancel', handleTouchCancel, passiveOptions)
    removeListeners = () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      element.removeEventListener('touchcancel', handleTouchCancel)
    }
    initScrollBounce()
  })

  onBeforeUnmount(() => {
    clearRefreshResetTimer()
    if (touch) disableScrollBounce({ disable: false })
    touch = null
    removeListeners?.()
  })

  watch(
    () => props.refresherTriggered,
    (val) => {
      if (!props.refresherEnabled) return
      if (val === true) {
        setRefreshState(RefreshStateEnum.Refresh)
      } else if (val === false) {
        if (state.refreshState === RefreshStateEnum.Refresh) {
          setRefreshState(RefreshStateEnum.Restore)
        } else if (state.refreshState === RefreshStateEnum.Pulling) {
          setRefreshState(RefreshStateEnum.Abort)
        }
      }
    }
  )
  watch(
    () => props.refresherEnabled,
    (enabled) => {
      if (!enabled) {
        setRefreshState(RefreshStateEnum.Idle)
        if (touch) {
          touch.handledBy = 'browser'
          touch.canPull = false
        }
      }
    }
  )
}
