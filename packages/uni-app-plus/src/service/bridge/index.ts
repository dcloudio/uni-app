import { extend, isArray } from '@vue/shared'

import { ServiceJSBridge } from '@dcloudio/uni-core'
import { formatLog } from '@dcloudio/uni-shared'
import { INVOKE_VIEW_API } from '../../constants'

let invokeViewMethodId = 0

const invokeViewMethod: UniApp.UniServiceJSBridge['invokeViewMethod'] = (
  name: string,
  args: unknown,
  callback: (res: any) => void,
  pageId: number
) => {
  const id = invokeViewMethodId++
  UniServiceJSBridge.subscribe(INVOKE_VIEW_API + '.' + id, callback, true)
  publishHandler(INVOKE_VIEW_API, { id, name, args }, pageId)
}

export const UniServiceJSBridge = /*#__PURE__*/ extend(ServiceJSBridge, {
  publishHandler,
  invokeViewMethod,
})

function publishHandler(
  event: string,
  args: unknown,
  pageIds: number | number[]
) {
  args = JSON.stringify(args)
  if (__DEV__) {
    console.log(formatLog('publishHandler', event, args, pageIds))
  }
  if (!isArray(pageIds)) {
    pageIds = [pageIds]
  }
  const evalJSCode = `typeof UniViewJSBridge !== 'undefined' && UniViewJSBridge.subscribeHandler("${event}",${args},__PAGE_ID__)`
  if (__DEV__) {
    console.log(formatLog('publishHandler', 'size', evalJSCode.length))
  }
  pageIds.forEach((id) => {
    const idStr = String(id)
    const webview = plus.webview.getWebviewById(idStr)
    webview && webview.evalJS(evalJSCode.replace('__PAGE_ID__', idStr))
  })
}
