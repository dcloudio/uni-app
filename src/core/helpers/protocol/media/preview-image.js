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
      // 假值都会被转换为数字 0 无需再做判定
      const index = Number(value)
      params.current = isNaN(index) ? getRealPath(value) : index
    }
  }
}
