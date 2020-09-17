import getRealPath from 'uni-platform/helpers/get-real-path'

export const saveFile = {
  tempFilePath: {
    type: String,
    required: true,
    validator (value, params) {
      params.tempFilePath = getRealPath(value)
    }
  }
}

const TYPES = ['md5', 'sha1']

export const getFileInfo = {
  filePath: {
    type: String,
    required: true,
    validator (value, params) {
      params.filePath = getRealPath(value)
    }
  },
  digestAlgorithm: {
    type: String,
    validator (value, params) {
      params.digestAlgorithm = TYPES.includes(value) ? value : TYPES[0]
    },
    default: TYPES[0]
  }
}

export const getSavedFileInfo = {
  filePath: {
    type: String,
    required: true,
    validator (value, params) {
      params.filePath = getRealPath(value)
    }
  }
}

export const removeSavedFile = {
  filePath: {
    type: String,
    required: true,
    validator (value, params) {
      params.filePath = getRealPath(value)
    }
  }
}
