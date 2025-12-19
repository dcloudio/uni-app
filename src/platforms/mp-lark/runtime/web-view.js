const isLark = window.tt &&
  window.tt.miniProgram &&
  /Lark|Feishu/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isLark) {
    return
  }
  if (document.readyState !== 'loading') {
    setTimeout(readyCallback, 0)
  } else {
    document.addEventListener('DOMContentLoaded', readyCallback)
  }
  return window.tt.miniProgram
}
