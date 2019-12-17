import {
  WEBVIEW_READY
} from '../../../constants'

export function onWebviewRecovery (webview, routeOptions) {
  const {
    subscribe,
    unsubscribe
  } = UniServiceJSBridge

  const id = webview.id
  const onWebviewRecoveryReady = function (data, pageId) {
    if (id !== pageId) {
      return
    }
    unsubscribe(WEBVIEW_READY, onWebviewRecoveryReady)
    if (process.env.NODE_ENV !== 'production') {
      console.log(`UNIAPP[webview][${id}]:onWebviewRecoveryReady ready`)
    }
    // 恢复目标页面
    pageId = parseInt(pageId)
    const page = getCurrentPages(true).find(page => page.$page.id === pageId)
    if (!page) {
      return console.error(`Page[${pageId}] not found`)
    }
    page.$vm._$vd.restore()
  }

  webview.addEventListener('recovery', e => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`UNIAPP[webview][${this.id}].recovery.reload:` + JSON.stringify({
        path: routeOptions.path,
        webviewId: id
      }))
    }
    subscribe(WEBVIEW_READY, onWebviewRecoveryReady)
  })
}
