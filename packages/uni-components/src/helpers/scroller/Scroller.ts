import { isFunction } from '@vue/shared'
import type { Friction } from './Friction'
import type { Spring } from './Spring'
import { Scroll } from './Scroll'

interface Animation {
  cancel(): void
  model: Scroll
}

function createAnimation(
  scroll: Scroll,
  onScroll: Function,
  onEnd: Function
): Animation {
  interface State {
    id: number
    cancelled: boolean
  }
  const state: State = {
    id: 0,
    cancelled: false,
  }
  function startAnimation(
    state: State,
    scroll: Scroll,
    onScroll: Function,
    onEnd: Function
  ) {
    if (!state || !state.cancelled) {
      onScroll(scroll)
      const isDone = scroll.done()
      if (!isDone) {
        if (!state.cancelled) {
          state.id = requestAnimationFrame(
            startAnimation.bind(null, state, scroll, onScroll, onEnd)
          )
        }
      }
      if (isDone && onEnd) {
        onEnd(scroll)
      }
    }
  }

  function cancel(state: State) {
    if (state && state.id) {
      cancelAnimationFrame(state.id)
    }
    if (state) {
      state.cancelled = true
    }
  }
  startAnimation(state, scroll, onScroll, onEnd)
  return {
    cancel: cancel.bind(null, state),
    model: scroll,
  }
}

interface OnScrollEvent {
  target: {
    scrollLeft: number
    scrollTop: number
    scrollHeight: number
    scrollWidth: number
    offsetHeight: number
    offsetWidth: number
  }
}

export interface Options {
  enableSnap?: boolean
  itemSize?: number
  enableX?: boolean
  enableY?: boolean
  scrollWidth?: number
  scrollHeight?: number
  friction?: Friction
  spring?: Spring
  onScroll?: (event: OnScrollEvent) => void
  onSnap?: (index: number) => void
}

