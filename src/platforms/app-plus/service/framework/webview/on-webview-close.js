export function onWebviewClose (webview) {
  webview.addEventListener('close', () => {
    if (webview.popupSubNVueWebviews) { // 移除所有 popupSubNVueWebview
      Object.keys(webview.popupSubNVueWebviews).forEach(id => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(
            `UNIAPP[webview][${webview.id}]:popupSubNVueWebview[${id}].close`
          )
        }
        webview.popupSubNVueWebviews[id].close('none')
      })
    }
  })
}
