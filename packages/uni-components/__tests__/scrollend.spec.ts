import { onScrollend } from '../src/helpers/scrollend'

const SCROLL_END_DELAY = 100

class MockElement {
  onscrollend?: null
  listeners = new Map<string, Set<(event: Event) => void>>()

  addEventListener(type: string, listener: (event: Event) => void) {
    let listeners = this.listeners.get(type)
    if (!listeners) {
      listeners = new Set()
      this.listeners.set(type, listeners)
    }
    listeners.add(listener)
  }

  removeEventListener(type: string, listener: (event: Event) => void) {
    this.listeners.get(type)?.delete(listener)
  }

  dispatch(type: string, event: Event) {
    this.listeners.get(type)?.forEach((listener) => listener(event))
  }

  listenerCount(type: string) {
    return this.listeners.get(type)?.size || 0
  }
}

function createTouchEvent(...identifiers: number[]) {
  return {
    changedTouches: identifiers.map((identifier) => ({ identifier })),
  } as unknown as TouchEvent
}

describe('onScrollend', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('uses the native scrollend event when supported', () => {
    const element = new MockElement()
    element.onscrollend = null
    const listener = jest.fn()
    const remove = onScrollend(element as unknown as HTMLElement, listener)
    const event = {} as Event

    element.dispatch('scrollend', event)
    expect(listener).toHaveBeenCalledWith(event)

    remove()
    element.dispatch('scrollend', event)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  test('falls back to scroll event debouncing', () => {
    const element = new MockElement()
    const listener = jest.fn()
    const remove = onScrollend(element as unknown as HTMLElement, listener)
    const firstEvent = {} as Event
    const lastEvent = {} as Event

    element.dispatch('scroll', firstEvent)
    jest.advanceTimersByTime(SCROLL_END_DELAY - 1)
    element.dispatch('scroll', lastEvent)
    jest.advanceTimersByTime(SCROLL_END_DELAY - 1)
    expect(listener).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(listener).toHaveBeenCalledWith(lastEvent)

    element.dispatch('scroll', firstEvent)
    remove()
    jest.advanceTimersByTime(SCROLL_END_DELAY)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(element.listenerCount('scroll')).toBe(0)
    expect(element.listenerCount('touchstart')).toBe(0)
    expect(element.listenerCount('touchend')).toBe(0)
    expect(element.listenerCount('touchcancel')).toBe(0)
  })

  test('waits until all active touches have ended', () => {
    const element = new MockElement()
    const listener = jest.fn()
    const remove = onScrollend(element as unknown as HTMLElement, listener)
    const scrollEvent = {} as Event

    element.dispatch('touchstart', createTouchEvent(1, 2))
    element.dispatch('scroll', scrollEvent)
    jest.advanceTimersByTime(SCROLL_END_DELAY)
    expect(listener).not.toHaveBeenCalled()
    expect(jest.getTimerCount()).toBe(0)

    element.dispatch('touchend', createTouchEvent(1))
    jest.advanceTimersByTime(SCROLL_END_DELAY)
    expect(listener).not.toHaveBeenCalled()

    element.dispatch('touchcancel', createTouchEvent(2))
    jest.advanceTimersByTime(SCROLL_END_DELAY - 1)
    expect(listener).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(listener).toHaveBeenCalledWith(scrollEvent)
    remove()
  })

  test('waits for momentum scrolling after touchend', () => {
    const element = new MockElement()
    const listener = jest.fn()
    const remove = onScrollend(element as unknown as HTMLElement, listener)
    const dragEvent = {} as Event
    const momentumEvent = {} as Event

    element.dispatch('touchstart', createTouchEvent(1))
    element.dispatch('scroll', dragEvent)
    jest.advanceTimersByTime(SCROLL_END_DELAY)
    element.dispatch('touchend', createTouchEvent(1))

    jest.advanceTimersByTime(SCROLL_END_DELAY / 2)
    element.dispatch('scroll', momentumEvent)
    jest.advanceTimersByTime(SCROLL_END_DELAY - 1)
    expect(listener).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(listener).toHaveBeenCalledWith(momentumEvent)
    remove()
  })
})
