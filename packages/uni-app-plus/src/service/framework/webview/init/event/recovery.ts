import { formatLog } from '@dcloudio/uni-shared'
import { ON_WEBVIEW_READY } from '../../../../../constants'
import type UniPageNode from '../../../dom/Page'
import { getPageById } from '../../../page/getCurrentPages'

export function onWebviewRecovery(webview: PlusWebviewWebviewObject) {
  if ((webview as any).nvue) {
    return
  }
  const webviewId = webview.id
  const { subscribe, unsubscribe } = UniServiceJSBridge
  const onWebviewRecoveryReady = (_: unknown, pageId: string) => {
    if (webviewId !== pageId) {
      return
    }
    unsubscribe(ON_WEBVIEW_READY, onWebviewRecoveryReady)
    if (__DEV__) {
      console.log(formatLog(`Recovery`, webviewId, 'ready'))
    }
    const page = getPageById(parseInt(pageId))
    if (page) {
      const pageNode = (page as any).__page_container__ as UniPageNode
      pageNode.restore()
    }
  }

  // @ts-expect-error
  webview.addEventListener('recovery', () => {
    if (__DEV__) {
      console.log(formatLog('Recovery', webview.id))
    }
    subscribe(ON_WEBVIEW_READY, onWebviewRecoveryReady)
  })
}
