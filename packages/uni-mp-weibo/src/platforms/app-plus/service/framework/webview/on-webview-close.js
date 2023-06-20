export function onWebviewClose (webview) {
  webview.popupSubNVueWebviews && webview.addEventListener('close', () => {
    Object.keys(webview.popupSubNVueWebviews).forEach(id => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(
          `UNIAPP[webview][${webview.id}]:popupSubNVueWebview[${id}].close`
        )
      }
      webview.popupSubNVueWebviews[id].close('none')
    })
  })
}
