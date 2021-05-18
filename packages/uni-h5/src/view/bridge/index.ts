import { extend } from '@vue/shared'

import { ViewJSBridge } from '@dcloudio/uni-core'

export const UniViewJSBridge = /*#__PURE__*/ extend(ViewJSBridge, {
  publishHandler(event: string, args: any, pageId: number) {
    UniServiceJSBridge.subscribeHandler(event, args, pageId)
  },
})
