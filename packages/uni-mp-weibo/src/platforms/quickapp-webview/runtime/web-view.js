const isQuickapp = window.qa &&
  /quickapp/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isQuickapp) {
    return
  }
  if (window.QaJSBridge && window.QaJSBridge.invoke) {
    setTimeout(readyCallback, 0)
  } else {
    document.addEventListener('QaJSBridgeReady', readyCallback)
  }
  const {
    navigateTo,
    navigateBack,
    switchTab,
    reLaunch,
    redirectTo,
    postMessage,
    getEnv
  } = window.qa

  return {
    navigateTo,
    navigateBack,
    switchTab,
    reLaunch,
    redirectTo,
    postMessage,
    getEnv
  }
}
