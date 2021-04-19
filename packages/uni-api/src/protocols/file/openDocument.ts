import { getRealPath } from '@dcloudio/uni-platform'

export const API_OPEN_DOCUMENT = 'openDocument'
export type API_TYPE_OPEN_DOCUMENT = typeof uni.openDocument

export const OpenDocumentOptions: ApiOptions<API_TYPE_OPEN_DOCUMENT> = {
  formatArgs: {
    filePath(filePath, params) {
      params.filePath = getRealPath(filePath)
    },
  },
}

export const OpenDocumentProtocol: ApiProtocol<API_TYPE_OPEN_DOCUMENT> = {
  filePath: {
    type: String,
    required: true,
  },
  fileType: String,
}
