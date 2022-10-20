export function initCheckSystemWebview(manifestJson: Record<string, any>) {
  // 检查Android系统webview版本 || 下载X5后启动
  let plusWebView = manifestJson.plus.webView
  if (plusWebView) {
    manifestJson.plus['uni-app'].webView = plusWebView
    delete manifestJson.plus.webView
  }

  if (process.env.NODE_ENV === 'development' && !plusWebView) {
    manifestJson.plus['uni-app'].webView = {
      minUserAgentVersion: '49.0',
    }
  }
}
