import { extend, isArray } from '@vue/shared'

import { ServiceJSBridge } from '@dcloudio/uni-core'
import { formatLog } from '@dcloudio/uni-shared'

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
    const code = evalJSCode.replace('__PAGE_ID__', idStr)
    console.log('TODO eval:', idStr, code)
  })
}
