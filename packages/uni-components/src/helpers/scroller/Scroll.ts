import { Friction } from './Friction'
import { Spring } from './Spring'

export class Scroll {
  _extent: number
  _friction: Friction
  _spring: Spring
  _startTime: number
  _springing: boolean
  _springOffset: number
  _lastTime?: number
  _lastDx?: number
  constructor(extent: number, friction?: Friction, spring?: Spring) {
    this._extent = extent
    this._friction = friction || new Friction(0.01)
    this._spring = spring || new Spring(1, 90, 20)
    this._startTime = 0
    this._springing = false
    this._springOffset = 0
  }
  snap(e: number, t: number) {
    this._springOffset = 0
    this._springing = true
    this._spring.snap(e)
    this._spring.setEnd(t)
  }
  set(e: number, t: number) {
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
    this._startTime = new Date().getTime()
  }
  x(e: number) {
    if (!this._startTime) {
      return 0
    }
    if (!e) {
      e = (new Date().getTime() - this._startTime) / 1e3
    }
    if (this._springing) {
      return this._spring.x() + this._springOffset
    }
    let t = this._friction.x(e)
    let n = this.dx(e)
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
  dx(e: number) {
    let t: number
    if (this._lastTime === e) {
      t = this._lastDx as number
    } else {
      t = this._springing ? this._spring.dx(e) : this._friction.dx(e)
    }
    this._lastTime = e
    this._lastDx = t
    return t
  }
  done() {
    return this._springing ? this._spring.done() : this._friction.done()
  }
  setVelocityByEnd(e: number) {
    this._friction.setVelocityByEnd(e)
  }
  configuration() {
    const e: any[] = this._friction.configuration()
    e.push.apply(e, this._spring.configuration())
    return e
  }
}
