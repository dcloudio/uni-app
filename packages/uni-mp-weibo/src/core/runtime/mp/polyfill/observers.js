export function handleObservers (vm) {
  const watch = vm.$options.watch
  if (!watch) {
    return
  }
  Object.keys(watch).forEach(name => {
    const observer = watch[name]
    if (observer.mounted) {
      const val = vm[name]
      let handler = observer.handler
      if (typeof handler === 'string') {
        handler = vm[handler]
      }
      handler && handler.call(vm, val, val)
    }
  })
}
