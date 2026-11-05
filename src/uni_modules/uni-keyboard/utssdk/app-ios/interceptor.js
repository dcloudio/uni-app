const idToCallback = new Map()
const callbackToId = new Map()

function saveCallback(id, callback) {
  idToCallback.set(id, callback)
  callbackToId.set(callback, id)
}

function removeCallback(callback) {
  const id = callbackToId.get(callback)
  if (id == null) return
  callbackToId.delete(callback)
  idToCallback.delete(id)
}

export function initOnKeyboardAnimationChange(originalOnKeyboardAnimationChange) {
  return function (callback) {
    if (callbackToId.has(callback)) return
    const id = originalOnKeyboardAnimationChange(callback)
    saveCallback(id, callback)
  }
}

export function initOffKeyboardAnimationChange(originalOffKeyboardAnimationChange) {
  return function (callback) {
    if (callback == null) {
      originalOffKeyboardAnimationChange(null)
      idToCallback.clear()
      callbackToId.clear()
      return
    }

    const id = callbackToId.get(callback)
    if (id == null) return
    originalOffKeyboardAnimationChange(id)
    removeCallback(callback)
  }
}
