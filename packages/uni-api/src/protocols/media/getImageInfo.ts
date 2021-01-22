import { ApiOptions, ApiProtocol } from '../type'

export const GetImageInfoOptions: ApiOptions = {
  formatArgs: {
    src(src, params) {
      params.src = (uni as any).getRealPath(src)
    },
  },
}

export const GetImageInfoProtocol: ApiProtocol = {
  src: {
    type: String,
    required: true,
  },
}
