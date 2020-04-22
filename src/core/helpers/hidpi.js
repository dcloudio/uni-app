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

      this.font = this.font.replace(
        /(\d+)(px|em|rem|pt)/g,
        function (w, m, u) {
          return (m * pixelRatio) + u
        }
      )

      _super.apply(this, args)

      this.font = this.font.replace(
        /(\d+)(px|em|rem|pt)/g,
        function (w, m, u) {
          return (m / pixelRatio) + u
        }
      )
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

      this.font = this.font.replace(
        /(\d+)(px|em|rem|pt)/g,
        function (w, m, u) {
          return (m * pixelRatio) + u
        }
      )

      _super.apply(this, args)

      this.font = this.font.replace(
        /(\d+)(px|em|rem|pt)/g,
        function (w, m, u) {
          return (m / pixelRatio) + u
        }
      )
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

export function wrapper (canvas) {
  canvas.width = canvas.offsetWidth * pixelRatio
  canvas.height = canvas.offsetHeight * pixelRatio
  canvas.getContext('2d').__hidpi__ = true
}
