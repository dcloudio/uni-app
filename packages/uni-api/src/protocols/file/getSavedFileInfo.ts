import { getRealPath } from '@dcloudio/uni-platform'

export const API_GET_SAVED_FILE_INFO = 'getSavedFileInfo'
export type API_TYPE_GET_SAVED_FILE_INFO = typeof uni.getSavedFileInfo

export const GetSavedFileInfoOptions: ApiOptions<API_TYPE_GET_SAVED_FILE_INFO> =
  {
    formatArgs: {
      filePath(filePath, params) {
        params.filePath = getRealPath(filePath)
      },
    },
  }

export const GetSavedFileInfoProtocol: ApiProtocol<API_TYPE_GET_SAVED_FILE_INFO> =
  {
    filePath: {
      type: String,
      required: true,
    },
  }
