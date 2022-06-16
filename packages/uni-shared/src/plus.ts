import { isFunction } from '@vue/shared'
export function plusReady(callback: () => void) {
  if (!isFunction(callback)) {
    return
  }
  if ((window as any).plus) {
    return callback()
  }
  document.addEventListener('plusready' as any, callback)
}
