import {
  defineAsyncApi,
  API_GET_VIDEO_INFO,
  API_TYPE_GET_VIDEO_INFO,
  GetVideoInfoOptions,
  GetVideoInfoProtocol,
} from '@dcloudio/uni-api'
import { warpPlusErrorCallback } from '../../../helpers/plus'

export const getVideoInfo = <API_TYPE_GET_VIDEO_INFO>defineAsyncApi(
  API_GET_VIDEO_INFO,
  (options, { resolve, reject }) => {
    plus.io.getVideoInfo({
      filePath: options.src,
      success: (data: any) => {
        return {
          orientation: data.orientation,
          type: data.type,
          duration: data.duration,
          size: data.size,
          height: data.height,
          width: data.width,
          fps: data.fps || 30,
          bitrate: data.bitrate,
        }
      },
      fail: warpPlusErrorCallback(reject),
    })
  },
  GetVideoInfoProtocol,
  GetVideoInfoOptions
)
