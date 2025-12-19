const isBaidu = window.swan &&
  window.swan.webView &&
  /swan/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isBaidu) {
    return
  }
  if (document.readyState !== 'loading') {
    setTimeout(readyCallback, 0)
  } else {
    document.addEventListener('DOMContentLoaded', readyCallback)
  }
  return window.swan.webView
}
