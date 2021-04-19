import { getRealPath } from '@dcloudio/uni-platform'

export const API_UPLOAD_FILE = 'uploadFile'
export type API_TYPE_UPLOAD_FILE = typeof uni.uploadFile
export const UploadFileOptions: ApiOptions<API_TYPE_UPLOAD_FILE> = {
  formatArgs: {
    filePath(filePath, params) {
      if (filePath) {
        params.filePath = getRealPath(filePath)
      }
    },
    header(value: Record<string, any>, params: Record<string, any>) {
      params.header = value || {}
    },
    formData(value: Record<string, any>, params: Record<string, any>) {
      params.formData = value || {}
    },
  },
}

export const UploadFileProtocol: ApiProtocol<API_TYPE_UPLOAD_FILE> = {
  url: {
    type: String,
    required: true,
  },
  files: Array,
  filePath: String,
  name: String,
  header: Object,
  formData: Object,
  timeout: Number,
}
