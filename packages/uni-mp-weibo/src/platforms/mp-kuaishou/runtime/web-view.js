const isKuaishou = window.ks &&
  window.ks.miniProgram &&
  /micromessenger/i.test(navigator.userAgent) &&
  /miniProgram/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isKuaishou) {
    return
  }
  if (window.WeixinJSBridge && window.WeixinJSBridge.invoke) {
    setTimeout(readyCallback, 0)
  } else {
    document.addEventListener('WeixinJSBridgeReady', readyCallback)
  }

  return window.ks.miniProgram
}
