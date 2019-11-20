const isBaidu = window.swan &&
  window.swan.webView &&
  /swan/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isBaidu) {
    return
  }
  document.addEventListener('DOMContentLoaded', readyCallback)
  return window.swan.webView
}
