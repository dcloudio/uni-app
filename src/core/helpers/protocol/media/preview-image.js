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
    type: String,
    validator (value, params) {
      params.type = value ? getRealPath(value) : ''
    }
  }
}
