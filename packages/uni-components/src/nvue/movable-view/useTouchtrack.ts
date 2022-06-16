import { isFunction } from '@vue/shared'
type State = 'start' | 'move' | 'end' | 'cancel'
type TouchOrMouseEvent = TouchEvent | MouseEvent
type Detail = {
  state: State
  x: number
  y: number
  dx: number
  dy: number
  ddx: number
  ddy: number
  timeStamp: Event['timeStamp']
}
type CallbackType = 'touchstart' | 'touchmove' | 'touchend'
export interface TouchtrackEvent {
  target: Event['target']
  currentTarget: Event['currentTarget']
  preventDefault?: Event['preventDefault']
  stopPropagation: Event['stopPropagation']
  touches: TouchEvent['touches']
  changedTouches: TouchEvent['changedTouches']
  detail: Detail
}

export function useTouchtrack(
  method: (event: TouchtrackEvent) => boolean | void
) {
  const __event: Record<string, Function> = {}
  function callback(type: CallbackType, $event: TouchtrackEvent) {
    if (__event[type]) {
      __event[type]($event)
    }
  }
  function addListener(type: CallbackType, callback: Function) {
    __event[type] = function ($event: TouchtrackEvent) {
      if (isFunction(callback)) {
        $event.touches = $event.changedTouches
        if (callback($event) === false) {
          $event.stopPropagation()
        }
      }
    }
  }

  let x0 = 0
  let y0 = 0
  let x1 = 0
  let y1 = 0
  const fn = function (
    $event: TouchOrMouseEvent,
    state: State,
    x: number,
    y: number
  ) {
    if (
      method({
        target: $event.target,
        currentTarget: $event.currentTarget,
        stopPropagation: $event.stopPropagation.bind($event),
        touches: ($event as TouchEvent).touches,
        changedTouches: ($event as TouchEvent).changedTouches,
        detail: {
          state,
          x,
          y,
          dx: x - x0,
          dy: y - y0,
          ddx: x - x1,
          ddy: y - y1,
          timeStamp: $event.timeStamp || Date.now(),
        },
      }) === false
    ) {
      return false
    }
  }

  let $eventOld: TouchOrMouseEvent | null = null
  addListener('touchstart', function ($event: TouchEvent) {
    if (!$eventOld) {
      $eventOld = $event
      x0 = x1 = $event.touches[0].pageX
      y0 = y1 = $event.touches[0].pageY
      return fn($event, 'start', x0, y0)
    }
  })
  addListener('touchmove', function ($event: TouchEvent) {
    if ($eventOld) {
      const res = fn(
        $event,
        'move',
        $event.touches[0].pageX,
        $event.touches[0].pageY
      )
      x1 = $event.touches[0].pageX
      y1 = $event.touches[0].pageY
      return res
    }
  })
  addListener('touchend', function ($event: TouchEvent) {
    if ($eventOld) {
      $eventOld = null
      return fn(
        $event,
        'end',
        $event.changedTouches[0].pageX,
        $event.changedTouches[0].pageY
      )
    }
  })

  return {
    touchstart: function ($event: TouchtrackEvent) {
      callback('touchstart', $event)
    },
    touchmove: function ($event: TouchtrackEvent) {
      callback('touchmove', $event)
    },
    touchend: function ($event: TouchtrackEvent) {
      callback('touchend', $event)
    },
  }
}
