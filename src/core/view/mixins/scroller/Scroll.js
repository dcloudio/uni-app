import { Friction } from './Friction'
import { Spring } from './Spring'

export function Scroll (extent, friction, spring) {
  this._extent = extent
  this._friction = friction || new Friction(0.01)
  this._spring = spring || new Spring(1, 90, 20)
  this._startTime = 0
  this._springing = false
  this._springOffset = 0
}

Scroll.prototype.snap = function (e, t) {
  this._springOffset = 0
  this._springing = true
  this._spring.snap(e)
  this._spring.setEnd(t)
}
Scroll.prototype.set = function (e, t) {
  this._friction.set(e, t)
  if (e > 0 && t >= 0) {
    this._springOffset = 0
    this._springing = true
    this._spring.snap(e)
    this._spring.setEnd(0)
  } else {
    if (e < -this._extent && t <= 0) {
      this._springOffset = 0
      this._springing = true
      this._spring.snap(e)
      this._spring.setEnd(-this._extent)
    } else {
      this._springing = false
    }
  }
  this._startTime = (new Date()).getTime()
}
Scroll.prototype.x = function (e) {
  if (!this._startTime) {
    return 0
  }
  if (!e) {
    e = ((new Date()).getTime() - this._startTime) / 1e3
  }
  if (this._springing) {
    return this._spring.x() + this._springOffset
  }
  var t = this._friction.x(e)
  var n = this.dx(e)
  if ((t > 0 && n >= 0) || (t < -this._extent && n <= 0)) {
    this._springing = true
    this._spring.setEnd(0, n)
    if (t < -this._extent) {
      this._springOffset = -this._extent
    } else {
      this._springOffset = 0
    }
    t = this._spring.x() + this._springOffset
  }
  return t
}
Scroll.prototype.dx = function (e) {
  var t = 0
  t = this._lastTime === e ? this._lastDx : this._springing ? this._spring.dx(e) : this._friction.dx(e)
  this._lastTime = e
  this._lastDx = t
  return t
}
Scroll.prototype.done = function () {
  return this._springing ? this._spring.done() : this._friction.done()
}
Scroll.prototype.setVelocityByEnd = function (e) {
  this._friction.setVelocityByEnd(e)
}
Scroll.prototype.configuration = function () {
  var e = this._friction.configuration()
  e.push.apply(e, this._spring.configuration())
  return e
}
