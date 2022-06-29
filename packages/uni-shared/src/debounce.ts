interface Timer {
  setTimeout: Function
  clearTimeout: Function
}
/**
 * 需要手动传入 timer,主要是解决 App 平台的定制 timer
 */
export function debounce(
  fn: Function,
  delay: number,
  { clearTimeout, setTimeout }: Timer
) {
  let timeout: any
  const newFn = function (this: any) {
    clearTimeout(timeout)
    const timerFn = () => fn.apply(this, arguments)
    timeout = setTimeout(timerFn, delay)
  }
  newFn.cancel = function () {
    clearTimeout(timeout)
  }
  return newFn
}
