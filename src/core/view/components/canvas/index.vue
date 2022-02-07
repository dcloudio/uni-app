<template>
  <uni-canvas
    :canvas-id="canvasId"
    :disable-scroll="disableScroll"
    v-on="_listeners"
  >
    <canvas
      ref="canvas"
      width="300"
      height="150"
    />
    <div
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      "
    >
      <slot />
    </div>
    <v-uni-resize-sensor
      ref="sensor"
      @resize="_resize"
    />
  </uni-canvas>
</template>
<script>
import {
  subscriber
} from 'uni-mixins'

import {
  pixelRatio,
  wrapper
} from 'uni-helpers/hidpi'

import saveImage from 'uni-platform/helpers/save-image'
import { getSameOriginUrl } from 'uni-platform/helpers/file'

function resolveColor (color) {
  color = color.slice(0)
  color[3] = color[3] / 255
  return 'rgba(' + color.join(',') + ')'
}

function processTouches (target, touches) {
  return ([]).map.call(touches, (touch) => {
    var boundingClientRect = target.getBoundingClientRect()
    return {
      identifier: touch.identifier,
      x: touch.clientX - boundingClientRect.left,
      y: touch.clientY - boundingClientRect.top
    }
  })
}

var tempCanvas
function getTempCanvas (width = 0, height = 0) {
  if (!tempCanvas) {
    tempCanvas = document.createElement('canvas')
  }
  tempCanvas.width = width
  tempCanvas.height = height
  return tempCanvas
}

