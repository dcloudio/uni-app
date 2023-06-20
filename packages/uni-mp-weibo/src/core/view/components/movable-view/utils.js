function e (e, t, n) {
  return e > t - n && e < t + n
}

function t (t, n) {
  return e(t, 0, n)
}

export function Decline () { }
Decline.prototype.x = function (e) {
  return Math.sqrt(e)
}

export function Friction (e, t) {
  this._m = e
  this._f = 1e3 * t
  this._startTime = 0
  this._v = 0
}
Friction.prototype.setV = function (x, y) {
  var n = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5)
  this._x_v = x
  this._y_v = y
  this._x_a = -this._f * this._x_v / n
  this._y_a = -this._f * this._y_v / n
  this._t = Math.abs(x / this._x_a) || Math.abs(y / this._y_a)
  this._lastDt = null
  this._startTime = (new Date()).getTime()
}
Friction.prototype.setS = function (x, y) {
  this._x_s = x
  this._y_s = y
}
Friction.prototype.s = function (t) {
  if (undefined === t) {
    t = ((new Date()).getTime() - this._startTime) / 1e3
  }
  if (t > this._t) {
    t = this._t
    this._lastDt = t
  }
  var x = this._x_v * t + 0.5 * this._x_a * Math.pow(t, 2) + this._x_s
  var y = this._y_v * t + 0.5 * this._y_a * Math.pow(t, 2) + this._y_s
  if ((this._x_a > 0 && x < this._endPositionX) || (this._x_a < 0 && x > this._endPositionX)) {
    x = this._endPositionX
  }
  if ((this._y_a > 0 && y < this._endPositionY) || (this._y_a < 0 && y > this._endPositionY)) {
    y = this._endPositionY
  }
  return {
    x,
    y
  }
}
Friction.prototype.ds = function (t) {
  if (undefined === t) {
    t = ((new Date()).getTime() - this._startTime) / 1e3
  }
  if (t > this._t) {
    t = this._t
  }
  return {
    dx: this._x_v + this._x_a * t,
    dy: this._y_v + this._y_a * t
  }
}
Friction.prototype.delta = function () {
  return {
    x: -1.5 * Math.pow(this._x_v, 2) / this._x_a || 0,
    y: -1.5 * Math.pow(this._y_v, 2) / this._y_a || 0
  }
}
Friction.prototype.dt = function () {
  return -this._x_v / this._x_a
}
Friction.prototype.done = function () {
  var t = e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY) || this._lastDt === this._t
  this._lastDt = null
  return t
}
Friction.prototype.setEnd = function (x, y) {
  this._endPositionX = x
  this._endPositionY = y
}
Friction.prototype.reconfigure = function (m, f) {
  this._m = m
  this._f = 1e3 * f
}

