export function debounce(fn: Function, delay: number) {
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
