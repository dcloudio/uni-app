export function R (e) {
  this._drag = e
  this._dragLog = Math.log(e)
  this._x = 0
  this._v = 0
  this._startTime = 0
}

R.prototype.set = function (e, t) {
  this._x = e
  this._v = t
  this._startTime = (new Date()).getTime()
}
R.prototype.setVelocityByEnd = function (e) {
  this._v = (e - this._x) * this._dragLog / (Math.pow(this._drag, 100) - 1)
}
R.prototype.x = function (e) {
  if (e === undefined) {
    e = ((new Date()).getTime() - this._startTime) / 1e3
  }
  var t
  t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e)
  this._dt = e
  return this._x + this._v * t / this._dragLog - this._v / this._dragLog
}
R.prototype.dx = function (e) {
  if (e === undefined) {
    e = ((new Date()).getTime() - this._startTime) / 1e3
  }
  var t
  t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e)
  this._dt = e
  return this._v * t
}
R.prototype.done = function () {
  return Math.abs(this.dx()) < 3
}
R.prototype.reconfigure = function (e) {
  var t = this.x()
  var n = this.dx()
  this._drag = e
  this._dragLog = Math.log(e)
  this.set(t, n)
}
R.prototype.configuration = function () {
  var e = this
  return [{
    label: 'Friction',
    read: function () {
      return e._drag
    },
    write: function (t) {
      e.reconfigure(t)
    },
    min: 0.001,
    max: 0.1,
    step: 0.001
  }]
}
