const isWeixin = window.wx &&
  window.wx.miniProgram &&
  /micromessenger/i.test(navigator.userAgent) &&
  /miniProgram/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isWeixin) {
    return
  }
  if (window.WeixinJSBridge && window.WeixinJSBridge.invoke) {
    setTimeout(readyCallback, 0)
  } else {
    document.addEventListener('WeixinJSBridgeReady', readyCallback)
  }

  return window.wx.miniProgram
}
