const isQQ = window.qq &&
  window.qq.miniProgram &&
  /QQ/i.test(navigator.userAgent) &&
  /miniProgram/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isQQ) {
    return
  }
  if (window.QQJSBridge && window.QQJSBridge.invoke) {
    setTimeout(readyCallback, 0)
  } else {
    document.addEventListener('QQJSBridgeReady', readyCallback)
  }
  return window.qq.miniProgram
}
