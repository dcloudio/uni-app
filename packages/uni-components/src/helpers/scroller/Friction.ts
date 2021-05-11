export class Friction {
  _drag: number
  _dragLog: number
  _x: number
  _v: number
  _startTime: number
  _dt?: number
  _powDragDt?: number
  constructor(drag: number) {
    this._drag = drag
    this._dragLog = Math.log(drag)
    this._x = 0
    this._v = 0
    this._startTime = 0
  }
  set(x: number, v: number) {
    this._x = x
    this._v = v
    this._startTime = new Date().getTime()
  }
  setVelocityByEnd(e: number) {
    this._v = ((e - this._x) * this._dragLog) / (Math.pow(this._drag, 100) - 1)
  }
  x(e?: number) {
    if (e === undefined) {
      e = (new Date().getTime() - this._startTime) / 1e3
    }
    const t =
      e === this._dt && this._powDragDt
        ? this._powDragDt
        : (this._powDragDt = Math.pow(this._drag, e))
    this._dt = e
    return this._x + (this._v * t) / this._dragLog - this._v / this._dragLog
  }
  dx(e?: number) {
    if (e === undefined) {
      e = (new Date().getTime() - this._startTime) / 1e3
    }
    const t =
      e === this._dt && this._powDragDt
        ? this._powDragDt
        : (this._powDragDt = Math.pow(this._drag, e))
    this._dt = e
    return this._v * t
  }
  done() {
    return Math.abs(this.dx()) < 3
  }
  reconfigure(e: number) {
    const t = this.x()
    const n = this.dx()
    this._drag = e
    this._dragLog = Math.log(e)
    this.set(t, n)
  }
  configuration() {
    const e = this
    return [
      {
        label: 'Friction',
        read: function () {
          return e._drag
        },
        write: function (t: number) {
          e.reconfigure(t)
        },
        min: 0.001,
        max: 0.1,
        step: 0.001,
      },
    ]
  }
}
