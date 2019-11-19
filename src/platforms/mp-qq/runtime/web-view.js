const isQQ = window.qq &&
  window.qq.miniProgram &&
  /QQ/i.test(navigator.userAgent) &&
  /miniProgram/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isQQ) {
    return
  }
  setTimeout(() => {
    if (window.QQJSBridge && window.QQJSBridge.invoke) {
      readyCallback()
    } else {
      document.addEventListener('QQJSBridgeReady', readyCallback)
    }
  }, 0)
  return window.qq.miniProgram
}
