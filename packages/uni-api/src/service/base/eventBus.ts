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
  $on = defineSyncApi<API_TYPE_ON>(
    API_ON,
    (name, callback): EventStopHandler => {
      this.emitter.on(name, callback)

      return () => this.emitter.off(name, callback)
    },
    OnProtocol
  )
  $once = defineSyncApi<API_TYPE_ONCE>(
    API_ONCE,
    (name, callback): EventStopHandler => {
      this.emitter.once(name, callback)

      return () => this.emitter.off(name, callback)
    },
    OnceProtocol
  )
  $off = defineSyncApi<API_TYPE_OFF>(
    API_OFF,
    (name, callback) => {
      if (!name) {
        this.emitter.e = {}
        return
      }
      if (!isArray(name)) name = [name]
      name.forEach((n) => this.emitter.off(n, callback))
    },
    OffProtocol
  )
  $emit = defineSyncApi<API_TYPE_EMIT>(
    API_EMIT,
    (name, ...args: any[]) => {
      this.emitter.emit(name, ...args)
    },
    EmitProtocol
  )
}

const eventBus = new EventBus()
export const $on = eventBus.$on
export const $once = eventBus.$once
export const $off = eventBus.$off
export const $emit = eventBus.$emit
