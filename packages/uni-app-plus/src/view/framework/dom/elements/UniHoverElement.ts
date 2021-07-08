import { camelize } from '@vue/shared'
import { decodeAttr, formatLog } from '@dcloudio/uni-shared'
import { UniElement } from './UniElement'

function isHoverAttr(name: string) {
  return name.indexOf('.h') === 0
}

export class UniHoverElement extends UniElement {
  private _hover?: Hover

  setAttr(name: string, value: unknown) {
    if (!isHoverAttr(name)) {
      return super.setAttr(name, value)
    }
    name = camelize(decodeAttr(name))
    if (!this._hover) {
      this._hover = new Hover(this.$)
    }
    const { _hover } = this
    ;(_hover as any)[name] = value
    if (name !== 'hoverClass') {
      return
    }
    if (_hover.hoverClass && _hover.hoverClass !== 'none') {
      _hover.addEvent()
    } else {
      _hover.removeEvent()
    }
  }
  removeAttr(name: string) {
    if (!isHoverAttr(name)) {
      return super.removeAttr(name)
    }
  }
}

class Hover {
  private $: Element

  hoverClass: string = 'none'
  hoverStopPropagation: boolean = false
  hoverStartTime: number = 50
  hoverStayTime: number = 400

  private _listening: boolean = false

  private _hovering: boolean = false
  private _hoverTouch: boolean = false
  private _hoverStartTimer: number = 0
  private _hoverStayTimer: number = 0

  private __hoverTouchStart!: (evt: Event) => void
  private __hoverTouchEnd!: (evt?: Event) => void
  private __hoverTouchCancel!: (evt?: Event) => void
  constructor($: Element) {
    this.$ = $

    this.__hoverTouchStart = this._hoverTouchStart.bind(this)
    this.__hoverTouchEnd = this._hoverTouchEnd.bind(this)
    this.__hoverTouchCancel = this._hoverTouchCancel.bind(this)
  }

  get hovering() {
    return this._hovering
  }

  set hovering(hovering: boolean) {
    this._hovering = hovering
    if (hovering) {
      this.$.classList.add(this.hoverClass)
    } else {
      this.$.classList.remove(this.hoverClass)
    }
  }

  addEvent() {
    if (this._listening) {
      return
    }
    if (__DEV__) {
      console.log(
        formatLog(this.$.tagName, 'Hover', 'addEventListener', this.hoverClass)
      )
    }
    this._listening = true
    this.$.addEventListener('touchstart', this.__hoverTouchStart)
    this.$.addEventListener('touchend', this.__hoverTouchEnd)
    this.$.addEventListener('touchcancel', this.__hoverTouchCancel)
  }
  removeEvent() {
    if (!this._listening) {
      return
    }
    if (__DEV__) {
      console.log(formatLog(this.$.tagName, 'Hover', 'removeEventListener'))
    }
    this._listening = false
    this.$.removeEventListener('touchstart', this.__hoverTouchStart)
    this.$.removeEventListener('touchend', this.__hoverTouchEnd)
    this.$.removeEventListener('touchcancel', this.__hoverTouchCancel)
  }
  _hoverTouchStart(evt: Event) {
    if ((evt as any)._hoverPropagationStopped) {
      return
    }
    if (
      !this.hoverClass ||
      this.hoverClass === 'none' ||
      (this.$ as any).disabled
    ) {
      return
    }
    if ((evt as TouchEvent).touches.length > 1) {
      return
    }
    if (this.hoverStopPropagation) {
      ;(evt as any)._hoverPropagationStopped = true
    }
    this._hoverTouch = true
    this._hoverStartTimer = setTimeout(() => {
      this.hovering = true
      if (!this._hoverTouch) {
        // 防止在hoverStartTime时间内触发了 touchend 或 touchcancel
        this._hoverReset()
      }
    }, this.hoverStartTime)
  }
  _hoverTouchEnd() {
    this._hoverTouch = false
    if (this.hovering) {
      this._hoverReset()
    }
  }
  _hoverReset() {
    requestAnimationFrame(() => {
      clearTimeout(this._hoverStayTimer)
      this._hoverStayTimer = setTimeout(() => {
        this.hovering = false
      }, this.hoverStayTime)
    })
  }
  _hoverTouchCancel() {
    this._hoverTouch = false
    this.hovering = false
    clearTimeout(this._hoverStartTimer)
  }
}
