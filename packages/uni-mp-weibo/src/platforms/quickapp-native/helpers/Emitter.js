export default class Emitter {
  constructor () {
    this._events = Object.create(null)
  }

  on (event, fn) {
    const vm = this
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.on(event[i], fn)
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn)
    }
    return vm
  }

  emit (event, ...args) {
    const vm = this
    const callbacks = vm._events[event]
    if (callbacks) {
      const cbs = callbacks.slice(0)
      for (let i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args)
      }
    }
    return vm
  }
}
