import { debounce } from '@dcloudio/uni-shared'

const SCROLL_END_DELAY = 100
const passiveOptions = { passive: true }

export function onScrollend(
  element: HTMLElement,
  listener: (event: Event) => void
): () => void {
  if ('onscrollend' in (element as unknown as Record<string, unknown>)) {
    element.addEventListener('scrollend', listener, passiveOptions)
    return () => {
      element.removeEventListener('scrollend', listener)
    }
  }

  const activeTouches = new Set<number>()
  let lastScrollEvent: Event | null = null
  let waitingForTouchEnd = false

  const schedule = debounce(
    () => {
      if (activeTouches.size > 0) {
        waitingForTouchEnd = true
      } else if (lastScrollEvent !== null) {
        const event = lastScrollEvent
        lastScrollEvent = null
        listener(event)
      }
    },
    SCROLL_END_DELAY,
    { setTimeout, clearTimeout }
  )
  const onScroll = (event: Event) => {
    waitingForTouchEnd = false
    lastScrollEvent = event
    schedule()
  }
  const onTouchStart = (event: TouchEvent) => {
    for (let i = 0; i < event.changedTouches.length; i++) {
      activeTouches.add(event.changedTouches[i].identifier)
    }
  }
  const onTouchEnd = (event: TouchEvent) => {
    for (let i = 0; i < event.changedTouches.length; i++) {
      activeTouches.delete(event.changedTouches[i].identifier)
    }
    if (activeTouches.size === 0 && waitingForTouchEnd) {
      waitingForTouchEnd = false
      schedule()
    }
  }

  element.addEventListener('touchstart', onTouchStart, passiveOptions)
  element.addEventListener('touchend', onTouchEnd, passiveOptions)
  element.addEventListener('touchcancel', onTouchEnd, passiveOptions)
  element.addEventListener('scroll', onScroll, passiveOptions)
  return () => {
    element.removeEventListener('touchstart', onTouchStart)
    element.removeEventListener('touchend', onTouchEnd)
    element.removeEventListener('touchcancel', onTouchEnd)
    element.removeEventListener('scroll', onScroll)
    schedule.cancel()
    activeTouches.clear()
    lastScrollEvent = null
    waitingForTouchEnd = false
  }
}
