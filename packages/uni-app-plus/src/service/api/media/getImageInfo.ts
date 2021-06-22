import { extend } from '@vue/shared'
import {
  API_GET_IMAGE_INFO,
  API_TYPE_GET_IMAGE_INFO,
  defineAsyncApi,
  GetImageInfoOptions,
  GetImageInfoProtocol,
} from '@dcloudio/uni-api'
import {
  warpPlusSuccessCallback,
  warpPlusErrorCallback,
} from '../../../helpers/plus'
import { TEMP_PATH } from '../constants'

export const getImageInfo = defineAsyncApi<API_TYPE_GET_IMAGE_INFO>(
  API_GET_IMAGE_INFO,
  (options, { resolve, reject }) => {
    const path = TEMP_PATH + '/download/'
    plus.io.getImageInfo(
      extend(options, {
        savePath: path,
        filename: path,
        success: warpPlusSuccessCallback(resolve),
        fail: warpPlusErrorCallback(reject),
      })
    )
  },
  GetImageInfoProtocol,
  GetImageInfoOptions
)
