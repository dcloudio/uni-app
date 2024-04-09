import { passive } from '@dcloudio/uni-shared'

const LONGPRESS_TIMEOUT = 350
const LONGPRESS_THRESHOLD = 10

const passiveOptions = /*#__PURE__*/ passive(true)

let longPressTimer: ReturnType<typeof setTimeout> | null

function clearLongPressTimer() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

let startPageX = 0
let startPageY = 0

function touchstart(evt: TouchEvent) {
  clearLongPressTimer()
  if (evt.touches.length !== 1) {
    return
  }
  const { pageX, pageY } = evt.touches[0]

  startPageX = pageX
  startPageY = pageY

  longPressTimer = setTimeout(function () {
    const customEvent = new CustomEvent('longpress', {
      bubbles: true,
      cancelable: true,
      // @ts-expect-error
      target: evt.target,
      currentTarget: evt.currentTarget,
    })
    ;(customEvent as any).touches = evt.touches
    ;(customEvent as any).changedTouches = evt.changedTouches
    ;(evt.target as EventTarget).dispatchEvent(customEvent)
  }, LONGPRESS_TIMEOUT)
}

function touchmove(evt: TouchEvent) {
  if (!longPressTimer) {
    return
  }

  if (evt.touches.length !== 1) {
    return clearLongPressTimer()
  }

  const { pageX, pageY } = evt.touches[0]

  if (
    Math.abs(pageX - startPageX) > LONGPRESS_THRESHOLD ||
    Math.abs(pageY - startPageY) > LONGPRESS_THRESHOLD
  ) {
    return clearLongPressTimer()
  }
}

export function initLongPress() {
  window.addEventListener('touchstart', touchstart, passiveOptions)
  window.addEventListener('touchmove', touchmove, passiveOptions)
  window.addEventListener('touchend', clearLongPressTimer, passiveOptions)
  window.addEventListener('touchcancel', clearLongPressTimer, passiveOptions)
}
