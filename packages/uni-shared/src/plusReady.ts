export function plusReady(callback: () => void) {
  if (typeof callback !== 'function') {
    return
  }
  if ((window as any).plus) {
    return callback()
  }
  document.addEventListener('plusready' as any, callback)
}
