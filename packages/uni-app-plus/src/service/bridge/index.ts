import { extend, isArray } from '@vue/shared'

import { ServiceJSBridge } from '@dcloudio/uni-core'

export const UniServiceJSBridge = /*#__PURE__*/ extend(ServiceJSBridge, {
  publishHandler,
})

function publishHandler(
  event: string,
  args: unknown,
  pageIds: number | number[]
) {
  args = JSON.stringify(args)
  if (__DEV__) {
    console.log(`UNIAPP[publishHandler]:[${+new Date()}]`, event, args, pageIds)
  }
  if (!isArray(pageIds)) {
    pageIds = [pageIds]
  }
  const evalJSCode = `typeof UniViewJSBridge !== 'undefined' && UniViewJSBridge.subscribeHandler("${event}",${args},__PAGE_ID__)`
  pageIds.forEach((id) => {
    const idStr = String(id)
    const webview = plus.webview.getWebviewById(idStr)
    webview && webview.evalJS(evalJSCode.replace('__PAGE_ID__', idStr))
  })
}
