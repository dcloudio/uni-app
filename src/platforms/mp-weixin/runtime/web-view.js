const isWeixin = window.wx &&
  window.wx.miniProgram &&
  /micromessenger/i.test(navigator.userAgent) &&
  /miniProgram/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isWeixin) {
    return
  }
  setTimeout(() => {
    if (window.WeixinJSBridge && window.WeixinJSBridge.invoke) {
      readyCallback()
    } else {
      document.addEventListener('WeixinJSBridgeReady', readyCallback)
    }
  }, 0)
  return window.wx.miniProgram
}
