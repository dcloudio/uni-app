const isLark = window.tt &&
  window.tt.miniProgram &&
  /Lark|Feishu/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isLark) {
    return
  }
  document.addEventListener('DOMContentLoaded', readyCallback)
  return window.tt.miniProgram
}
