export const API_UPLOAD_FILE = 'uploadFile'
export type API_TYPE_UPLOAD_FILE = typeof uni.uploadFile
export const UploadFileOptions: ApiOptions<API_TYPE_UPLOAD_FILE> = {
  formatArgs: {
    header(value, params) {
      params.header = value || {}
    },
    formData(value, params) {
      params.formData = value || {}
    },
  },
}

export const UploadFileProtocol: ApiProtocol<API_TYPE_UPLOAD_FILE> = {
  url: {
    type: String,
    required: true,
  },
  files: {
    type: Array,
  },
  filePath: String,
  name: String,
  header: Object,
  formData: Object,
  timeout: Number,
}
