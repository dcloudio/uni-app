/// <reference path="./harmonyChannel.d.ts" />
import { extend } from '@vue/shared'

// javaScriptProxy能处理的最大层级为10级，使用序列化避免层级超限
export function invokeHarmonyChannel(method: string, args?: any[]) {
  return harmonyChannel.invokeSync(
    method,
    args ? args.map((arg) => JSON.stringify(arg)) : undefined
  )
}

export default {
  webview: {
    currentWebview() {
      return extend(
        {
          getStyle: () => {
            return extend({}, invokeHarmonyChannel('getStyle'))
          },
          setSoftinputTemporary(options: any) {
            invokeHarmonyChannel('setSoftinputTemporary', [options])
          },
        },
        invokeHarmonyChannel('currentWebview')
      )
    },
    postMessageToUniNView(data: any, id: string) {
      invokeHarmonyChannel('postMessageToUniNView', [data, id])
    },
  },
  io: {
    convertLocalFileSystemURL(filepath: string) {
      return invokeHarmonyChannel('convertLocalFileSystemURL', [filepath])
    },
  },
  key: {
    hideSoftKeybord() {
      invokeHarmonyChannel('hideSoftKeybord')
    },
    showSoftKeybord() {
      invokeHarmonyChannel('showSoftKeybord')
    },
  },
}
