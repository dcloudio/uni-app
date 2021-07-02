import { extend } from '@vue/shared'

import { ViewJSBridge } from '@dcloudio/uni-core'

const APP_SERVICE_ID = '__uniapp__service'

export const UniViewJSBridge = /*#__PURE__*/ extend(ViewJSBridge, {
  publishHandler,
})

let pageId: string
function publishHandler(event: string, args: unknown = {}) {
  if (!pageId) {
    pageId = plus.webview.currentWebview().id!
  }
  if (__DEV__) {
    console.log(
      `[${Date.now()}][View]: ` +
        pageId +
        ' ' +
        event +
        ' ' +
        JSON.stringify(args)
    )
  }
  ;(plus.webview as any).postMessageToUniNView(
    {
      type: 'subscribeHandler',
      args: {
        type: event,
        data: args,
        pageId,
      },
    },
    APP_SERVICE_ID
  )
}
