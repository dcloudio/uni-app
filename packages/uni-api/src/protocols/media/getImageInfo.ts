import { getRealPath } from '@dcloudio/uni-platform'

export const API_GET_IMAGE_INFO = 'getImageInfo'
export type API_TYPE_GET_IMAGE_INFO = typeof uni.getImageInfo

export const GetImageInfoOptions: ApiOptions<API_TYPE_GET_IMAGE_INFO> = {
  formatArgs: {
    src(src, params) {
      params.src = getRealPath(src)
    },
  },
}

export const GetImageInfoProtocol: ApiProtocol<API_TYPE_GET_IMAGE_INFO> = {
  src: {
    type: String,
    required: true,
  },
}
