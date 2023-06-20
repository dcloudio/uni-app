if (String(navigator.vendor).indexOf('Apple') === 0) {
  let firstEvent
  let timeout
  // 用于全局禁用 iOS 双击包含手势
  document.documentElement.addEventListener('click', event => {
    const TIME_MAX = 450
    const PAGE_MAX = 44
    clearTimeout(timeout)
    if (firstEvent && Math.abs(event.pageX - firstEvent.pageX) <= PAGE_MAX && Math.abs(event.pageY - firstEvent.pageY) <= PAGE_MAX && event.timeStamp - firstEvent.timeStamp <= TIME_MAX) {
      event.preventDefault()
    }
    firstEvent = event
    timeout = setTimeout(() => {
      firstEvent = null
    }, TIME_MAX)
  })
}
