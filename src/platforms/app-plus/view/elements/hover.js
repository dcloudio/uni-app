import UniAnimationElement from './animation'

export default class UniHoverElement extends UniAnimationElement {
  setAttribute (key, value) {
    if (key === 'hover-class') {
      this._updateHoverClass(value)
    }
    super.setAttribute(key, value)
  }

  removeAttribute (key) {
    if (key === 'hover-class') {
      this._updateHoverClass()
    }
    super.removeAttribute(key)
  }

  get hovering () {
    return this._hovering
  }

  set hovering (hovering) {
    this._hovering = hovering
    const hoverClass = this.getAttribute('hover-class')
    if (hovering) {
      this.classList.add(hoverClass)
    } else {
      this.classList.remove(hoverClass)
    }
  }

  _updateHoverClass (hoverClass) {
    hoverClass = hoverClass || 'none'
    if (hoverClass === 'none') {
      this._removeEventListener()
    } else {
      this._addEventListener()
    }
  }

  _addEventListener () {
    if (!this.__hoverTouchStart) {
      this.addEventListener('touchstart', this.__hoverTouchStart = this._hoverTouchStart.bind(this))
      this.addEventListener('touchend', this.__hoverTouchEnd = this._hoverTouchEnd.bind(this))
      this.addEventListener('touchcancel', this.__hoverTouchCancel = this._hoverTouchCancel.bind(this))
    }
  }

  _removeEventListener () {
    if (this.__hoverTouchStart) {
      this.removeEventListener('touchstart', this.__hoverTouchStart)
      delete this.__hoverTouchStart
      this.removeEventListener('touchend', this.__hoverTouchEnd)
      delete this.__hoverTouchEnd
      this.removeEventListener('touchcancel', this.__hoverTouchCancel)
      delete this.__hoverTouchCancel
    }
  }

  _hoverTouchStart (evt) {
    if (evt._hoverPropagationStopped) {
      return
    }
    if (this.disabled) {
      return
    }
    if (evt.touches.length > 1) {
      return
    }
    if (this.getAttribute('hover-stop-propagation')) {
      evt._hoverPropagationStopped = true
    }
    this._hoverTouch = true
    const hoverStartTimeDefault = 50
    const hoverStartTime = Number(this.getAttribute('hover-start-time') || hoverStartTimeDefault)
    this._hoverStartTimer = setTimeout(() => {
      this.hovering = true
      if (!this._hoverTouch) {
        // 防止在hoverStartTime时间内触发了 touchend 或 touchcancel
        this._hoverReset()
      }
    }, isNaN(hoverStartTime) ? hoverStartTimeDefault : hoverStartTime)
  }

  _hoverTouchEnd () {
    this._hoverTouch = false
    if (this.hovering) {
      this._hoverReset()
    }
  }

  _hoverReset () {
    requestAnimationFrame(() => {
      clearTimeout(this._hoverStayTimer)
      const hoverStayTimeDefault = 400
      const hoverStayTime = Number(this.getAttribute('hover-stay-time') || hoverStayTimeDefault)
      this._hoverStayTimer = setTimeout(() => {
        this.hovering = false
      }, isNaN(hoverStayTime) ? hoverStayTimeDefault : hoverStayTime)
    })
  }

  _hoverTouchCancel () {
    this._hoverTouch = false
    this.hovering = false
    clearTimeout(this._hoverStartTimer)
  }
}
