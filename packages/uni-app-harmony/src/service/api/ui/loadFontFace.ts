import {
  API_LOAD_FONT_FACE,
  type API_TYPE_LOAD_FONT_FACE,
  LoadFontFaceProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { getCurrentPageVm, getPageIdByVm } from '@dcloudio/uni-core'

export const loadFontFace = defineAsyncApi<API_TYPE_LOAD_FONT_FACE>(
  API_LOAD_FONT_FACE,
  (options, { resolve, reject }) => {
    const pageId = getPageIdByVm(getCurrentPageVm()!)!
    UniServiceJSBridge.invokeViewMethod(
      API_LOAD_FONT_FACE,
      options,
      pageId,
      (err: string) => {
        if (typeof err === 'string') {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  },
  LoadFontFaceProtocol
)
