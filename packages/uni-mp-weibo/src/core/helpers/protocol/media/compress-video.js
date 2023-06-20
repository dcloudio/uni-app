import getRealPath from 'uni-platform/helpers/get-real-path'

export const compressVideo = {
  src: {
    type: String,
    required: true,
    validator (src, params) {
      params.src = getRealPath(src)
    }
  },
  quality: {
    type: String
  },
  bitrate: {
    type: Number
  },
  fps: {
    type: Number
  },
  resolution: {
    type: Number
  }
}
