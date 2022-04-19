interface Timer {
  setTimeout: Function
  clearTimeout: Function
}
/**
 * 需要手动传入 timer,主要是解决 App 平台的定制 timer
 * @param fn
 * @param delay
 * @param timer
 * @returns
 */
export function debounce(fn: Function, delay: number, timer: Timer) {
  let timeout: any
  const newFn = function (this: any) {
    timer.clearTimeout(timeout)
    const timerFn = () => fn.apply(this, arguments)
    timeout = timer.setTimeout(timerFn, delay)
  }
  newFn.cancel = function () {
    timer.clearTimeout(timeout)
  }
  return newFn
}