export class Scroller {
  _element: HTMLElement
  _options: Options
  _enableSnap
  _itemSize
  _enableX
  _enableY
  _shouldDispatchScrollEvent
  _extent
  _scrollWidth?: number
  _scrollHeight?: number
  _position: number
  _scroll: Scroll
  _onTransitionEnd: () => void
  _startPosition?: number
  _lastChangePos?: number
  _animation?: Animation
  _scrolling?: boolean
  _lastTime?: number
  _lastDelay?: number
  _lastIdx?: number
  _snapping?: boolean
  _lastPos?: number
  constructor(element: HTMLElement, options: Options) {
    options = options || {}
    this._element = element
    this._options = options
    this._enableSnap = options.enableSnap || false
    this._itemSize = options.itemSize || 0
    this._enableX = options.enableX || false
    this._enableY = options.enableY || false
    this._shouldDispatchScrollEvent = !!options.onScroll
    if (this._enableX) {
      this._extent =
        (options.scrollWidth || this._element.offsetWidth) -
        this._element.parentElement!.offsetWidth
      this._scrollWidth = options.scrollWidth
    } else {
      this._extent =
        (options.scrollHeight || this._element.offsetHeight) -
        this._element.parentElement!.offsetHeight
      this._scrollHeight = options.scrollHeight
    }

    this._position = 0
    this._scroll = new Scroll(this._extent, options.friction, options.spring)
    this._onTransitionEnd = this.onTransitionEnd.bind(this)
    this.updatePosition()
  }
  onTouchStart() {
    this._startPosition = this._position
    this._lastChangePos = this._startPosition
    if (this._startPosition > 0) {
      this._startPosition /= 0.5
    } else {
      if (this._startPosition < -this._extent) {
        this._startPosition =
          (this._startPosition + this._extent) / 0.5 - this._extent
      }
    }
    if (this._animation) {
      this._animation.cancel()
      this._scrolling = false
    }
    this.updatePosition()
  }
  onTouchMove(x: number, y: number) {
    let startPosition = this._startPosition!
    if (this._enableX) {
      startPosition += x
    } else if (this._enableY) {
      startPosition += y
    }

    if (startPosition > 0) {
      startPosition *= 0.5
    } else if (startPosition < -this._extent) {
      startPosition = 0.5 * (startPosition + this._extent) - this._extent
    }
    this._position = startPosition
    this.updatePosition()
    this.dispatchScroll()
  }
  onTouchEnd(x: number, y: number, o: { x: number; y: number }) {
    if (
      this._enableSnap &&
      this._position > -this._extent &&
      this._position < 0
    ) {
      if (
        this._enableY &&
        ((Math.abs(y) < this._itemSize && Math.abs(o.y) < 300) ||
          Math.abs(o.y) < 150)
      ) {
        this.snap()
        return
      }
      if (
        this._enableX &&
        ((Math.abs(x) < this._itemSize && Math.abs(o.x) < 300) ||
          Math.abs(o.x) < 150)
      ) {
        this.snap()
        return
      }
    }
    if (this._enableX) {
      this._scroll.set(this._position, o.x)
    } else if (this._enableY) {
      this._scroll.set(this._position, o.y)
    }
    let c: number
    if (this._enableSnap) {
      const s = this._scroll._friction.x(100)
      const l = s % this._itemSize
      c =
        Math.abs(l) > this._itemSize / 2
          ? s - (this._itemSize - Math.abs(l))
          : s - l
      if (c <= 0 && c >= -this._extent) {
        this._scroll.setVelocityByEnd(c)
      }
    }
    this._lastTime = Date.now()
    this._lastDelay = 0
    this._scrolling = true
    this._lastChangePos = this._position
    this._lastIdx = Math.floor(Math.abs(this._position / this._itemSize))
    this._animation = createAnimation(
      this._scroll,
      () => {
        const e = Date.now()
        const i = (e - this._scroll._startTime) / 1e3
        const r = this._scroll.x(i)
        if (__PLATFORM__ === 'h5') {
          this._position = r < -this._extent ? -this._extent : r
        } else {
          this._position = r
        }
        this.updatePosition()
        const o = this._scroll.dx(i)
        if (
          this._shouldDispatchScrollEvent &&
          e - this._lastTime! > this._lastDelay!
        ) {
          this.dispatchScroll()
          this._lastDelay = Math.abs(2e3 / o)
          this._lastTime = e
        }
      },
      () => {
        if (this._enableSnap) {
          if (c <= 0 && c >= -this._extent) {
            this._position = c
            this.updatePosition()
          }
          if (isFunction(this._options.onSnap)) {
            this._options.onSnap(
              Math.floor(Math.abs(this._position) / this._itemSize)
            )
          }
        }
        if (this._shouldDispatchScrollEvent) {
          this.dispatchScroll()
        }
        this._scrolling = false
      }
    )
  }
  onTransitionEnd() {
    this._element.style.webkitTransition = ''
    this._element.style.transition = ''
    this._element.removeEventListener('transitionend', this._onTransitionEnd)
    if (this._snapping) {
      this._snapping = false
    }
    this.dispatchScroll()
  }
  snap() {
    const itemSize = this._itemSize
    const position = this._position % itemSize
    const i =
      Math.abs(position) > this._itemSize / 2
        ? this._position - (itemSize - Math.abs(position))
        : this._position - position
    if (this._position !== i) {
      this._snapping = true
      this.scrollTo(-i)
      if (isFunction(this._options.onSnap)) {
        this._options.onSnap(
          Math.floor(Math.abs(this._position) / this._itemSize)
        )
      }
    }
  }
  scrollTo(position: number, time?: number) {
    if (this._animation) {
      this._animation.cancel()
      this._scrolling = false
    }
    if (typeof position === 'number') {
      this._position = -position
    }
    if (this._position < -this._extent) {
      this._position = -this._extent
    } else {
      if (this._position > 0) {
        this._position = 0
      }
    }
    const transition = 'transform ' + (time || 0.2) + 's ease-out'
    this._element.style.webkitTransition = '-webkit-' + transition
    this._element.style.transition = transition
    this.updatePosition()
    this._element.addEventListener('transitionend', this._onTransitionEnd)
  }
  dispatchScroll() {
    if (
      isFunction(this._options.onScroll) &&
      Math.round(Number(this._lastPos)) !== Math.round(this._position)
    ) {
      this._lastPos = this._position
      const event: OnScrollEvent = {
        target: {
          scrollLeft: this._enableX ? -this._position : 0,
          scrollTop: this._enableY ? -this._position : 0,
          scrollHeight: this._scrollHeight || this._element.offsetHeight,
          scrollWidth: this._scrollWidth || this._element.offsetWidth,
          offsetHeight: this._element.parentElement!.offsetHeight,
          offsetWidth: this._element.parentElement!.offsetWidth,
        },
      }
      this._options.onScroll(event)
    }
  }
  update(height?: number, scrollHeight?: number, itemSize?: number) {
    let extent = 0
    const position = this._position
    if (this._enableX) {
      extent = this._element.childNodes.length
        ? (scrollHeight || this._element.offsetWidth) -
          this._element.parentElement!.offsetWidth
        : 0
      this._scrollWidth = scrollHeight
    } else {
      extent = this._element.childNodes.length
        ? (scrollHeight || this._element.offsetHeight) -
          this._element.parentElement!.offsetHeight
        : 0
      this._scrollHeight = scrollHeight
    }
    if (typeof height === 'number') {
      this._position = -height
    }
    if (this._position < -extent) {
      this._position = -extent
    } else {
      if (this._position > 0) {
        this._position = 0
      }
    }
    this._itemSize = itemSize || this._itemSize
    this.updatePosition()
    if (position !== this._position) {
      this.dispatchScroll()
      if (isFunction(this._options.onSnap)) {
        this._options.onSnap(
          Math.floor(Math.abs(this._position) / this._itemSize)
        )
      }
    }
    this._extent = extent
    this._scroll._extent = extent
  }
  updatePosition() {
    let transform = ''
    if (this._enableX) {
      transform = 'translateX(' + this._position + 'px) translateZ(0)'
    } else {
      if (this._enableY) {
        transform = 'translateY(' + this._position + 'px) translateZ(0)'
      }
    }
    this._element.style.webkitTransform = transform
    this._element.style.transform = transform
  }
  isScrolling() {
    return this._scrolling || this._snapping
  }
}
