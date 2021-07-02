import { formatLog } from '@dcloudio/uni-shared'

export function onWebviewClose(webview: PlusWebviewWebviewObject) {
  const { popupSubNVueWebviews } = webview as any
  if (!popupSubNVueWebviews) {
    return
  }
  webview.addEventListener('close', () => {
    Object.keys(popupSubNVueWebviews).forEach((id) => {
      if (__DEV__) {
        console.log(
          formatLog(
            'onWebviewClose',
            webview.id,
            'popupSubNVueWebview',
            id,
            'close'
          )
        )
      }
      popupSubNVueWebviews[id].close('none')
    })
  })
}
