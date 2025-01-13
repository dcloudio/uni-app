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

export class EventBus {
  private $emitter = new Emitter()
  on(name: string, callback: Function) {
    return this.$emitter.on(name, callback)
  }
  once(name: string, callback: Function) {
    return this.$emitter.once(name, callback)
  }
  off(name?: string, callback?: Function | null) {
    if (!name) {
      this.$emitter.e = {}
      return
    }
    this.$emitter.off(name, callback)
  }
  emit(name: string, ...args: any[]) {
    this.$emitter.emit(name, ...args)
  }
}

const eventBus = new EventBus()
export const $on = defineSyncApi<API_TYPE_ON>(
  API_ON,
  (name, callback): EventStopHandler | number => {
    const id = eventBus.on(name, callback)
    if (__X__) {
      return id
    }
    return () => eventBus.off(name, callback)
  },
  OnProtocol
)
export const $once = defineSyncApi<API_TYPE_ONCE>(
  API_ONCE,
  (name, callback): EventStopHandler | number => {
    const id = eventBus.once(name, callback)
    if (__X__) {
      return id
    }
    return () => eventBus.off(name, callback)
  },
  OnceProtocol
)
export const $off = defineSyncApi<API_TYPE_OFF>(
  API_OFF,
  (name, callback) => {
    // 类型中不再体现 name 支持 string[] 类型, 仅在 uni.$off 保留该逻辑向下兼容
    if (!isArray(name)) name = name ? [name] : []
    name.forEach((n) => {
      eventBus.off(n, callback)
      // 处理 x-ios js 层 off 原生层 on 的事件
      if (
        __X__ &&
        __PLATFORM__ === 'app' &&
        // @ts-expect-error
        typeof __uniappx__nativeEventBus !== 'undefined'
      ) {
        // @ts-expect-error
        __uniappx__nativeEventBus.off(n, callback)
      }
    })
  },
  OffProtocol
)
export const $emit = defineSyncApi<API_TYPE_EMIT>(
  API_EMIT,
  (name, ...args: any[]) => {
    eventBus.emit(name, ...args)
  },
  EmitProtocol
)
