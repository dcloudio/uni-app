const callbacks = {}

export function createCallbacks(namespace: string) {
  let scopedCallbacks = (callbacks as any)[namespace]
  if (!scopedCallbacks) {
    scopedCallbacks = {
      id: 1,
      callbacks: Object.create(null),
    }
    ;(callbacks as any)[namespace] = scopedCallbacks
  }
  return {
    get(id: any) {
      return scopedCallbacks.callbacks[id]
    },
    pop(id: any) {
      const callback = scopedCallbacks.callbacks[id]
      if (callback) {
        delete scopedCallbacks.callbacks[id]
      }
      return callback
    },
    push(callback: Function) {
      const id = scopedCallbacks.id++
      scopedCallbacks.callbacks[id] = callback
      return id
    },
  }
}
