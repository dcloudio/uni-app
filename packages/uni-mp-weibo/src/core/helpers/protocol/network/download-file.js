export const downloadFile = {
  url: {
    type: String,
    required: true
  },
  header: {
    type: Object,
    validator (value, params) {
      params.header = value || {}
    }
  }
}
