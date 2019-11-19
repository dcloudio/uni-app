const isBaidu = window.swan &&
  window.swan.webView &&
  /swan-baiduboxapp/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isBaidu) {
    return
  }
  setTimeout(() => {
    document.addEventListener('DOMContentLoaded', readyCallback)
  }, 0)
  return window.swan.webView
}
