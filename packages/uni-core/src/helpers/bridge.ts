import { extend } from '@vue/shared'
// TODO 等待 vue3 的兼容模式自带emitter
import E from './TinyEmitter'

export function initBridge(
  subscribeNamespace: 'service' | 'view'
): Partial<UniApp.UniServiceJSBridge> {
  // TODO vue3 compatibility builds
  const emitter = new E()
  return extend(emitter, {
    subscribe(event: string, callback: Function, once: boolean = false): void {
      emitter[once ? 'once' : 'on'](`${subscribeNamespace}.${event}`, callback)
    },
    unsubscribe(event: string, callback: Function): void {
      emitter.off(`${subscribeNamespace}.${event}`, callback)
    },
    subscribeHandler(event: string, args: unknown, pageId?: number): void {
      if (__DEV__) {
        console.log(
          `[subscribeHandler][${Date.now()}]:${subscribeNamespace}.${event}, ${JSON.stringify(
            args
          )}, ${pageId}`
        )
      }
      emitter.emit(`${subscribeNamespace}.${event}`, args, pageId)
    },
  })
}
