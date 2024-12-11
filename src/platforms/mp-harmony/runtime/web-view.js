const isToutiao = window.tt &&
  window.tt.miniProgram &&
  /toutiaomicroapp/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isToutiao) {
    return
  }
  document.addEventListener('DOMContentLoaded', readyCallback)
  return window.tt.miniProgram
}
