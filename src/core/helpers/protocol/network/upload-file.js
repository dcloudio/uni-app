// App端可以只使用files不传filePath和name
import getRealPath from 'uni-platform/helpers/get-real-path'

export const uploadFile = {
  url: {
    type: String,
    required: true
  },
  files: {
    type: Array
  },
  file: {
    type: File
  },
  filePath: {
    type: String,
    validator (value, params) {
      if (value) {
        params.type = getRealPath(value)
      }
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
