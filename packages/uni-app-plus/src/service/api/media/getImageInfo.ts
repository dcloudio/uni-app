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

export const getImageInfo = defineAsyncApi<API_TYPE_GET_IMAGE_INFO>(
  API_GET_IMAGE_INFO,
  (options, { resolve, reject }) => {
    plus.io.getImageInfo(
      extend(options, {
        success: warpPlusSuccessCallback(resolve),
        fail: warpPlusErrorCallback(reject),
      })
    )
  },
  GetImageInfoProtocol,
  GetImageInfoOptions
)
