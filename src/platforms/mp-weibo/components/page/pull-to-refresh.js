function processDeltaY (evt, identifier, startY) {
  const touch = Array.prototype.slice.call(evt.changedTouches).filter(touch => touch.identifier === identifier)[0]
  if (!touch) {
    return false
  }
  evt.deltaY = touch.pageY - startY
  return true
}

// const ratio = 2.2

const PULLING = 'pulling'
const REACHED = 'reached'

const ABORTING = 'aborting'
const REFRESHING = 'refreshing'
const RESTORING = 'restoring'

export default {
  mounted () {
    if (this.enablePullDownRefresh) {
      this.refreshContainerElem = this.$refs.refresh.$el
      this.refreshControllerElem = this.refreshContainerElem.querySelector('.uni-page-refresh')
      this.refreshInnerElemStyle = this.refreshControllerElem.querySelector('.uni-page-refresh-inner').style

      UniServiceJSBridge.on(this.$route.params.__id__ + '.startPullDownRefresh', () => {
        if (!this.state) {
          this.state = REFRESHING
          this._addClass()
          setTimeout(() => {
            this._refreshing()
          }, 50)
        }
      })

      UniServiceJSBridge.on(this.$route.params.__id__ + '.stopPullDownRefresh', () => {
        if (this.state === REFRESHING) {
          this._removeClass()
          this.state = RESTORING
          this._addClass()

          this._restoring(() => {
            this._removeClass()
            this.state = this.distance = this.offset = null
          })
        }
      })
    }
  },
  methods: {
    _touchstart (evt) {
      const touch = evt.changedTouches[0]
      this.touchId = touch.identifier
      this.startY = touch.pageY
      if ([ABORTING, REFRESHING, RESTORING].indexOf(this.state) >= 0) {
        this.canRefresh = false
      } else {
        this.canRefresh = true
      }
    },
    _touchmove (evt) {
      if (!this.canRefresh) {
        return
      }
      if (!processDeltaY(evt, this.touchId, this.startY)) {
        return
      }

      let {
        deltaY
      } = evt

      if ((document.documentElement.scrollTop || document.body.scrollTop) !== 0) {
        this.touchId = null
        return
      }

      if (deltaY < 0 && !this.state) {
        return
      }

      evt.preventDefault()

      if (this.distance == null) {
        this.offset = deltaY
        this.state = PULLING
        this._addClass()
      }

      deltaY = deltaY - this.offset

      if (deltaY < 0) {
        deltaY = 0
      }

      this.distance = deltaY

      const reached = deltaY >= this.refreshOptions.range && this.state !== REACHED
      const pulling = deltaY < this.refreshOptions.range && this.state !== PULLING

      if (reached || pulling) {
        this._removeClass()
        this.state = this.state === REACHED ? PULLING : REACHED
        this._addClass()
      }

      this._pulling(deltaY)
    },
    _touchend (evt) {
      if (!processDeltaY(evt, this.touchId, this.startY)) {
        return
      }
      if (this.state === null) {
        return
      }
      if (this.state === PULLING) {
        this._removeClass()
        this.state = ABORTING
        this._addClass()
        this._aborting(() => {
          this._removeClass()
          this.state = this.distance = this.offset = null
        })
      } else if (this.state === REACHED) {
        this._removeClass()
        this.state = REFRESHING
        this._addClass()
        this._refreshing()
      }
    },
    _toggleClass (type) {
      if (!this.state) {
        return
      }
      const elem = this.refreshContainerElem
      if (elem) {
        elem.classList[type]('uni-page-refresh--' + this.state)
      }
    },
    _addClass () {
      this._toggleClass('add')
    },
    _removeClass () {
      this._toggleClass('remove')
    },
    _pulling (deltaY) {
      const elem = this.refreshControllerElem
      if (!elem) {
        return
      }

      const style = elem.style

      let rotate = deltaY / this.refreshOptions.range

      if (rotate > 1) {
        rotate = 1
      } else {
        rotate = rotate * rotate * rotate
      }

      const y = Math.round(deltaY / (this.refreshOptions.range / this.refreshOptions.height))

      const transform = y ? 'translate3d(-50%, ' + y + 'px, 0)' : 0

      style.webkitTransform = transform
      style.clip = 'rect(' + (45 - y) + 'px,45px,45px,-5px)'

      this.refreshInnerElemStyle.webkitTransform = 'rotate(' + 360 * rotate + 'deg)'
    },
    _aborting (callback) {
      const elem = this.refreshControllerElem
      if (!elem) {
        return
      }

      const style = elem.style

      if (style.webkitTransform) {
        style.webkitTransition = '-webkit-transform 0.3s'
        style.webkitTransform = 'translate3d(-50%, 0, 0)'
        const abortTransitionEnd = function () {
          timeout && clearTimeout(timeout)
          elem.removeEventListener('webkitTransitionEnd', abortTransitionEnd)
          style.webkitTransition = ''
          callback()
        }
        elem.addEventListener('webkitTransitionEnd', abortTransitionEnd)
        const timeout = setTimeout(abortTransitionEnd, 350) // 部分手机，部分情况webkitTransitionEnd不触发
      } else {
        callback()
      }
    },
    _refreshing () {
      const elem = this.refreshControllerElem
      if (!elem) {
        return
      }

      const style = elem.style
      style.webkitTransition = '-webkit-transform 0.2s'
      style.webkitTransform = 'translate3d(-50%, ' + this.refreshOptions.height + 'px, 0)'

      // Service 执行 refresh
      UniServiceJSBridge.emit('onPullDownRefresh', {}, this.$route.params.__id__)
    },
    _restoring (callback) {
      const elem = this.refreshControllerElem
      if (!elem) {
        return
      }

      const style = elem.style

      style.webkitTransition = '-webkit-transform 0.3s'
      style.webkitTransform += ' scale(0.01)'

      const restoreTransitionEnd = function () {
        timeout && clearTimeout(timeout)
        elem.removeEventListener('webkitTransitionEnd', restoreTransitionEnd)
        style.webkitTransition = ''
        style.webkitTransform = 'translate3d(-50%, 0, 0)'
        callback()
      }

      elem.addEventListener('webkitTransitionEnd', restoreTransitionEnd)
      const timeout = setTimeout(restoreTransitionEnd, 350) // 部分手机，部分情况webkitTransitionEnd不触发
    }
  }
}
