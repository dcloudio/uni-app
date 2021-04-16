import { getRealPath } from '@dcloudio/uni-platform'

export const API_GET_VIDEO_INFO = 'getVideoInfo'
export type API_TYPE_GET_VIDEO_INFO = typeof uni.getVideoInfo

export const GetVideoInfoOptions: ApiOptions<API_TYPE_GET_VIDEO_INFO> = {
  formatArgs: {
    src(src, params) {
      params.src = getRealPath(src)
    },
  },
}

export const GetVideoInfoProtocol: ApiProtocol<API_TYPE_GET_VIDEO_INFO> = {
  src: {
    type: String,
    required: true,
  },
}
