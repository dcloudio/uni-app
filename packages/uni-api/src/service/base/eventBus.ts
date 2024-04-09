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

const emitter = new Emitter()

export const $on = defineSyncApi<API_TYPE_ON>(
  API_ON,
  (name, callback): EventStopHandler => {
    emitter.on(name, callback)

    return () => emitter.off(name, callback)
  },
  OnProtocol
)
export const $once = defineSyncApi<API_TYPE_ONCE>(
  API_ONCE,
  (name, callback): EventStopHandler => {
    emitter.once(name, callback)

    return () => emitter.off(name, callback)
  },
  OnceProtocol
)
export const $off = defineSyncApi<API_TYPE_OFF>(
  API_OFF,
  (name, callback) => {
    if (!name) {
      emitter.e = {}
      return
    }
    if (!isArray(name)) name = [name]
    name.forEach((n) => emitter.off(n, callback))
  },
  OffProtocol
)
export const $emit = defineSyncApi<API_TYPE_EMIT>(
  API_EMIT,
  (name, ...args: any[]) => {
    emitter.emit(name, ...args)
  },
  EmitProtocol
)
