const SIZE_TYPES = ['original', 'compressed']
const SOURCE_TYPES = ['album', 'camera']

export const chooseImage = {
  'count': {
    type: Number,
    required: false,
    default: 9,
    validator (count, params) {
      if (count <= 0) {
        params.count = 9
      }
    }
  },
  'sizeType': {
    type: [Array, String],
    required: false,
    default: SIZE_TYPES,
    validator (sizeType, params) {
      // 非必传的参数，不符合预期时处理为默认值。
      const length = sizeType.length
      if (!length) {
        params.sizeType = SIZE_TYPES
      } else if (typeof sizeType === 'string') {
        if (!~SIZE_TYPES.indexOf(sizeType)) {
          params.sizeType = SIZE_TYPES
        }
      } else {
        for (let i = 0; i < length; i++) {
          if (typeof sizeType[i] !== 'string' || !~SIZE_TYPES.indexOf(sizeType[i])) {
            params.sizeType = SIZE_TYPES
            break
          }
        }
      }
    }
  },
  'sourceType': {
    type: Array,
    required: false,
    default: SOURCE_TYPES,
    validator (sourceType, params) {
      const length = sourceType.length
      if (!length) {
        params.sourceType = SOURCE_TYPES
      } else {
        for (let i = 0; i < length; i++) {
          if (typeof sourceType[i] !== 'string' || !~SOURCE_TYPES.indexOf(sourceType[i])) {
            params.sourceType = SOURCE_TYPES
            break
          }
        }
      }
    }
  }
}
