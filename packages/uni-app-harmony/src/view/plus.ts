/// <reference path="./harmonyChannel.d.ts" />
import { extend } from '@vue/shared'

export default {
  webview: {
    currentWebview() {
      return extend(
        {
          getStyle: () => {
            return extend({}, harmonyChannel.invokeSync('getStyle'))
          },
          setSoftinputTemporary(options: any) {
            harmonyChannel.invokeSync('setSoftinputTemporary', [options])
          },
        },
        harmonyChannel.invokeSync('currentWebview')
      )
    },
    postMessageToUniNView(data: any, id: string) {
      harmonyChannel.invokeSync('postMessageToUniNView', [data, id])
    },
  },
  io: {
    convertLocalFileSystemURL(filepath: string) {
      return harmonyChannel.invokeSync('convertLocalFileSystemURL', [filepath])
    },
  },
}
