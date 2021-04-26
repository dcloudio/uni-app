export function throttle(fn: Function, wait: number) {
  let last = 0
  let timeout: number
  let waitCallback: Function | null
  const newFn = function (this: any, ...arg: any) {
    const now = Date.now()
    clearTimeout(timeout)
    waitCallback = () => {
      waitCallback = null
      last = now
      fn.apply(this, arg)
    }
    if (now - last < wait) {
      timeout = setTimeout(waitCallback, wait - (now - last))
      return
    }
    waitCallback()
  }
  newFn.cancel = function () {
    clearTimeout(timeout)
    waitCallback = null
  }
  newFn.flush = function () {
    clearTimeout(timeout)
    waitCallback && waitCallback()
  }
  return newFn
}
