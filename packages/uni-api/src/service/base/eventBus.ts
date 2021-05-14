import { defineSyncApi } from '../../helpers/api'
import {
  API_ON,
  API_OFF,
  API_EMIT,
  API_ONCE,
  API_TYPE_ON,
  API_TYPE_OFF,
  API_TYPE_EMIT,
  API_TYPE_ONCE,
  OnProtocol,
  OffProtocol,
  EmitProtocol,
  OnceProtocol,
} from '../../protocols/base/eventBus'

type EventName = string | number | symbol
type EventCallback = (...args: any) => any
type EventStopHandler = () => void

class Emitter {
  private eventMap: Map<EventName, Array<EventCallback>>

  constructor() {
    this.eventMap = new Map()
  }

  on = (name: EventName, callback: EventCallback): EventStopHandler => {
    if (!this.eventMap.has(name)) {
      this.eventMap.set(name, [])
    }

    this.eventMap.get(name)!.push(callback)

    return () => this.off(name, callback)
  }

  once = (name: EventName, callback: EventCallback): EventStopHandler => {
    const listener = (...args: any[]) => {
      this.off(name, listener)
      callback(...args)
    }

    this.on(name, listener)

    return () => this.off(name, listener)
  }

  emit = (name: EventName, ...args: any[]): void => {
    const cbs = this.eventMap.get(name)
    if (cbs instanceof Array) {
      cbs.forEach((cb) => {
        typeof cb === 'function' && cb(...args)
      })
    }
  }

  off = (names?: EventName | EventName[], callback?: EventCallback): void => {
    if (!names) {
      this.eventMap.clear()
      return
    }
    if (!(names instanceof Array)) {
      names = [names]
    }
    if (typeof callback === 'function') {
      names.forEach((name) => {
        if (this.eventMap.has(name)) {
          this.eventMap.set(
            name,
            this.eventMap.get(name)!.filter((cb) => cb !== callback)
          )
        }
      })
    } else {
      names.forEach((name) => {
        this.eventMap.delete(name)
      })
    }
  }
}

const emitter = new Emitter()

export const $on = defineSyncApi<API_TYPE_ON>(
  API_ON,
  (type, callback): EventStopHandler => emitter.on(type, callback),
  OnProtocol
)
export const $once = defineSyncApi<API_TYPE_ONCE>(
  API_ONCE,
  (type, callback): EventStopHandler => emitter.once(type, callback),
  OnceProtocol
)
export const $off = defineSyncApi<API_TYPE_OFF>(
  API_OFF,
  (type, callback) => {
    emitter.off(type, callback)
  },
  OffProtocol
)
export const $emit = defineSyncApi<API_TYPE_EMIT>(
  API_EMIT,
  emitter.emit,
  EmitProtocol
)
