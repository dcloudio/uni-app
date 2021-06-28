import { getRealPath } from '@dcloudio/uni-platform'

export const API_COMPRESS_IMAGE = 'compressImage'
export type API_TYPE_COMPRESS_IMAGE = typeof uni.compressImage

export const CompressImageOptions: ApiOptions<API_TYPE_COMPRESS_IMAGE> = {
  formatArgs: {
    src(src, params) {
      params.src = getRealPath(src)
    },
  },
}

export const CompressImageProtocol: ApiProtocol<API_TYPE_COMPRESS_IMAGE> = {
  src: {
    type: String,
    required: true,
  },
}
