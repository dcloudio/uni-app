import { extend } from '@vue/shared'
import {
  API_GET_FILE_INFO,
  type API_TYPE_GET_FILE_INFO,
  GetFileInfoOptions,
  GetFileInfoProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import {
  warpPlusErrorCallback,
  warpPlusSuccessCallback,
} from '../../../helpers/plus'

export const getFileInfo = defineAsyncApi<API_TYPE_GET_FILE_INFO>(
  API_GET_FILE_INFO,
  (options, { resolve, reject }) => {
    plus.io.getFileInfo(
      extend(options, {
        success: warpPlusSuccessCallback(resolve),
        fail: warpPlusErrorCallback(reject),
      })
    )
  },
  GetFileInfoProtocol,
  GetFileInfoOptions
)
