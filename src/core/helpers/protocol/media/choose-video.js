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
  compressed: {
    type: Boolean,
    default: true
  },
  maxDuration: {
    type: Number,
    default: 60
  },
  camera: {
    type: String,
    default: 'back'
  },
  extension: {
    type: Array,
    default: ['*'],
    validator (extension, params) {
      if (extension.length === 0) { return 'param extension should not be empty.' }
    }
  }
}
