import { extend } from '@vue/shared'
import {
  defineAsyncApi,
  API_GET_VIDEO_INFO,
  API_TYPE_GET_VIDEO_INFO,
  GetVideoInfoOptions,
  GetVideoInfoProtocol,
} from '@dcloudio/uni-api'
import {
  warpPlusSuccessCallback,
  warpPlusErrorCallback,
} from '../../../helpers/plus'

export const getVideoInfo = <API_TYPE_GET_VIDEO_INFO>defineAsyncApi(
  API_GET_VIDEO_INFO,
  (options, { resolve, reject }) => {
    plus.io.getVideoInfo(
      extend(options, {
        success: warpPlusSuccessCallback(resolve),
        fail: warpPlusErrorCallback(reject),
      })
    )
  },
  GetVideoInfoProtocol,
  GetVideoInfoOptions
)
