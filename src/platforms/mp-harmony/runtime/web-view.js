const isMPHarmony =
  window.ascfwebProxy &&
  window.ascfwebProxy.invokeJsApi &&
  /ASCF/i.test(navigator.userAgent)

export function initWebviewApi (readyCallback) {
  if (!isMPHarmony) {
    return
  }

  document.addEventListener('DOMContentLoaded', readyCallback)
  // docs https://developer.huawei.com/consumer/cn/doc/atomic-ascf/components-web-view#section530274216282
  // 需要提取路由导航
  return Object.assign({}, window.has, window.has.ascfweb)
}
