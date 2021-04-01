import { getRealPath } from '@dcloudio/uni-platform'
import { ApiOptions, ApiProtocol } from '../type'

export const API_GET_IMAGE_INFO = 'getImageInfo'

export const GetImageInfoOptions: ApiOptions = {
  formatArgs: {
    src(src, params) {
      params.src = getRealPath(src)
    },
  },
}

export const GetImageInfoProtocol: ApiProtocol = {
  src: {
    type: String,
    required: true,
  },
}
