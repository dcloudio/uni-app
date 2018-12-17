<template>
  <uni-canvas>
    <canvas
      ref="canvas"
      :canvas-id="canvasId"
      :disable-scroll="disableScroll"
      :width="width"
      :height="height"
      @touchmove="_touchmove"
    />
  </uni-canvas>
</template>
<script>
import {
  subscriber
} from 'uni-mixins'

function resolveColor (color) {
  color = color.slice(0)
  color[3] = color[3] / 255
  return 'rgba(' + color.join(',') + ')'
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
    }
  },
  data () {
    return {
      width: 300,
      height: 150,
      actionsWaiting: false
    }
  },
  computed: {
    id () {
      return this.canvasId
    }
  },
  created () {
    this._actionsDefer = []
    this._images = {}
  },
  mounted () {
    var canvas = this.$refs.canvas
    this.width = canvas.offsetWidth
    this.height = canvas.offsetHeight
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
    _touchmove (event) {
      if (this.disableScroll) {
        event.preventDefault()
      }
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
        let action = actions[index]
        let method = action.method
        let data = action.data
        if (/^set/.test(method) && method !== 'setTransform') {
          let method1 = method[3].toLowerCase() + method.slice(4)
          let color
          if (method1 === 'fillStyle' || method1 === 'strokeStyle') {
            if (data[0] === 'normal') {
              color = resolveColor(data[1])
            } else if (data[0] === 'linear') {
              let LinearGradient = c2d.createLinearGradient(...data[1])
              data[2].forEach(function (data2) {
                let offset = data2[0]
                let color = resolveColor(data2[1])
                LinearGradient.addColorStop(offset, color)
              })
            } else if (data[0] === 'radial') {
              let x = data[1][0]
              let y = data[1][1]
              let r = data[1][2]
              let LinearGradient = c2d.createRadialGradient(x, y, 0, x, y, r)
              data[2].forEach(function (data2) {
                let offset = data2[0]
                let color = resolveColor(data2[1])
                LinearGradient.addColorStop(offset, color)
              })
            } else if (data[0] === 'pattern') {
              let loaded = this.checkImageLoaded(data[1], actions.slice(index + 1), callbackId, function (image) {
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
          } else {
            if (method1 === 'fontSize') {
              c2d.font = c2d.font.replace(/\d+\.?\d*px/, data[0] + 'px')
            } else {
              if (method1 === 'lineDash') {
                c2d.setLineDash(data[0])
                c2d.lineDashOffset = data[1] || 0
              } else {
                if (method1 === 'textBaseline') {
                  if (data[0] === 'normal') {
                    data[0] = 'alphabetic'
                  }
                  c2d[method1] = data[0]
                } else {
                  c2d[method1] = data[0]
                }
              }
            }
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
            if (!self.checkImageLoaded(url, actions.slice(index + 1), callbackId, function (image) {
              if (image) {
                c2d.drawImage.apply(c2d, [image].concat([...otherData.slice(4, 8)], [...otherData.slice(0, 4)]))
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
        UniViewJSBridge.publishHandler('onDrawCanvas', {
          callbackId,
          data: {
            errMsg: 'drawCanvas:ok'
          }
        }, this.$page.id)
      }
    },
    preloadImage: function (actions) {
      var sefl = this
      actions.forEach(function (action) {
        var method = action.method
        var data = action.data
        var src = ''
        if (method === 'drawImage') {
          src = data[0]
          src = sefl.$getRealPath(src)
          data[0] = src
        } else if (method === 'setFillStyle' && data[0] === 'pattern') {
          src = data[1]
          src = sefl.$getRealPath(src)
          data[1] = src
        }
        if (src && !sefl._images[src]) {
          loadImage()
        }
        /**
         * 加载图像
         */
        function loadImage () {
          sefl._images[src] = new Image()
          sefl._images[src].onload = function () {
            sefl._images[src].ready = true
          }
          /**
           * 从Blob加载
           * @param {Blob} blob
           */
          function loadBlob (blob) {
            sefl._images[src].src = window.URL.createObjectURL(blob)
          }
          /**
           * 从本地文件加载
           * @param {string} path 文件路径
           */
          function loadFile (path) {
            var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
            bitmap.load(path, function () {
              sefl._images[src].src = bitmap.toBase64Data()
              bitmap.clear()
            }, function () {
              bitmap.clear()
              console.error('preloadImage error')
            })
          }
          /**
           * 从网络加载
           * @param {string} url 文件地址
           */
          function loadUrl (url) {
            function plusDownload () {
              plus.downloader.createDownload(url, {
                filename: '_doc/uniapp_temp/download/'
              }, function (d, status) {
                if (status === 200) {
                  loadFile(d.filename)
                }
              }).start()
            }
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.responseType = 'blob'
            xhr.onload = function () {
              if (this.status === 200) {
                loadBlob(this.response)
              }
            }
            xhr.onerror = plusDownload
            xhr.send()
          }
          // 解决 plus-app wkwebview 图像跨域问题
          if (window.plus && window.webkit && window.webkit.messageHandlers) {
            if (src.indexOf('http://') === 0 || src.indexOf('https://') === 0) {
              loadUrl(src)
            } else if (/^data:[a-z-]+\/[a-z-]+;base64,/.test(src)) {
              sefl._images[src].src = src
            } else {
              loadFile(src)
            }
          } else {
            sefl._images[src].src = src
          }
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
      x,
      y,
      width,
      height,
      callbackId
    }) {
      var imgData
      var canvas = this.$refs.canvas
      if (!width) {
        width = canvas.width
      }
      if (!height) {
        height = canvas.height
      }
      try {
        imgData = canvas.getContext('2d').getImageData(x, y, width, height)
      } catch (error) {
        UniViewJSBridge.publishHandler('onCanvasMethodCallback', {
          callbackId,
          data: {
            errMsg: 'canvasGetImageData:fail'
          }
        }, this.$page.id)
        return
      }
      UniViewJSBridge.publishHandler('onCanvasMethodCallback', {
        callbackId,
        data: {
          errMsg: 'canvasGetImageData:ok',
          data: [...imgData.data],
          width,
          height
        }
      }, this.$page.id)
    },
    putImageData ({
      data,
      x,
      y,
      width,
      height,
      callbackId
    }) {
      try {
        if (!height) {
          height = data.length / 4 / width
        }
        this.$refs.canvas.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(data), width, height), x, y)
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
