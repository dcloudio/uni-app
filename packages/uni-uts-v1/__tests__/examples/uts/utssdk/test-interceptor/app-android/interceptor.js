export function initRequest(method) {
  return function (...args) {
    return method(...args)
  }
}
