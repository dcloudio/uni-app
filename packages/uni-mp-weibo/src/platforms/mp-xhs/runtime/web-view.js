const isXhs = window.xhs &&
  window.xhs.miniProgram &&
  /xhsminiapp/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isXhs) {
    return
  }
  // todo 没有 XhsJSBridgeReady
  // if (window.XhsJSBridgeReady && window.XhsJSBridgeReady.invoke) {
  //   setTimeout(readyCallback, 0)
  // } else {
  //   document.addEventListener('XhsJSBridgeReady', readyCallback)
  // }

  return window.xhs.miniProgram
}
