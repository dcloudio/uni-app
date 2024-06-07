export function closeWebview(
  webview: PlusWebviewWebviewObject,
  animationType: string,
  animationDuration?: number,
  clear: boolean = false
) {
  if ((webview as any).__preload__) {
    webview.hide(animationType as any, animationDuration)
  } else {
    webview.close(
      animationType as any,
      animationDuration,
      {},
      // TODO 重新定义参数规范
      // @ts-expect-error
      clear
    )
  }
}
