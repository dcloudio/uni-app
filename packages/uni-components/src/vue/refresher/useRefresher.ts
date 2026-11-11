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

// 与 Refresher 的 height 0.3s 回弹保持一致。
const REFRESHER_RESTORE_DURATION = 300
const passiveOptions = /*#__PURE__*/ passive(true)

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
  pullStartY: number
  /**
   * 本次触摸的处理方，独立于刷新状态：
   * undecided：等待首个有效 touchmove 判断方向。
   * browser：交给浏览器处理，允许原生滚动，但不代表已发生滚动。
   * refresher：由组件处理自定义下拉，需要阻止原生滚动。
   */
  handledBy: 'undecided' | 'browser' | 'refresher'
}

/**
 * scroll-view / list-view 共用的刷新状态机与 touch 生命周期。
 *
 * 刷新状态与触摸处理方分开维护：首个有效移动决定交给浏览器还是自定义下拉。
 * 原生滚动开始后，后续 touchmove 通常已不可取消；即使再次触顶，也不能在
 * 本次触摸中切入 Pulling。交给原生后必须等下一次 touchstart 才重新判断。
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
        // 仍持有自定义手势时，从当前位置重新计算距离；不会重新接管原生手势。
        if (touch) touch.pullStartY = touch.y
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

  function handleRefresherTouchMove(event: TouchEvent, dx: number, dy: number) {
    const gesture = touch!
    if (gesture.handledBy === 'undecided') {
      if (dx === 0 && dy === 0) return false
      if (
        Math.abs(dx) > Math.abs(dy) ||
        scrollElement.value!.scrollTop > 0 ||
        (state.refreshState === RefreshStateEnum.Idle && dy < 0)
      ) {
        gesture.handledBy = 'browser'
        return false
      }
      gesture.handledBy = 'refresher'
    }
    if (gesture.handledBy !== 'refresher') return false

    if (state.refreshState === RefreshStateEnum.Refresh && dy < 0) {
      // 特例：Refresh -> Restore 必须在 preventDefault() 之前判断。
      // 本次上滑只结束刷新并放行原生滚动，无需等 touchend 就可继续滚动列表。
      // 后续即使恢复到 Idle、反向移动并再次触顶，也不能重新抢占本次手势。
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
      if (gesture.y <= gesture.pullStartY) {
        gesture.pullStartY = gesture.y
      } else {
        setRefreshState(RefreshStateEnum.Pulling, event, dy)
      }
    }

    if (state.refreshState === RefreshStateEnum.Pulling) {
      state.refresherHeight = Math.max(0, gesture.y - gesture.pullStartY)
      if (state.refresherHeight > 0) {
        trigger('refresherpulling', event, { deltaY: dy, dy })
      }
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

    if (
      gesture.handledBy === 'refresher' &&
      state.refreshState === RefreshStateEnum.Pulling
    ) {
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
    touch = {
      identifier: point.identifier,
      startX: point.pageX,
      startY: point.pageY,
      y: point.pageY,
      pullStartY: point.pageY,
      // 仅从顶部开始的纵向手势有资格下拉，不能滚动到顶部后再尝试接管。
      handledBy:
        props.refresherEnabled &&
        isVertical.value &&
        scrollElement.value!.scrollTop <= 0
          ? 'undecided'
          : 'browser',
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
    touch.y = point.pageY
    if (!handleRefresherTouchMove(event, dx, dy)) {
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
        if (touch) touch.handledBy = 'browser'
      }
    }
  )
}
