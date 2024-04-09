import {
  API_GET_VIDEO_INFO,
  type API_TYPE_GET_VIDEO_INFO,
  GetVideoInfoOptions,
  GetVideoInfoProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { warpPlusErrorCallback } from '../../../helpers/plus'

export const getVideoInfo = defineAsyncApi<API_TYPE_GET_VIDEO_INFO>(
  API_GET_VIDEO_INFO,
  (options, { resolve, reject }) => {
    plus.io.getVideoInfo({
      filePath: options.src,
      success: (videoInfo) => {
        resolve({
          orientation: videoInfo.orientation,
          type: videoInfo.type,
          duration: videoInfo.duration,
          size: videoInfo.size,
          height: videoInfo.height,
          width: videoInfo.width,
          fps: videoInfo.fps || 30,
          bitrate: videoInfo.bitrate,
        })
      },
      fail: warpPlusErrorCallback(reject),
    })
  },
  GetVideoInfoProtocol,
  GetVideoInfoOptions
)
