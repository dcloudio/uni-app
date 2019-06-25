import getRealPath from 'uni-platform/helpers/get-real-path'

export const previewImage = {
  urls: {
    type: Array,
    required: true,
    validator (value, params) {
      var typeError
      params.urls = value.map(url => {
        if (typeof url === 'string') {
          return getRealPath(url)
        } else {
          typeError = true
        }
      })
      if (typeError) {
        return 'url is not string'
      }
    }
  },
  current: {
    type: [String, Number],
    validator (value, params) {
      if (typeof value === 'number') {
        params.current = value > 0 && value < params.urls.length ? value : 0
      } else if (typeof value === 'string' && value) {
        params.current = getRealPath(value)
      }
    },
    default: 0
  }
}
