const SIZE_TYPES = ['original', 'compressed']
const SOURCE_TYPES = ['album', 'camera']

export const chooseImage = {
  count: {
    type: Number,
    required: false,
    default: 9,
    validator (count, params) {
      if (count <= 0) {
        params.count = 9
      }
    }
  },
  sizeType: {
    type: [Array, String],
    required: false,
    default: SIZE_TYPES,
    validator (sizeType, params) {
      sizeType = typeof sizeType === 'string' ? [sizeType] : sizeType
      sizeType = sizeType.filter(sizeType => SIZE_TYPES.includes(sizeType))
      params.sizeType = sizeType.length ? sizeType : SIZE_TYPES
    }
  },
  sourceType: {
    type: Array,
    required: false,
    default: SOURCE_TYPES,
    validator (sourceType, params) {
      sourceType = sourceType.filter(sourceType => SOURCE_TYPES.includes(sourceType))
      params.sourceType = sourceType.length ? sourceType : SOURCE_TYPES
    }
  },
  extension: {
    type: Array,
    default: ['*'],
    validator (extension, params) {
      if (extension.length === 0) { return 'param extension should not be empty.' }
    }
  }
}