export function Spring (m, k, c) {
  this._m = m
  this._k = k
  this._c = c
  this._solution = null
  this._endPosition = 0
  this._startTime = 0
}
Spring.prototype._solve = function (e, t) {
  var n = this._c
  var i = this._m
  var r = this._k
  var o = n * n - 4 * i * r
  if (o === 0) {
    const a = -n / (2 * i)
    const s = e
    const l = t / (a * e)
    return {
      x: function (e) {
        return (s + l * e) * Math.pow(Math.E, a * e)
      },
      dx: function (e) {
        var t = Math.pow(Math.E, a * e)
        return a * (s + l * e) * t + l * t
      }
    }
  }
  if (o > 0) {
    const c = (-n - Math.sqrt(o)) / (2 * i)
    const u = (-n + Math.sqrt(o)) / (2 * i)
    const d = (t - c * e) / (u - c)
    const h = e - d
    return {
      x: function (e) {
        var t
        var n
        if (e === this._t) {
          t = this._powER1T
          n = this._powER2T
        }
        this._t = e
        if (!t) {
          t = this._powER1T = Math.pow(Math.E, c * e)
        }
        if (!n) {
          n = this._powER2T = Math.pow(Math.E, u * e)
        }
        return h * t + d * n
      },
      dx: function (e) {
        var t
        var n
        if (e === this._t) {
          t = this._powER1T
          n = this._powER2T
        }
        this._t = e
        if (!t) {
          t = this._powER1T = Math.pow(Math.E, c * e)
        }
        if (!n) {
          n = this._powER2T = Math.pow(Math.E, u * e)
        }
        return h * c * t + d * u * n
      }
    }
  }
  var p = Math.sqrt(4 * i * r - n * n) / (2 * i)
  var f = -n / 2 * i
  var v = e
  var g = (t - f * e) / p
  return {
    x: function (e) {
      return Math.pow(Math.E, f * e) * (v * Math.cos(p * e) + g * Math.sin(p * e))
    },
    dx: function (e) {
      var t = Math.pow(Math.E, f * e)
      var n = Math.cos(p * e)
      var i = Math.sin(p * e)
      return t * (g * p * n - v * p * i) + f * t * (g * i + v * n)
    }
  }
}
Spring.prototype.x = function (e) {
  if (undefined === e) {
    e = ((new Date()).getTime() - this._startTime) / 1e3
  }
  return this._solution ? this._endPosition + this._solution.x(e) : 0
}
Spring.prototype.dx = function (e) {
  if (undefined === e) {
    e = ((new Date()).getTime() - this._startTime) / 1e3
  }
  return this._solution ? this._solution.dx(e) : 0
}
Spring.prototype.setEnd = function (e, n, i) {
  if (!i) {
    i = (new Date()).getTime()
  }
  if (e !== this._endPosition || !t(n, 0.1)) {
    n = n || 0
    var r = this._endPosition
    if (this._solution) {
      if (t(n, 0.1)) {
        n = this._solution.dx((i - this._startTime) / 1e3)
      }
      r = this._solution.x((i - this._startTime) / 1e3)
      if (t(n, 0.1)) {
        n = 0
      }
      if (t(r, 0.1)) {
        r = 0
      }
      r += this._endPosition
    }
    if (!(this._solution && t(r - e, 0.1) && t(n, 0.1))) {
      this._endPosition = e
      this._solution = this._solve(r - this._endPosition, n)
      this._startTime = i
    }
  }
}
Spring.prototype.snap = function (e) {
  this._startTime = (new Date()).getTime()
  this._endPosition = e
  this._solution = {
    x: function () {
      return 0
    },
    dx: function () {
      return 0
    }
  }
}
Spring.prototype.done = function (n) {
  if (!n) {
    n = (new Date()).getTime()
  }
  return e(this.x(), this._endPosition, 0.1) && t(this.dx(), 0.1)
}
Spring.prototype.reconfigure = function (m, t, c) {
  this._m = m
  this._k = t
  this._c = c
  if (!this.done()) {
    this._solution = this._solve(this.x() - this._endPosition, this.dx())
    this._startTime = (new Date()).getTime()
  }
}
Spring.prototype.springConstant = function () {
  return this._k
}
Spring.prototype.damping = function () {
  return this._c
}
Spring.prototype.configuration = function () {
  function e (e, t) {
    e.reconfigure(1, t, e.damping())
  }

  function t (e, t) {
    e.reconfigure(1, e.springConstant(), t)
  }
  return [{
    label: 'Spring Constant',
    read: this.springConstant.bind(this),
    write: e.bind(this, this),
    min: 100,
    max: 1e3
  }, {
    label: 'Damping',
    read: this.damping.bind(this),
    write: t.bind(this, this),
    min: 1,
    max: 500
  }]
}

export function STD (e, t, n) {
  this._springX = new Spring(e, t, n)
  this._springY = new Spring(e, t, n)
  this._springScale = new Spring(e, t, n)
  this._startTime = 0
}
STD.prototype.setEnd = function (e, t, n, i) {
  var r = (new Date()).getTime()
  this._springX.setEnd(e, i, r)
  this._springY.setEnd(t, i, r)
  this._springScale.setEnd(n, i, r)
  this._startTime = r
}
STD.prototype.x = function () {
  var e = ((new Date()).getTime() - this._startTime) / 1e3
  return {
    x: this._springX.x(e),
    y: this._springY.x(e),
    scale: this._springScale.x(e)
  }
}
STD.prototype.done = function () {
  var e = (new Date()).getTime()
  return this._springX.done(e) && this._springY.done(e) && this._springScale.done(e)
}
STD.prototype.reconfigure = function (e, t, n) {
  this._springX.reconfigure(e, t, n)
  this._springY.reconfigure(e, t, n)
  this._springScale.reconfigure(e, t, n)
}
