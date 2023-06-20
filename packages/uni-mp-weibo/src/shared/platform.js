export function plusReady (callback) {
  if (typeof callback !== 'function') {
    return
  }
  if (window.plus) {
    return callback()
  }
  document.addEventListener('plusready', callback)
}
