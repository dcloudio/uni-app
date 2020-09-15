import { ApiOptions, ApiProtocol } from '../type'

export const DownloadFileOptions: ApiOptions = {
  formatArgs: {
    header(value, params) {
      params.header = value || {}
    }
  }
}

export const DownloadFileProtocol: ApiProtocol = {
  url: {
    type: String,
    required: true
  },
  header: {
    type: Object
  }
}
