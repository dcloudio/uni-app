import { extend } from '@vue/shared'

import { ViewJSBridge } from '@dcloudio/uni-core'

export default extend(ViewJSBridge, {
  publishHandler(event: string, args: any, pageId: number) {
    window.UniServiceJSBridge.subscribeHandler(event, args, pageId)
  }
})
