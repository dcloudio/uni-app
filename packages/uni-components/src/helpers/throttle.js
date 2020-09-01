export function throttle(fn, wait) {
  let last = 0
  let timeout
  const newFn = function(...arg) {
    const now = Date.now()
    clearTimeout(timeout)
    const waitCallback = () => {
      last = now
      fn.apply(this, arg)
    }
    if (now - last < wait) {
      timeout = setTimeout(waitCallback, wait - (now - last))
      return
    }
    waitCallback()
  }
  newFn.cancel = function() {
    clearTimeout(timeout)
  }
  return newFn
}
