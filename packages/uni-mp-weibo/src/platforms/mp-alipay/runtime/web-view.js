const AC = ['t', 'n', 'e', 'i', 'l', 'C', 'y', 'a', 'p', 'i', 'l', 'A']
const isAlipay = window.my && navigator.userAgent.indexOf(AC.reverse().join('')) > -1

export function initWebviewApi (readyCallback) {
  if (!isAlipay) {
    return
  }
  document.addEventListener('DOMContentLoaded', readyCallback)
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
