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
