import { getRealPath } from '@dcloudio/uni-platform'

export const API_GET_FILE_INFO = 'getFileInfo'
export type API_TYPE_GET_FILE_INFO = typeof uni.getFileInfo

export const GetFileInfoOptions: ApiOptions<API_TYPE_GET_FILE_INFO> = {
  formatArgs: {
    filePath(filePath, params) {
      params.filePath = getRealPath(filePath)
    },
  },
}

export const GetFileInfoProtocol: ApiProtocol<API_TYPE_GET_FILE_INFO> = {
  filePath: {
    type: String,
    required: true,
  },
}
