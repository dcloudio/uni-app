// TODO 等待 vue3 的兼容模式自带emitter
import { formatLog } from '@dcloudio/uni-shared'
import E from './TinyEmitter'

export function initBridge(
  subscribeNamespace: 'service' | 'view'
): Omit<
  UniApp.UniServiceJSBridge,
  'invokeOnCallback' | 'invokeViewMethod' | 'publishHandler'
> {
  // TODO vue3 compatibility builds
  const emitter = new E()
  return {
    on(event: string, callback: UniApp.CallbackFunction) {
      return emitter.on(event, callback)
    },
    once(event: string, callback: UniApp.CallbackFunction) {
      return emitter.once(event, callback)
    },
    off(event: string, callback?: UniApp.CallbackFunction) {
      return emitter.off(event, callback)
    },
    emit(event: string, ...args: any[]) {
      return emitter.emit(event, ...args)
    },
    subscribe(
      event: string,
      callback: UniApp.CallbackFunction,
      once: boolean = false
    ): void {
      emitter[once ? 'once' : 'on'](`${subscribeNamespace}.${event}`, callback)
    },
    unsubscribe(event: string, callback: UniApp.CallbackFunction): void {
      emitter.off(`${subscribeNamespace}.${event}`, callback)
    },
    subscribeHandler(event: string, args: unknown, pageId?: number): void {
      if (__DEV__) {
        console.log(
          formatLog(subscribeNamespace, 'subscribeHandler', pageId, event, args)
        )
      }
      emitter.emit(`${subscribeNamespace}.${event}`, args, pageId)
    },
  }
}
