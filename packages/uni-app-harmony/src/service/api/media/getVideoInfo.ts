import { _getVideoInfo } from './media'
import {
  API_GET_VIDEO_INFO,
  type API_TYPE_GET_VIDEO_INFO,
  GetVideoInfoOptions,
  GetVideoInfoProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

export const getVideoInfo: API_TYPE_GET_VIDEO_INFO =
  defineAsyncApi<API_TYPE_GET_VIDEO_INFO>(
    API_GET_VIDEO_INFO,
    function ({ src }, { resolve, reject }) {
      _getVideoInfo(src)
        .then((res) => {
          return {
            size: res.size,
            duration: res.duration!,
            width: res.width!,
            height: res.height!,
            type: res.type!,
            orientation: res.orientation!,
          }
        })
        .then(resolve, reject)
    },
    GetVideoInfoProtocol,
    GetVideoInfoOptions
  )