export default {
  name: 'Canvas',
  mixins: [subscriber],
  props: {
    canvasId: {
      type: String,
      default: ''
    },
    disableScroll: {
      type: [Boolean, String],
      default: false
    },
    hidpi: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      actionsWaiting: false
    }
  },
  computed: {
    id () {
      return this.canvasId
    },
    _listeners () {
      var $listeners = Object.assign({}, this.$listeners)
      var events = ['touchstart', 'touchmove', 'touchend']
      events.forEach(event => {
        var existing = $listeners[event]
        var eventHandler = []
        if (existing) {
          eventHandler.push(($event) => {
            this.$trigger(event, Object.assign({}, $event, {
              touches: processTouches($event.currentTarget, $event.touches),
              changedTouches: processTouches($event.currentTarget, $event
                .changedTouches)
            }))
          })
        }
        if (this.disableScroll && event === 'touchmove') {
          eventHandler.push(this._touchmove)
        }
        $listeners[event] = eventHandler
      })
      return $listeners
    },
    pixelRatio () {
      return this.hidpi ? pixelRatio : 1
    }
  },
  created () {
    this._actionsDefer = []
    this._images = {}
  },
  mounted () {
    this._resize()
  },
  beforeDestroy () {
    const canvas = this.$refs.canvas
    canvas.height = canvas.width = 0
  },
  methods: {
    _handleSubscribe ({
      type,
      data = {}
    }) {
      var method = this[type]
      if (type.indexOf('_') !== 0 && typeof method === 'function') {
        method(data)
      }
    },
    _resize (size) {
      var canvas = this.$refs.canvas
      var hasChanged = !size || (canvas.width !== Math.floor(size.width * this.pixelRatio) || canvas.height !== Math.floor(size.height * this.pixelRatio))
      if (!hasChanged) return
      if (canvas.width > 0 && canvas.height > 0) {
        var context = canvas.getContext('2d')
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        wrapper(canvas, this.hidpi)
        context.putImageData(imageData, 0, 0)
      } else {
        wrapper(canvas, this.hidpi)
      }
    },
    _touchmove (event) {
      event.preventDefault()
    },
    actionsChanged ({
      actions,
      reserve,
      callbackId
    }) {
      var self = this
      if (!actions) {
        return
      }
      if (this.actionsWaiting) {
        this._actionsDefer.push([actions, reserve, callbackId])
        return
      }
      var canvas = this.$refs.canvas
      var c2d = canvas.getContext('2d')
      if (!reserve) {
        c2d.fillStyle = '#000000'
        c2d.strokeStyle = '#000000'
        c2d.shadowColor = '#000000'
        c2d.shadowBlur = 0
        c2d.shadowOffsetX = 0
        c2d.shadowOffsetY = 0
        c2d.setTransform(1, 0, 0, 1, 0, 0)
        c2d.clearRect(0, 0, canvas.width, canvas.height)
      }
      this.preloadImage(actions)
      for (let index = 0; index < actions.length; index++) {
        const action = actions[index]
        let method = action.method
        const data = action.data
        if (/^set/.test(method) && method !== 'setTransform') {
          const method1 = method[3].toLowerCase() + method.slice(4)
          let color
          if (method1 === 'fillStyle' || method1 === 'strokeStyle') {
            if (data[0] === 'normal') {
              color = resolveColor(data[1])
            } else if (data[0] === 'linear') {
              const LinearGradient = c2d.createLinearGradient(...data[1])
              data[2].forEach(function (data2) {
                const offset = data2[0]
                const color = resolveColor(data2[1])
                LinearGradient.addColorStop(offset, color)
              })
              color = LinearGradient
            } else if (data[0] === 'radial') {
              const x = data[1][0]
              const y = data[1][1]
              const r = data[1][2]
              const LinearGradient = c2d.createRadialGradient(x, y, 0, x, y, r)
              data[2].forEach(function (data2) {
                const offset = data2[0]
                const color = resolveColor(data2[1])
                LinearGradient.addColorStop(offset, color)
              })
              color = LinearGradient
            } else if (data[0] === 'pattern') {
              const loaded = this.checkImageLoaded(data[1], actions.slice(index + 1), callbackId,
                function (image) {
                  if (image) {
                    c2d[method1] = c2d.createPattern(image, data[2])
                  }
                })
              if (!loaded) {
                break
              }
              continue
            }
            c2d[method1] = color
          } else if (method1 === 'globalAlpha') {
            c2d[method1] = data[0] / 255
          } else if (method1 === 'shadow') {
            var _ = ['shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowColor']
            data.forEach(function (color_, method_) {
              c2d[_[method_]] = _[method_] === 'shadowColor' ? resolveColor(color_) : color_
            })
          } else if (method1 === 'fontSize') {
            const font = c2d.__font__ || c2d.font
            c2d.__font__ = c2d.font = font.replace(/\d+\.?\d*px/, data[0] + 'px')
          } else if (method1 === 'lineDash') {
            c2d.setLineDash(data[0])
            c2d.lineDashOffset = data[1] || 0
          } else if (method1 === 'textBaseline') {
            if (data[0] === 'normal') {
              data[0] = 'alphabetic'
            }
            c2d[method1] = data[0]
          } else if (method1 === 'font') {
            c2d.__font__ = c2d.font = data[0]
          } else {
            c2d[method1] = data[0]
          }
        } else if (method === 'fillPath' || method === 'strokePath') {
          method = method.replace(/Path/, '')
          c2d.beginPath()
          data.forEach(function (data_) {
            c2d[data_.method].apply(c2d, data_.data)
          })
          c2d[method]()
        } else if (method === 'fillText') {
          c2d.fillText.apply(c2d, data)
        } else if (method === 'drawImage') {
          var A = (function () {
            var dataArray = [...data]
            var url = dataArray[0]
            var otherData = dataArray.slice(1)
            self._images = self._images || {}
            if (!self.checkImageLoaded(url, actions.slice(index + 1), callbackId, function (
              image) {
              if (image) {
                c2d.drawImage.apply(c2d, [image].concat([...otherData.slice(4, 8)],
                  [...otherData.slice(0, 4)]))
              }
            })) return 'break'
          }())
          if (A === 'break') {
            break
          }
        } else {
          if (method === 'clip') {
            data.forEach(function (data_) {
              c2d[data_.method].apply(c2d, data_.data)
            })
            c2d.clip()
          } else {
            c2d[method].apply(c2d, data)
          }
        }
      }
      if (!this.actionsWaiting && callbackId) {
        UniViewJSBridge.publishHandler('onCanvasMethodCallback', {
          callbackId,
          data: {
            errMsg: 'drawCanvas:ok'
          }
        }, this.$page.id)
      }
    },
    preloadImage: function (actions) {
      var self = this
      actions.forEach(function (action) {
        var method = action.method
        var data = action.data
        var src = ''
        if (method === 'drawImage') {
          src = data[0]
          src = self.$getRealPath(src)
          data[0] = src
        } else if (method === 'setFillStyle' && data[0] === 'pattern') {
          src = data[1]
          src = self.$getRealPath(src)
          data[1] = src
        }
        if (src && !self._images[src]) {
          loadImage()
        }
        /**
         * 加载图像
         */
        function loadImage () {
          const image = self._images[src] = new Image()
          image.onload = function () {
            image.ready = true
          }

          // 安卓 WebView 除本地路径无跨域问题
          if (__PLATFORM__ === 'app-plus' && navigator.vendor === 'Google Inc.') {
            if (src.indexOf('file://') === 0) {
              image.crossOrigin = 'anonymous'
            }
            image.src = src
            return
          }
          getSameOriginUrl(src).then(src => {
            image.src = src
          }).catch(() => {
            image.src = src
          })
        }
      })
    },
    checkImageLoaded: function (src, actions, callbackId, fn) {
      var self = this
      var image = this._images[src]
      if (image.ready) {
        fn(image)
        return true
      } else {
        this._actionsDefer.unshift([actions, true])
        this.actionsWaiting = true
        image.onload = function () {
          image.ready = true
          fn(image)
          self.actionsWaiting = false
          var actions = self._actionsDefer.slice(0)
          self._actionsDefer = []
          for (var action = actions.shift(); action;) {
            self.actionsChanged({
              actions: action[0],
              reserve: action[1],
              callbackId
            })
            action = actions.shift()
          }
        }
        return false
      }
    },
    getImageData ({
      x = 0,
      y = 0,
      width,
      height,
      destWidth,
      destHeight,
      hidpi = true,
      dataType,
      quality = 1,
      type = 'png',
      callbackId
    }) {
      const canvas = this.$refs.canvas
      let data
      const maxWidth = canvas.offsetWidth - x
      width = width ? Math.min(width, maxWidth) : maxWidth
      const maxHeight = canvas.offsetHeight - y
      height = height ? Math.min(height, maxHeight) : maxHeight
      if (!hidpi) {
        if (!destWidth && !destHeight) {
          destWidth = Math.round(width * this.pixelRatio)
          destHeight = Math.round(height * this.pixelRatio)
        } else if (!destWidth) {
          destWidth = Math.round(width / height * destHeight)
        } else if (!destHeight) {
          destHeight = Math.round(height / width * destWidth)
        }
      } else {
        destWidth = width
        destHeight = height
      }
      const newCanvas = getTempCanvas(destWidth, destHeight)
      const context = newCanvas.getContext('2d')
      if (type === 'jpeg' || type === 'jpg') {
        type = 'jpeg'
        context.fillStyle = '#fff'
        context.fillRect(0, 0, destWidth, destHeight)
      }
      context.__hidpi__ = true
      context.drawImageByCanvas(canvas, x, y, width, height, 0, 0, destWidth, destHeight, false)
      let result
      try {
        let compressed
        if (dataType === 'base64') {
          data = newCanvas.toDataURL(`image/${type}`, quality)
        } else {
          const imgData = context.getImageData(0, 0, destWidth, destHeight)
          if (__PLATFORM__ === 'app-plus') {
            const pako = require('pako')
            data = pako.deflateRaw(imgData.data, { to: 'string' })
            compressed = true
          } else {
            // fix [...]展开TypedArray在低版本手机报错的问题，使用Array.prototype.slice
            data = Array.prototype.slice.call(imgData.data)
          }
        }
        result = {
          errMsg: 'canvasGetImageData:ok',
          data,
          compressed,
          width: destWidth,
          height: destHeight
        }
      } catch (error) {
        result = {
          errMsg: `canvasGetImageData:fail ${error}`
        }
      }
      newCanvas.height = newCanvas.width = 0
      context.__hidpi__ = false
      if (!callbackId) {
        return result
      } else {
        UniViewJSBridge.publishHandler('onCanvasMethodCallback', {
          callbackId,
          data: result
        }, this.$page.id)
      }
    },
    putImageData ({
      data,
      x,
      y,
      width,
      height,
      compressed,
      callbackId
    }) {
      try {
        if (__PLATFORM__ === 'app-plus' && compressed) {
          const pako = require('pako')
          data = pako.inflateRaw(data)
        }
        if (!height) {
          height = Math.round(data.length / 4 / width)
        }
        const canvas = getTempCanvas(width, height)
        const context = canvas.getContext('2d')
        context.putImageData(new ImageData(new Uint8ClampedArray(data), width, height), 0, 0)
        this.$refs.canvas.getContext('2d').drawImage(canvas, x, y, width, height)
        canvas.height = canvas.width = 0
      } catch (error) {
        UniViewJSBridge.publishHandler('onCanvasMethodCallback', {
          callbackId,
          data: {
            errMsg: 'canvasPutImageData:fail'
          }
        }, this.$page.id)
        return
      }
      UniViewJSBridge.publishHandler('onCanvasMethodCallback', {
        callbackId,
        data: {
          errMsg: 'canvasPutImageData:ok'
        }
      }, this.$page.id)
    },
    toTempFilePath ({
      x = 0,
      y = 0,
      width,
      height,
      destWidth,
      destHeight,
      fileType,
      quality,
      dirname,
      callbackId
    }) {
      const res = this.getImageData({
        x,
        y,
        width,
        height,
        destWidth,
        destHeight,
        hidpi: false,
        dataType: 'base64',
        type: fileType,
        quality
      })
      if (!res.data || !res.data.length) {
        UniViewJSBridge.publishHandler('onCanvasMethodCallback', {
          callbackId,
          data: {
            errMsg: res.errMsg.replace('canvasPutImageData', 'toTempFilePath')
          }
        }, this.$page.id)
        return
      }
      saveImage(res.data, dirname, (error, tempFilePath) => {
        let errMsg = `toTempFilePath:${error ? 'fail' : 'ok'}`
        if (error) {
          errMsg += ` ${error.message}`
        }
        UniViewJSBridge.publishHandler('onCanvasMethodCallback', {
          callbackId,
          data: {
            errMsg,
            tempFilePath: tempFilePath
          }
        }, this.$page.id)
      })
    }
  }
}
</script>
<style>
uni-canvas {
  width: 300px;
  height: 150px;
  display: block;
  position: relative;
}

uni-canvas > canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
