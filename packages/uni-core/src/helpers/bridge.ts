type Handler<T = any> = (event?: T) => void

export function initBridge(namespace: 'service' | 'view') {
  // TODO vue3 compatibility builds
  const { on, off, emit } = {
    on(event: string, callback: Handler) {
      console.log(event, callback)
    },
    off(event: string, callback: Handler) {
      console.log(event, callback)
    },
    emit(event: string, ...args: any[]) {
      console.log(event, args)
    }
  }
  return {
    on,
    off,
    emit,
    subscribe(event: string, callback: Handler) {
      return on(`${namespace}.${event}`, callback)
    },
    unsubscribe(event: string, callback: Handler) {
      return off(`${namespace}.${event}`, callback)
    },
    subscribeHandler(event: string, args: any, pageId: number) {
      if (__DEV__) {
        console.log(
          `[${namespace}][subscribeHandler][${Date.now()}]:${event}, ${JSON.stringify(
            args
          )}, ${pageId}`
        )
      }
      return emit(`${namespace}.${event}`, args, pageId)
    }
  }
}
