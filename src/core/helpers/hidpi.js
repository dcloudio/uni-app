import {
  hasOwn
}
  from 'uni-shared'

export const pixelRatio = (function () {
  const canvas = document.createElement('canvas')
  canvas.height = canvas.width = 0
  const context = canvas.getContext('2d')
  const backingStore = context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1
  return (window.devicePixelRatio || 1) / backingStore
})()

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
  transform: [4, 5],
  setTransform: [4, 5]
}

const proto = CanvasRenderingContext2D.prototype

proto.drawImageByCanvas = (function (_super) {
  return function (canvas, srcx, srcy, srcw, srch, desx, desy, desw, desh, isScale) {
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
      args[3] *= pixelRatio
      isNaN(args[3]) && (args.length = 3)

      // Safari 重新设置部分属性会导致其他值恢复默认，需获取原始值
      var font = this.__font__ || this.font
      this.font = font.replace(
        /(\d+\.?\d*)(px|em|rem|pt)/g,
        function (w, m, u) {
          return (m * pixelRatio) + u
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
      const args = Array.prototype.slice.call(arguments)

      args[1] *= pixelRatio // x
      args[2] *= pixelRatio // y
      args[3] *= pixelRatio // maxWidth
      isNaN(args[3]) && (args.length = 3)

      // Safari 重新设置部分属性会导致其他值恢复默认，需获取原始值
      var font = this.__font__ || this.font
      this.font = font.replace(
        /(\d+\.?\d*)(px|em|rem|pt)/g,
        function (w, m, u) {
          return (m * pixelRatio) + u
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

export function wrapper (canvas, hidpi = true) {
  canvas.width = canvas.offsetWidth * (hidpi ? pixelRatio : 1)
  canvas.height = canvas.offsetHeight * (hidpi ? pixelRatio : 1)
  canvas.__hidpi__ = hidpi
  // 避免低版本安卓上 context 实例被回收
  canvas.__context2d__ = canvas.getContext('2d')
  canvas.__context2d__.__hidpi__ = hidpi
}
