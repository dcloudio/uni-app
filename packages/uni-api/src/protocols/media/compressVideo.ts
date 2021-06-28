import { getRealPath } from '@dcloudio/uni-platform'

export const API_COMPRESS_VIDEO = 'compressVideo'
export type API_TYPE_COMPRESS_VIDEO = typeof uni.compressVideo

export const CompressVideoOptions: ApiOptions<API_TYPE_COMPRESS_VIDEO> = {
  formatArgs: {
    src(src, params) {
      params.src = getRealPath(src)
    },
  },
}

export const CompressVideoProtocol: ApiProtocol<API_TYPE_COMPRESS_VIDEO> = {
  src: {
    type: String,
    required: true,
  },
  quality: String as any,
  bitrate: Number,
  fps: Number,
  resolution: Number,
}
