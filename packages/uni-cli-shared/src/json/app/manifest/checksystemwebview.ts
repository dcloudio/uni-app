export function initCheckSystemWebview(manifestJson: Record<string, any>) {
  // 检查Android系统webview版本 || 下载X5后启动
  let plusWebview = manifestJson.plus.webView
  if (plusWebview) {
    manifestJson.plus['uni-app'].webView = plusWebview
    delete manifestJson.plus.webView
  }
}
