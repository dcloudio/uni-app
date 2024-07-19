import { type Ref, nextTick, onMounted, watch } from 'vue'
import { invokeHook } from '@dcloudio/uni-core'
import {
  API_START_PULL_DOWN_REFRESH,
  API_STOP_PULL_DOWN_REFRESH,
} from '@dcloudio/uni-api'
import { useSubscribe, withWebEvent } from '@dcloudio/uni-components'
import { usePageMeta } from '../../../setup/provide'
import { ON_PULL_DOWN_REFRESH } from '@dcloudio/uni-shared'

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
  const pageMeta = usePageMeta()
  const { id, pullToRefresh } = pageMeta
  const { range, height } = pullToRefresh!
  let refreshContainerElem: HTMLDivElement
  let refreshControllerElem: HTMLDivElement
  let refreshControllerElemStyle: CSSStyleDeclaration
  let refreshInnerElemStyle: CSSStyleDeclaration
  useSubscribe(
    () => {
      if (!pageMeta.enablePullDownRefresh) {
        return
      }
      if (!state) {
        state = REFRESHING
        addClass()
        setTimeout(() => {
          refreshing()
        }, 50)
      }
    },
    API_START_PULL_DOWN_REFRESH,
    false,
    id
  )
  useSubscribe(
    () => {
      if (!pageMeta.enablePullDownRefresh) {
        return
      }
      if (state === REFRESHING) {
        removeClass()
        state = RESTORING
        addClass()

        restoring(() => {
          removeClass()
          state = distance = offset = null
        })
      }
    },
    API_STOP_PULL_DOWN_REFRESH,
    false,
    id
  )
  function initElement() {
    refreshContainerElem = refreshRef.value.$el
    refreshControllerElem =
      refreshContainerElem.querySelector('.uni-page-refresh')!
    refreshControllerElemStyle = refreshControllerElem.style
    refreshInnerElemStyle = (
      refreshControllerElem.querySelector(
        '.uni-page-refresh-inner'
      ) as HTMLDivElement
    ).style
  }
  onMounted(() => {
    initElement()
  })

  if (__X__) {
    watch(
      () => pageMeta.enablePullDownRefresh,
      (enablePullDownRefresh) => {
        if (enablePullDownRefresh) {
          nextTick(() => {
            initElement()
          })
        }
      }
    )
  }
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

  let distance: number | null = null
  let offset: number | null = null

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

    let rotate = deltaY / range!

    if (rotate > 1) {
      rotate = 1
    } else {
      rotate = rotate * rotate * rotate
    }

    const y = Math.round(deltaY / (range! / height!)) || 0

    refreshInnerElemStyle.transform = 'rotate(' + 360 * rotate + 'deg)'
    refreshControllerElemStyle.clip = 'rect(' + (45 - y) + 'px,45px,45px,-5px)'
    refreshControllerElemStyle.transform = 'translate3d(-50%, ' + y + 'px, 0)'
  }

  const onTouchstartPassive = withWebEvent((ev: TouchEvent) => {
    if (!pageMeta.enablePullDownRefresh) {
      return
    }
    const touch = ev.changedTouches[0]
    touchId = touch.identifier
    startY = touch.pageY
    if ([ABORTING, REFRESHING, RESTORING].indexOf(state!) >= 0) {
      canRefresh = false
    } else {
      canRefresh = true
    }
  })

  const onTouchmove = withWebEvent((ev: TouchEvent) => {
    if (!pageMeta.enablePullDownRefresh) {
      return
    }
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

    const isReached = deltaY >= range! && state !== REACHED
    const isPulling = deltaY < range! && state !== PULLING

    if (isReached || isPulling) {
      removeClass()
      state = state === REACHED ? PULLING : REACHED
      addClass()
    }

    pulling(deltaY!)
  })

  const onTouchend = withWebEvent((ev: TouchEvent) => {
    if (!pageMeta.enablePullDownRefresh) {
      return
    }
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
  })

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
    if (!refreshControllerElem) {
      return
    }
    refreshControllerElemStyle.transition = '-webkit-transform 0.2s'
    refreshControllerElemStyle.transform =
      'translate3d(-50%, ' + height + 'px, 0)'
    invokeHook(id!, ON_PULL_DOWN_REFRESH)
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
    onTouchstartPassive,
    onTouchmove,
    onTouchend,
    onTouchcancel: onTouchend,
  }
}
