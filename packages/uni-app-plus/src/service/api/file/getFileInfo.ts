import { extend } from '@vue/shared'
import {
  defineAsyncApi,
  API_GET_FILE_INFO,
  API_TYPE_GET_FILE_INFO,
  GetFileInfoProtocol,
  GetFileInfoOptions,
} from '@dcloudio/uni-api'
import {
  warpPlusSuccessCallback,
  warpPlusErrorCallback,
} from '../../../helpers/plus'

export const getFileInfo = <API_TYPE_GET_FILE_INFO>defineAsyncApi(
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
