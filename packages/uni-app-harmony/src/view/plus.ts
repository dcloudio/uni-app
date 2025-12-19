import { invokeHarmonyChannel } from '../helpers/channel'
import { extend } from '@vue/shared'

export { invokeHarmonyChannel } from '../helpers/channel'

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
          setPullToRefresh(options: any) {
            invokeHarmonyChannel('setPullToRefresh', [options])
          },
          setStyle(options: any) {
            invokeHarmonyChannel('setStyle', [options])
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
