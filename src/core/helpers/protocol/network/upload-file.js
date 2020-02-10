import getRealPath from 'uni-platform/helpers/get-real-path'

export const uploadFile = {
  url: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    validator (value, params) {
      params.type = getRealPath(value)
    }
  },
  name: {
    type: String
  },
  header: {
    type: Object,
    validator (value, params) {
      params.header = value || {}
    }
  },
  formData: {
    type: Object,
    validator (value, params) {
      params.formData = value || {}
    }
  }
}
