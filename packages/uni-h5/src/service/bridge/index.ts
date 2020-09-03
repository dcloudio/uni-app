import { extend } from '@vue/shared'

import { ServiceJSBridge } from '@dcloudio/uni-core'

export default extend(ServiceJSBridge, {
  publishHandler(event: string, args: any, pageId: number) {
    window.UniViewJSBridge.subscribeHandler(event, args, pageId)
  }
})
