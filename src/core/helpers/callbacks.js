const callbacks = {}

export default function createCallbacks (namespace) {
  let scopedCallbacks = callbacks[namespace]
  if (!scopedCallbacks) {
    scopedCallbacks = {
      id: 1,
      callbacks: Object.create(null)
    }
    callbacks[namespace] = scopedCallbacks
  }
  return {
    get (id) {
      return scopedCallbacks.callbacks[id]
    },
    pop (id) {
      const callback = scopedCallbacks.callbacks[id]
      if (callback) {
        delete scopedCallbacks.callbacks[id]
      }
      return callback
    },
    push (callback) {
      const id = scopedCallbacks.id++
      scopedCallbacks.callbacks[id] = callback
      return id
    }
  }
}
