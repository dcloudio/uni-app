export function closeWebview(
  webview: PlusWebviewWebviewObject,
  animationType: string,
  animationDuration?: number
) {
  if ((webview as any).__preload__) {
    webview.hide(animationType as any, animationDuration)
  } else {
    webview.close(animationType as any, animationDuration)
  }
}

export function backWebview(
  webview: PlusWebviewWebviewObject,
  callback: () => void
) {
  const children = webview.children()
  if (!children || !children.length) {
    // 无子 webview
    return callback()
  }

  // 支持且仅支持一个子webview
  const childWebview = children[0]

  childWebview.canBack(({ canBack }) => {
    if (canBack) {
      childWebview.back() // webview 返回
    } else {
      callback()
    }
  })
}
