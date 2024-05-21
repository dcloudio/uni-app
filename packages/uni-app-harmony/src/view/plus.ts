/// <reference path="./nativeChannel.d.ts" />
import { extend } from '@vue/shared'

export default {
  webview: {
    currentWebview() {
      return extend({}, nativeChannel.invokeSync('currentWebview'))
    },
    postMessageToUniNView(data: any, id: string) {
      nativeChannel.invokeSync('postMessageToUniNView', {
        data,
        id,
      })
    },
  },
}
