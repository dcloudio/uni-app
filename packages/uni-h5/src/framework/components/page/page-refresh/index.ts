import { onMounted, Ref } from 'vue'
import { usePageMeta } from '../../../plugin/provide'

function processDeltaY(
  ev: TouchEvent,
  identifier: number | null,
  startY: number
) {
  const touch = Array.prototype.slice
    .call(ev.changedTouches)
    .filter((touch) => touch.identifier === identifier)[0]
  if (!touch) {
    return false
  }
  ;(ev as any).deltaY = touch.pageY - startY
  return true
}

// const ratio = 2.2

const PULLING = 'pulling'
const REACHED = 'reached'

const ABORTING = 'aborting'
const REFRESHING = 'refreshing'
const RESTORING = 'restoring'

export function usePageRefresh(refreshRef: Ref) {
  const { id, refreshOptions } = usePageMeta()
  const { range, height } = refreshOptions!
  let refreshContainerElem: HTMLDivElement
  let refreshControllerElem: HTMLDivElement
  let refreshControllerElemStyle: CSSStyleDeclaration
  let refreshInnerElemStyle: CSSStyleDeclaration
  onMounted(() => {
    refreshContainerElem = refreshRef.value.$el
    refreshControllerElem = refreshContainerElem.querySelector(
      '.uni-page-refresh'
    )!
    refreshControllerElemStyle = refreshControllerElem.style
    refreshInnerElemStyle = (refreshControllerElem.querySelector(
      '.uni-page-refresh-inner'
    ) as HTMLDivElement).style

    UniServiceJSBridge.on(id + '.startPullDownRefresh', () => {
      if (!state) {
        state = REFRESHING
        addClass()
        setTimeout(() => {
          refreshing()
        }, 50)
      }
    })

    UniServiceJSBridge.on(id + '.stopPullDownRefresh', () => {
      if (state === REFRESHING) {
        removeClass()
        state = RESTORING
        addClass()

        restoring(() => {
          removeClass()
          state = distance = offset = null
        })
      }
    })
  })
  let touchId: number | null
  let startY: number
  let canRefresh: boolean
  let state:
    | typeof PULLING
    | typeof REACHED
    | typeof ABORTING
    | typeof REFRESHING
    | typeof RESTORING
    | null

  let distance: number | null
  let offset: number | null

  function toggleClass(type: 'add' | 'remove') {
    if (!state) {
      return
    }
    if (refreshContainerElem) {
      refreshContainerElem.classList[type]('uni-page-refresh--' + state)
    }
  }
  function addClass() {
    toggleClass('add')
  }
  function removeClass() {
    toggleClass('remove')
  }
  function pulling(deltaY: number) {
    if (!refreshControllerElem) {
      return
    }

    let rotate = deltaY / range

    if (rotate > 1) {
      rotate = 1
    } else {
      rotate = rotate * rotate * rotate
    }

    const y = Math.round(deltaY / (range / height)) || 0

    refreshInnerElemStyle.transform = 'rotate(' + 360 * rotate + 'deg)'
    refreshControllerElemStyle.clip = 'rect(' + (45 - y) + 'px,45px,45px,-5px)'
    refreshControllerElemStyle.transform = 'translate3d(-50%, ' + y + 'px, 0)'
  }

  function onTouchstart(ev: TouchEvent) {
    const touch = ev.changedTouches[0]
    touchId = touch.identifier
    startY = touch.pageY
    if ([ABORTING, REFRESHING, RESTORING].indexOf(state!) >= 0) {
      canRefresh = false
    } else {
      canRefresh = true
    }
  }

  function onTouchmove(ev: TouchEvent) {
    if (!canRefresh) {
      return
    }
    if (!processDeltaY(ev, touchId, startY)) {
      return
    }
    let { deltaY } = ev as any
    if ((document.documentElement.scrollTop || document.body.scrollTop) !== 0) {
      touchId = null
      return
    }

    if (deltaY < 0 && !state) {
      return
    }

    if (ev.cancelable) {
      ev.preventDefault()
    }

    if (distance === null) {
      offset = deltaY
      state = PULLING
      addClass()
    }

    deltaY = deltaY - offset!

    if (deltaY < 0) {
      deltaY = 0
    }

    distance = deltaY

    const isReached = deltaY >= range && state !== REACHED
    const isPulling = deltaY < range && state !== PULLING

    if (isReached || isPulling) {
      removeClass()
      state = state === REACHED ? PULLING : REACHED
      addClass()
    }

    pulling(deltaY!)
  }

  function onTouchend(ev: TouchEvent) {
    if (!processDeltaY(ev, touchId, startY)) {
      return
    }
    if (state === null) {
      return
    }
    if (state === PULLING) {
      removeClass()
      state = ABORTING
      addClass()
      aborting(() => {
        removeClass()
        state = distance = offset = null
      })
    } else if (state === REACHED) {
      removeClass()
      state = REFRESHING
      addClass()
      refreshing()
    }
  }

  function aborting(callback: Function) {
    if (!refreshControllerElem) {
      return
    }

    if (refreshControllerElemStyle.transform) {
      refreshControllerElemStyle.transition = '-webkit-transform 0.3s'
      refreshControllerElemStyle.transform = 'translate3d(-50%, 0, 0)'
      const abortTransitionEnd = function () {
        timeout && clearTimeout(timeout)
        refreshControllerElem.removeEventListener(
          'webkitTransitionEnd',
          abortTransitionEnd
        )
        refreshControllerElemStyle.transition = ''
        callback()
      }
      refreshControllerElem.addEventListener(
        'webkitTransitionEnd',
        abortTransitionEnd
      )
      const timeout = setTimeout(abortTransitionEnd, 350) // 部分手机，部分情况webkitTransitionEnd不触发
    } else {
      callback()
    }
  }

  function refreshing() {
    if (refreshControllerElem) {
      return
    }
    refreshControllerElemStyle.transition = '-webkit-transform 0.2s'
    refreshControllerElemStyle.transform =
      'translate3d(-50%, ' + height + 'px, 0)'
    // Service 执行 refresh
    UniServiceJSBridge.emit('onPullDownRefresh', {}, id)
  }

  function restoring(callback: Function) {
    if (!refreshControllerElem) {
      return
    }

    refreshControllerElemStyle.transition = '-webkit-transform 0.3s'
    refreshControllerElemStyle.transform += ' scale(0.01)'

    const restoreTransitionEnd = function () {
      timeout && clearTimeout(timeout)
      refreshControllerElem.removeEventListener(
        'webkitTransitionEnd',
        restoreTransitionEnd
      )
      refreshControllerElemStyle.transition = ''
      refreshControllerElemStyle.transform = 'translate3d(-50%, 0, 0)'
      callback()
    }
    refreshControllerElem.addEventListener(
      'webkitTransitionEnd',
      restoreTransitionEnd
    )
    const timeout = setTimeout(restoreTransitionEnd, 350) // 部分手机，部分情况webkitTransitionEnd不触发
  }

  return {
    onTouchstart,
    onTouchmove,
    onTouchend,
    onTouchcancel: onTouchend,
  }
}
