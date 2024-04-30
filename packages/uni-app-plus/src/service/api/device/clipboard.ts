import {
  API_GET_CLIPBOARD_DATA,
  API_SET_CLIPBOARD_DATA,
  type API_TYPE_GET_CLIPBOARD_DATA,
  type API_TYPE_SET_CLIPBOARD_DATA,
  SetClipboardDataOptions,
  SetClipboardDataProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { requireNativePlugin } from '../plugin/requireNativePlugin'

export const getClipboardData = defineAsyncApi<API_TYPE_GET_CLIPBOARD_DATA>(
  API_GET_CLIPBOARD_DATA,
  (_, { resolve, reject }) => {
    const clipboard = requireNativePlugin('clipboard')
    clipboard.getString((ret: any) => {
      if (ret.result === 'success') {
        resolve({
          data: ret.data,
        })
      } else {
        reject('getClipboardData:fail')
      }
    })
  }
)

export const setClipboardData = defineAsyncApi<API_TYPE_SET_CLIPBOARD_DATA>(
  API_SET_CLIPBOARD_DATA,
  (options, { resolve }) => {
    const clipboard = requireNativePlugin('clipboard')
    clipboard.setString(options.data)
    resolve()
  },
  SetClipboardDataProtocol,
  SetClipboardDataOptions
)
