import { hasOwn } from '@vue/shared'

export const pixelRatio = __NODE_JS__
  ? 1
  : /*#__PURE__*/ (function () {
      const canvas = document.createElement('canvas')
      canvas.height = canvas.width = 0
      const context = canvas.getContext('2d')
      const backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1
      return (window.devicePixelRatio || 1) / backingStore
    })()

export function wrapper(canvas, hidpi = true) {
  canvas.width = canvas.offsetWidth * (hidpi ? pixelRatio : 1)
  canvas.height = canvas.offsetHeight * (hidpi ? pixelRatio : 1)
  canvas.getContext('2d').__hidpi__ = hidpi
}

let isHidpi = false
export function initHidpi() {
  if (isHidpi) {
    return
  }
  isHidpi = true
  const forEach = function (obj, func) {
    for (const key in obj) {
      if (hasOwn(obj, key)) {
        func(obj[key], key)
      }
    }
  }
  const ratioArgs = {
    fillRect: 'all',
    clearRect: 'all',
    strokeRect: 'all',
    moveTo: 'all',
    lineTo: 'all',
    arc: [0, 1, 2],
    arcTo: 'all',
    bezierCurveTo: 'all',
    isPointinPath: 'all',
    isPointinStroke: 'all',
    quadraticCurveTo: 'all',
    rect: 'all',
    translate: 'all',
    createRadialGradient: 'all',
    createLinearGradient: 'all',
    setTransform: [4, 5],
  }

  const proto = CanvasRenderingContext2D.prototype

  proto.drawImageByCanvas = (function (_super) {
    return function (
      canvas,
      srcx,
      srcy,
      srcw,
      srch,
      desx,
      desy,
      desw,
      desh,
      isScale
    ) {
      if (!this.__hidpi__) {
        return _super.apply(this, arguments)
      }
      srcx *= pixelRatio
      srcy *= pixelRatio
      srcw *= pixelRatio
      srch *= pixelRatio
      desx *= pixelRatio
      desy *= pixelRatio
      desw = isScale ? desw * pixelRatio : desw
      desh = isScale ? desh * pixelRatio : desh
      _super.call(this, canvas, srcx, srcy, srcw, srch, desx, desy, desw, desh)
    }
  })(proto.drawImage)

  if (pixelRatio !== 1) {
    forEach(ratioArgs, function (value, key) {
      proto[key] = (function (_super) {
        return function () {
          if (!this.__hidpi__) {
            return _super.apply(this, arguments)
          }

          let args = Array.prototype.slice.call(arguments)

          if (value === 'all') {
            args = args.map(function (a) {
              return a * pixelRatio
            })
          } else if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              args[value[i]] *= pixelRatio
            }
          }
          return _super.apply(this, args)
        }
      })(proto[key])
    })

    proto.stroke = (function (_super) {
      return function () {
        if (!this.__hidpi__) {
          return _super.apply(this, arguments)
        }
        this.lineWidth *= pixelRatio
        _super.apply(this, arguments)
        this.lineWidth /= pixelRatio
      }
    })(proto.stroke)

    proto.fillText = (function (_super) {
      return function () {
        if (!this.__hidpi__) {
          return _super.apply(this, arguments)
        }
        const args = Array.prototype.slice.call(arguments)

        args[1] *= pixelRatio
        args[2] *= pixelRatio
        // 因为 canvasCtx.fillText 的第 4 个参数为可选参数，用户可能不传，
        // 所以在处理时需要判断一下，否则 undefined * pixelRatio => NaN，
        // 会导致 canvas 无法绘制。
        if (args[3] && typeof args[3] === 'number') {
          args[3] *= pixelRatio
        } 

        var font = this.font
        this.font = font.replace(
          /(\d+\.?\d*)(px|em|rem|pt)/g,
          function (w, m, u) {
            return m * pixelRatio + u
          }
        )

        _super.apply(this, args)

        this.font = font
      }
    })(proto.fillText)

    proto.strokeText = (function (_super) {
      return function () {
        if (!this.__hidpi__) {
          return _super.apply(this, arguments)
        }
        var args = Array.prototype.slice.call(arguments)

        args[1] *= pixelRatio // x
        args[2] *= pixelRatio // y
        // 因为 canvasCtx.strokeText 的第 4 个参数为可选参数，用户可能不传，
        // 所以在处理时需要判断一下，否则 undefined * pixelRatio => NaN，
        // 会导致 canvas 无法绘制。
        if (args[3] && typeof args[3] === 'number') {
          args[3] *= pixelRatio
        } 

        var font = this.font
        this.font = font.replace(
          /(\d+\.?\d*)(px|em|rem|pt)/g,
          function (w, m, u) {
            return m * pixelRatio + u
          }
        )
        _super.apply(this, args)

        this.font = font
      }
    })(proto.strokeText)

    proto.drawImage = (function (_super) {
      return function () {
        if (!this.__hidpi__) {
          return _super.apply(this, arguments)
        }
        this.scale(pixelRatio, pixelRatio)
        _super.apply(this, arguments)
        this.scale(1 / pixelRatio, 1 / pixelRatio)
      }
    })(proto.drawImage)
  }
}
