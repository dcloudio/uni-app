import { getRealPath } from '@dcloudio/uni-platform'
export const API_SAVE_FILE = 'saveFile'
export type API_TYPE_SAVE_FILE = typeof uni.saveFile

export const SaveFileOptions: ApiOptions<API_TYPE_SAVE_FILE> = {
  formatArgs: {
    tempFilePath(savedFilePath, params) {
      params.tempFilePath = getRealPath(savedFilePath)
    },
  },
}

export const SaveFileProtocol: ApiProtocol<API_TYPE_SAVE_FILE> = {
  tempFilePath: {
    type: String,
    required: true,
  },
}
