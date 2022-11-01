import {
  defineAsyncApi,
  API_REMOVE_SAVED_FILE,
  API_TYPE_REMOVE_SAVED_FILE,
  RemoveSavedFileProtocol,
  RemoveSavedFileOptions,
} from '@dcloudio/uni-api'
import { warpPlusErrorCallback } from '../../../helpers/plus'

export const removeSavedFile = defineAsyncApi<API_TYPE_REMOVE_SAVED_FILE>(
  API_REMOVE_SAVED_FILE,
  ({ filePath }, { resolve, reject }) => {
    const errorCallback = warpPlusErrorCallback(reject)

    plus.io.resolveLocalFileSystemURL(
      filePath,
      (entry) => {
        entry.remove(() => {
          resolve()
        }, errorCallback)
      },
      errorCallback
    )
  },
  RemoveSavedFileProtocol,
  RemoveSavedFileOptions
)
