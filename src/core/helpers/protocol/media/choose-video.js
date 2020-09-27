const SOURCE_TYPES = ['album', 'camera']

export const chooseVideo = {
  sourceType: {
    type: Array,
    required: false,
    default: SOURCE_TYPES,
    validator (sourceType, params) {
      sourceType = sourceType.filter(sourceType => SOURCE_TYPES.includes(sourceType))
      params.sourceType = sourceType.length ? sourceType : SOURCE_TYPES
    }
  },
  maxDuration: {
    type: Number,
    default: 60
  },
  camera: {
    type: String,
    default: 'back'
  }
}
