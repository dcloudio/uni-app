const SOURCE_TYPES = ['album', 'camera']

export const chooseVideo = {
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
