import { APP_SERVICE_ID } from '../.../../../../constants'
import { requireNativePlugin } from '../plugin/requireNativePlugin'
import type { PlusWebviewWebviewObjectWithExtras } from '../../framework/webview/init/subNVues'

const EVENT_TYPE_NAME = 'UniAppSubNVue'

interface OnMessageResult {
  origin: string
  data: any
}
type AnyFn = (res: OnMessageResult) => void

interface GlobalEventData {
  type?: string
  data: any
  target?: {
    id: string
    isSub: boolean
  }
}

interface WebviewExt extends PlusWebview {
  postMessageToUniNView: (message: GlobalEventData, id: string) => void
}

class SubNvue implements ReturnType<typeof uni.getSubNVueById> {
  private webview: PlusWebviewWebviewObjectWithExtras
  private maskWebview?: PlusWebviewWebviewObject
  private callbacks: AnyFn[] = []
  private isSub: boolean
  private messageReady?: boolean

  constructor(id: string, isSub?: boolean) {
    const webview = (this.webview = plus.webview.getWebviewById(
      id
    ) as PlusWebviewWebviewObjectWithExtras)
    this.isSub = isSub || false
    if (webview.__uniapp_mask_id) {
      const maskWebview = (this.maskWebview =
        webview.__uniapp_mask_id === '0'
          ? ({
              setStyle({ mask }) {
                requireNativePlugin('uni-tabview').setMask({
                  color: mask,
                })
              },
            } as PlusWebviewWebviewObject)
          : plus.webview.getWebviewById(webview.__uniapp_mask_id))

      const closeMask = function () {
        maskWebview.setStyle({
          mask: 'none',
        })
      }
      webview.addEventListener('hide', closeMask)
      webview.addEventListener('close', closeMask)
    }
  }
  show(...args: any[]) {
    if (this.maskWebview) {
      const maskColor = this.webview.__uniapp_mask
      this.maskWebview.setStyle({
        mask: maskColor,
      })
    }
    this.webview.show(...args)
  }
  hide(...args: any[]) {
    this.webview.hide(...args)
  }
  setStyle(style: PlusWebviewWebviewStyles) {
    this.webview.setStyle(style)
  }
  private initMessage() {
    if (this.messageReady) {
      return
    }
    this.messageReady = true
    const listener = (event: { data?: GlobalEventData }) => {
      if (event.data && event.data.type === EVENT_TYPE_NAME) {
        const target = event.data.target!
        if (target.id === this.webview.id && target.isSub === this.isSub) {
          this.callbacks.forEach((callback) => {
            callback({
              origin: this.webview.__uniapp_host,
              data: event.data!.data,
            })
          })
        }
      }
    }
    const globalEvent = requireNativePlugin('globalEvent')
    globalEvent.addEventListener('plusMessage', listener)
    this.webview.addEventListener('close', () => {
      // TODO 暂时仅清空回调
      this.callbacks.length = 0
      // globalEvent.removeEventListener('plusMessage', listener)
    })
  }
  postMessage(data: any) {
    const webviewExt = plus.webview as WebviewExt
    webviewExt.postMessageToUniNView(
      {
        type: EVENT_TYPE_NAME,
        data,
        target: {
          id: this.webview.id,
          isSub: !this.isSub,
        },
      },
      APP_SERVICE_ID
    )
  }
  onMessage(callback: AnyFn) {
    this.initMessage()
    this.callbacks.push(callback)
  }
}

export const getSubNVueById = function (id: string, isSub?: boolean) {
  // TODO 暂时通过 isSub 区分来自 subNVue 页面
  return new SubNvue(id, isSub)
}
