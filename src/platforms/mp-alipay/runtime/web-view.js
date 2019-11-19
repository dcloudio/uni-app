const isAlipay = window.my && navigator.userAgent.indexOf('AlipayClient') > -1

export function initWebviewApi (readyCallback) {
  if (!isAlipay) {
    return
  }
  setTimeout(() => {
    document.addEventListener('DOMContentLoaded', readyCallback)
  }, 0)
  const {
    navigateTo,
    navigateBack,
    switchTab,
    reLaunch,
    redirectTo,
    postMessage,
    getEnv
  } = window.my
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
