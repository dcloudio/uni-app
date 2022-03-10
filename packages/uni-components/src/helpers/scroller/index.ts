import { Scroller, Options } from './Scroller'
import { TouchtrackEvent } from '../useTouchtrack'

export function useScroller(element: HTMLElement, options: Options) {
  interface TouchInfo {
    trackingID: number | string
    maxDy: number
    maxDx: number
    x?: number
    y?: number
    historyX?: number[]
    historyY?: number[]
    historyTime?: number[]
    listener?: Scroller | null
  }
  const touchInfo: TouchInfo = {
    trackingID: -1,
    maxDy: 0,
    maxDx: 0,
  }
  const scroller = new Scroller(element, options)
  function findDelta(event: TouchtrackEvent | MouseEvent) {
    const touchtrackEvent: TouchtrackEvent = event as TouchtrackEvent
    const mouseEvent: MouseEvent = event as MouseEvent
    return touchtrackEvent.detail.state === 'move' ||
      touchtrackEvent.detail.state === 'end'
      ? {
          x: touchtrackEvent.detail.dx,
          y: touchtrackEvent.detail.dy,
        }
      : {
          x: mouseEvent.screenX - touchInfo.x!,
          y: mouseEvent.screenY - touchInfo.y!,
        }
  }
  function handleTouchStart(event: TouchtrackEvent | MouseEvent) {
    const touchtrackEvent: TouchtrackEvent = event as TouchtrackEvent
    const mouseEvent: MouseEvent = event as MouseEvent
    if (touchtrackEvent.detail.state === 'start') {
      touchInfo.trackingID = 'touch'
      touchInfo.x = touchtrackEvent.detail.x
      touchInfo.y = touchtrackEvent.detail.y
    } else {
      touchInfo.trackingID = 'mouse'
      touchInfo.x = mouseEvent.screenX
      touchInfo.y = mouseEvent.screenY
    }
    touchInfo.maxDx = 0
    touchInfo.maxDy = 0
    touchInfo.historyX = [0]
    touchInfo.historyY = [0]
    touchInfo.historyTime = [
      touchtrackEvent.detail.timeStamp || mouseEvent.timeStamp,
    ]
    touchInfo.listener = scroller
    if (scroller.onTouchStart) {
      scroller.onTouchStart()
    }
    // @ts-expect-error
    if (typeof event.cancelable !== 'boolean' || event.cancelable)
      event.preventDefault()
  }
  function handleTouchMove(event: TouchtrackEvent | MouseEvent) {
    const touchtrackEvent: TouchtrackEvent = event as TouchtrackEvent
    const mouseEvent: MouseEvent = event as MouseEvent
    if (touchInfo.trackingID !== -1) {
      // @ts-expect-error
      if (typeof event.cancelable !== 'boolean' || event.cancelable)
        event.preventDefault()
      const delta = findDelta(event)
      if (delta) {
        for (
          touchInfo.maxDy = Math.max(touchInfo.maxDy, Math.abs(delta.y)),
            touchInfo.maxDx = Math.max(touchInfo.maxDx, Math.abs(delta.x)),
            touchInfo.historyX!.push(delta.x),
            touchInfo.historyY!.push(delta.y),
            touchInfo.historyTime!.push(
              touchtrackEvent.detail.timeStamp || mouseEvent.timeStamp
            );
          touchInfo.historyTime!.length > 10;

        ) {
          touchInfo.historyTime!.shift()
          touchInfo.historyX!.shift()
          touchInfo.historyY!.shift()
        }
        if (touchInfo.listener && touchInfo.listener.onTouchMove) {
          touchInfo.listener.onTouchMove(delta.x, delta.y)
        }
      }
    }
  }
  function handleTouchEnd(event: TouchtrackEvent | MouseEvent) {
    if (touchInfo.trackingID !== -1) {
      event.preventDefault()
      const delta = findDelta(event)
      if (delta) {
        const listener = touchInfo.listener
        touchInfo.trackingID = -1
        touchInfo.listener = null
        const length = touchInfo.historyTime!.length
        const o = {
          x: 0,
          y: 0,
        }
        if (length > 2) {
          for (
            let i = touchInfo.historyTime!.length - 1,
              time1 = touchInfo.historyTime![i],
              x = touchInfo.historyX![i],
              y = touchInfo.historyY![i];
            i > 0;

          ) {
            i--
            const time0 = touchInfo.historyTime![i]
            const time = time1 - time0
            if (time > 30 && time < 50) {
              o.x = (x - touchInfo.historyX![i]) / (time / 1e3)
              o.y = (y - touchInfo.historyY![i]) / (time / 1e3)
              break
            }
          }
        }
        touchInfo.historyTime = []
        touchInfo.historyX = []
        touchInfo.historyY = []
        if (listener && listener.onTouchEnd) {
          listener.onTouchEnd(delta.x, delta.y, o)
        }
      }
    }
  }
  return {
    scroller,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}

export { Friction } from './Friction'
export { Spring } from './Spring'
export { Scroller } from './Scroller'
export { initScrollBounce, disableScrollBounce } from '../scroll'
