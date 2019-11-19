const isToutiao = window.tt &&
  window.tt.miniProgram &&
  /toutiaomicroapp/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isToutiao) {
    return
  }
  setTimeout(() => {
    document.addEventListener('DOMContentLoaded', readyCallback)
  }, 0)
  return window.tt.miniProgram
}
