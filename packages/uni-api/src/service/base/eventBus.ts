import { isArray } from '@vue/shared'
import { Emitter } from '@dcloudio/uni-shared'
import { defineSyncApi } from '../../helpers/api'
import {
  API_EMIT,
  API_OFF,
  API_ON,
  API_ONCE,
  type API_TYPE_EMIT,
  type API_TYPE_OFF,
  type API_TYPE_ON,
  type API_TYPE_ONCE,
  EmitProtocol,
  OffProtocol,
  OnProtocol,
  OnceProtocol,
} from '../../protocols/base/eventBus'

type EventStopHandler = () => void

export type EmitterOn = (
  eventName: string,
  callback: (result: any) => void
) => void
export type EmitterOnce = (
  eventName: string,
  callback: (result: any) => void
) => void
export type EmitterOff = (
  eventName?: string | string[],
  callback?: (result: any) => void
) => void
export type EmitterEmit = (eventName: string, param?: any) => void

export class EventBus {
  emitter = new Emitter()
  $on(name: string, callback: (result: any) => void) {
    this.emitter.on(name, callback)
  }
  $once(name: string, callback: (result: any) => void) {
    this.emitter.once(name, callback)
  }
  $off(name?: string | string[], callback?: (result: any) => void) {
    if (!name) {
      this.emitter.e = {}
      return
    }
    if (!isArray(name)) name = [name]
    name.forEach((n) => this.emitter.off(n, callback))
  }
  $emit(name: string, ...args: any[]) {
    this.emitter.emit(name, ...args)
  }
}

const eventBus = new EventBus()
export const $on = defineSyncApi<API_TYPE_ON>(
  API_ON,
  (name, callback): EventStopHandler => {
    eventBus.$on(name, callback)

    return () => eventBus.$off(name, callback)
  },
  OnProtocol
)
export const $once = defineSyncApi<API_TYPE_ONCE>(
  API_ONCE,
  (name, callback): EventStopHandler => {
    eventBus.$once(name, callback)

    return () => eventBus.$off(name, callback)
  },
  OnceProtocol
)
export const $off = defineSyncApi<API_TYPE_OFF>(
  API_OFF,
  (name, callback) => {
    if (!name) {
      eventBus.emitter.e = {}
      return
    }
    if (!isArray(name)) name = [name]
    name.forEach((n) => eventBus.$off(n, callback))
  },
  OffProtocol
)
export const $emit = defineSyncApi<API_TYPE_EMIT>(
  API_EMIT,
  (name, ...args: any[]) => {
    eventBus.$emit(name, ...args)
  },
  EmitProtocol
)
