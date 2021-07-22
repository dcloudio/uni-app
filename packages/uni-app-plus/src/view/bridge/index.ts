import { extend } from '@vue/shared'

import { getCurrentPageId, ViewJSBridge } from '@dcloudio/uni-core'

const APP_SERVICE_ID = '__uniapp__service'

export const UniViewJSBridge = /*#__PURE__*/ extend(ViewJSBridge, {
  publishHandler,
})

function publishHandler(event: string, args: unknown = {}) {
  // 转换为字符串
  const pageId = getCurrentPageId() + ''
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
