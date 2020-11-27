const WINDOW_NAMES = ['VUniLeftWindow', 'VUniTopWindow', 'VUniRightWindow']

export function checkInWindows (vm) {
  if (__PLATFORM__ !== 'h5') {
    return false
  }
  while (vm) {
    if (WINDOW_NAMES.indexOf(vm.$options.name) !== -1) {
      return true
    }
    vm = vm.$parent
  }
}
