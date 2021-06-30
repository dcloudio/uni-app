export function onWebviewClose(webview: PlusWebviewWebviewObject) {
  const { popupSubNVueWebviews } = webview as any
  if (!popupSubNVueWebviews) {
    return
  }
  webview.addEventListener('close', () => {
    Object.keys(popupSubNVueWebviews).forEach((id) => {
      if (__DEV__) {
        console.log(
          `UNIAPP[webview][${webview.id}]:popupSubNVueWebview[${id}].close`
        )
      }
      popupSubNVueWebviews[id].close('none')
    })
  })
}
