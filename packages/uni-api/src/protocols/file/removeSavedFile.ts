import { getRealPath } from '@dcloudio/uni-platform'
export const API_REMOVE_SAVED_FILE = 'removeSavedFile'
export type API_TYPE_REMOVE_SAVED_FILE = typeof uni.removeSavedFile

export const RemoveSavedFileOptions: ApiOptions<API_TYPE_REMOVE_SAVED_FILE> = {
  formatArgs: {
    filePath(filePath, params) {
      params.filePath = getRealPath(filePath)
    },
  },
}

export const RemoveSavedFileProtocol: ApiProtocol<API_TYPE_REMOVE_SAVED_FILE> =
  {
    filePath: {
      type: String,
      required: true,
    },
  }
