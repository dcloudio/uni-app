import getRealPath from 'uni-platform/helpers/get-real-path'

export const getVideoInfo = {
  src: {
    type: String,
    required: true,
    validator (src, params) {
      params.src = getRealPath(src)
    }
  }
}
