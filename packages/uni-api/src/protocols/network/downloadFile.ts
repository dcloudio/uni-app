export const API_DOWNLOAD_FILE = 'downloadFile'
export type API_TYPE_DOWNLOAD_FILE = typeof uni.downloadFile
export const DownloadFileOptions: ApiOptions<API_TYPE_DOWNLOAD_FILE> = {
  formatArgs: {
    header(value: Record<string, any>, params: Record<string, any>) {
      params.header = value || {}
    },
  },
}

export const DownloadFileProtocol: ApiProtocol<API_TYPE_DOWNLOAD_FILE> = {
  url: {
    type: String,
    required: true,
  },
  header: Object,
  timeout: Number,
}
