const MEDIA_TYPE = ['all', 'image', 'video']
const SOURCE_TYPES = ['album', 'camera']

export const chooseFile = {
  count: {
    type: Number,
    required: false,
    default: 100,
    validator (count, params) {
      if (count <= 0) {
        params.count = 100
      }
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
  type: {
    type: String,
    required: false,
    default: 'all',
    validator (type, params) {
      if (!MEDIA_TYPE.includes(type)) params.type = MEDIA_TYPE[0]
      params.type = params.type === 'all' ? params.type = '*' : params.type
    }
  },
  extension: {
    type: Array,
    default: [''],
    validator (extension, params) {
      if (extension.length === 0) { return 'param extension should not be empty.' }
    }
  }
}
